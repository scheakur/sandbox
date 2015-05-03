import com.sun.net.httpserver.HttpExchange
import com.sun.net.httpserver.HttpHandler
import com.sun.net.httpserver.HttpServer
import groovy.json.JsonBuilder

def PORT = 18081

def server = HttpServer.create(new InetSocketAddress(PORT), 0)

server.createContext('/', new HttpHandler() {
	void handle(HttpExchange exchange) {
		def buf = extractRequest(exchange).bytes
		exchange.responseHeaders.add('Content-Type', 'application/json')
		exchange.sendResponseHeaders(200, buf.length)
		exchange.responseBody.write(buf)
		exchange.close()
	}
})

server.start()

println(server.address)


Map<String, Object> extractParams(HttpExchange exchange) {
	def params = extractGetParams(exchange)
	params.putAll(extractPostParams(exchange))
	return params
}


Map<String, Object> extractGetParams(HttpExchange exchange) {
	def params = new HashMap<String, Object>()
	def requestedUri = exchange.requestURI
	def query = requestedUri.rawQuery
	parseQuery(query, params)
	return params
}


Map<String, Object> extractPostParams(HttpExchange exchange) {
	if (!'post'.equalsIgnoreCase(exchange.requestMethod)) {
		return [:]
	}
	def params = new HashMap<String, Object>()
	exchange.requestBody.withReader('UTF-8') {
		def query = it.readLine()
		parseQuery(query, params)
	}
	return params
}


void parseQuery(String query, Map<String, Object> params) {
	if (query == null) {
		return
	}
	query.split('&').each { param ->
		def kv = param.split('=')

		def enc = System.getProperty('file.encoding')
		def key = (kv.length > 0) ? URLDecoder.decode(kv[0], enc) : ''
		def value = (kv.length > 1) ? URLDecoder.decode(kv[1], enc) : ''

		if (params.containsKey(key)) {
			def obj = params.get(key)
			if (obj instanceof List) {
				obj.add(value)
			} else if (obj instanceof String) {
				def values = [value, obj]
				params.put(key, values)
			}
		} else {
			params.put(key, value)
		}
	}
}


String extractRequest(HttpExchange exchange) {
	def json = new JsonBuilder()

	json (
		method: exchange.requestMethod,
		path: exchange.requestURI.path.toString(),
		params: extractParams(exchange),
	)

	return json.toString()
}
