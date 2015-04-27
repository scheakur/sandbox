import com.sun.net.httpserver.HttpExchange
import com.sun.net.httpserver.HttpHandler
import com.sun.net.httpserver.HttpServer
import groovy.json.JsonBuilder

def PORT = 18081

def server = HttpServer.create(new InetSocketAddress(PORT), 0)

server.createContext('/', new HttpHandler() {
	void handle(HttpExchange exchange) {
		parseGetParameters(exchange)
		parsePostParameters(exchange)
		// def buf = getContents(exchange.getRequestURI().getPath())
		def buf = extractRequest(exchange).getBytes()
		exchange.getResponseHeaders().add('Content-Type', 'application/json')
		exchange.sendResponseHeaders(200, buf.length)
		exchange.getResponseBody().write(buf)
		exchange.close()
	}
})

server.start()


void parseGetParameters(HttpExchange exchange) {
	def parameters = new HashMap<String, Object>()
	def requestedUri = exchange.requestURI
	def query = requestedUri.rawQuery
	parseQuery(query, parameters)
	exchange.setAttribute('parameters', parameters)
}

void parsePostParameters(HttpExchange exchange) {
	if ('post'.equalsIgnoreCase(exchange.requestMethod)) {
		def parameters = exchange.getAttribute('parameters')
		def isr = new InputStreamReader(exchange.requestBody,'utf-8')
		def br = new BufferedReader(isr)
		def query = br.readLine()
		parseQuery(query, parameters)
	}
}

void parseQuery(String query, Map<String, Object> parameters) {
	if (query != null) {
		def pairs = query.split('[&]')

		for (def pair : pairs) {
			def param = pair.split('[=]')

			def key = null
			def value = null
			if (param.length > 0) {
				key = URLDecoder.decode(param[0], System.getProperty('file.encoding'))
			}
			if (param.length > 1) {
				value = URLDecoder.decode(param[1], System.getProperty('file.encoding'))
			}

			if (parameters.containsKey(key)) {
				def obj = parameters.get(key)
				if(obj instanceof List) {
					obj.add(value)
				} else if(obj instanceof String) {
					def values = [obj, value]
					parameters.put(key, values)
				}
			} else {
				parameters.put(key, value)
			}
		}
	}
}

String extractRequest(HttpExchange exchange) {
	def method = exchange.requestMethod
	def path = exchange.requestURI.path.toString()
	def params = exchange.getAttribute('parameters')

	def json = new JsonBuilder()

	json (
		method: method,
		path: path,
		params: params,
	)

	return json.toString()
}
