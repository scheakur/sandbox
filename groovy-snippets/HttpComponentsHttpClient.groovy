@Grab('org.apache.httpcomponents:httpclient:4.3.5')
import org.apache.http.client.config.CookieSpecs
import org.apache.http.client.config.RequestConfig
import org.apache.http.client.entity.UrlEncodedFormEntity
import org.apache.http.client.methods.HttpGet
import org.apache.http.client.methods.HttpPost
import org.apache.http.impl.client.HttpClients
import org.apache.http.impl.client.LaxRedirectStrategy
import org.apache.http.message.BasicNameValuePair
import org.apache.http.util.EntityUtils

def httpRequest = { makeMethod, callback ->
	def config = RequestConfig.custom().setCookieSpec(CookieSpecs.BROWSER_COMPATIBILITY).build()
	def redirectStrategy = new LaxRedirectStrategy()
	def httpClient = HttpClients.custom()
		.setRedirectStrategy(redirectStrategy)
		.setDefaultRequestConfig(config).build()

	try {
		def method = makeMethod()
		def response = httpClient.execute(method)
		try {
			return callback(response)
		} finally {
			response.close()
		}
	} catch (IOException e) {
		e.printStackTrace()
	} finally {
		httpClient.close()
	}
}

def httpPost = { url, data, callback ->
	return httpRequest({
		def postMethod = new HttpPost(url)
		postMethod.entity = new UrlEncodedFormEntity(data.collect { k, v ->
			return new BasicNameValuePair(k, v)
		}, 'UTF-8')
		return postMethod
	}, callback)
}

def httpGet = { url, callback ->
	return httpRequest({ new HttpGet(url) }, callback)
}

println(httpGet('http://localhost:18081/foo?bar=baz', { response ->
	if (response.getStatusLine().getStatusCode() == 200) {
		def entity = response.getEntity()
		return EntityUtils.toString(entity, 'UTF-8')
	}
	return '?'
}))

println(httpPost('http://localhost:18081/hoge?fuga=piyo', [
	vim: 'emacs',
	java: '+you',
], { response ->
	if (response.getStatusLine().getStatusCode() == 200) {
		def entity = response.getEntity()
		return EntityUtils.toString(entity, 'UTF-8')
	}
	return '?'
}))
