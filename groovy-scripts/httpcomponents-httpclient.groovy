@Grab('org.apache.httpcomponents:httpclient:4.3.5')
import org.apache.http.client.config.CookieSpecs;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.impl.client.LaxRedirectStrategy;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;

def config = RequestConfig.custom().setCookieSpec(CookieSpecs.BROWSER_COMPATIBILITY).build()
def redirectStrategy = new LaxRedirectStrategy();
def httpClient = HttpClients.custom()
	.setRedirectStrategy(redirectStrategy)
	.setDefaultRequestConfig(config).build()

try {
	def postMethod = new HttpPost('http://example.com/foo')

	postMethod.entity = new UrlEncodedFormEntity([
		new BasicNameValuePair('bar', 'barval'),
		new BasicNameValuePair('baz', 'bazval')
	], 'UTF-8')

	def response = httpClient.execute(postMethod)
	try {
		if (response.getStatusLine().getStatusCode() == 200) {
			def entity = response.getEntity()
			println(EntityUtils.toString(entity, 'UTF-8'))
		}
	} finally {
		response.close()
	}
} catch (IOException e) {
	e.printStackTrace()
} finally {
	httpClient.close()
}
