@Grab('org.codehaus.groovy.modules.http-builder:http-builder:0.7.1')
@Grab('org.apache.httpcomponents:httpmime:4.3.6')

import groovyx.net.http.HTTPBuilder
import groovyx.net.http.Method
import java.nio.charset.Charset
import org.apache.http.entity.ContentType
import org.apache.http.entity.mime.HttpMultipartMode
import org.apache.http.entity.mime.MultipartEntityBuilder

def url = 'http://example.com/post'

def params = [
	foo: 'fooval',
	bar: 'barval',
]

def files = [
	baz: new File('/path/to/file1'),
	qux: new File('/path/to/file2'),
]

def http = new HTTPBuilder(url)

http.request(Method.POST) { req ->
	def builder = new MultipartEntityBuilder()

	builder.charset = Charset.forName('UTF-8')
	builder.mode = HttpMultipartMode.BROWSER_COMPATIBLE

	params.each { key, val ->
		builder.addTextBody(key, val.toString())
	}
	files.each { key, val ->
		builder.addBinaryBody(key, val)
	}

	req.entity = builder.build()

	response.success = { resp ->
		println 'Succeeded'
		println resp.dump()
	}
	response.failure = { resp ->
		println 'Failed'
		println resp.dump()
	}

	println "Posting... ${url}"
}
