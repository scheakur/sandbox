@Grab('org.apache.httpcomponents:httpclient:4.5')
import org.apache.http.HttpHost
import org.apache.http.auth.AuthScope
import org.apache.http.auth.UsernamePasswordCredentials
import org.apache.http.client.methods.HttpPost
import org.apache.http.client.protocol.HttpClientContext
import org.apache.http.impl.auth.BasicScheme
import org.apache.http.impl.client.BasicAuthCache
import org.apache.http.impl.client.BasicCredentialsProvider
import org.apache.http.impl.client.HttpClients
import org.apache.http.util.EntityUtils
import org.apache.http.entity.StringEntity

def url = 'http://localhost:8080/foo'
def body = '<foo>bar</foo>'
def username = 'username'
def password = 'password'

def uri = URI.create(url)
def host = new HttpHost(uri.host, uri.port, uri.scheme)

def credsProvider = new BasicCredentialsProvider()
credsProvider.setCredentials(
    new AuthScope(uri.host, uri.port),
    new UsernamePasswordCredentials(username, password)
)

def httpClient = HttpClients.custom().setDefaultCredentialsProvider(credsProvider).build()

def httpPost = new HttpPost(uri)
httpPost.setEntity(new StringEntity(body, 'UTF-8'))
httpPost.setHeader('Content-Type', 'application/xml')

def authCache = new BasicAuthCache()
authCache.put(host, new BasicScheme())
def context = HttpClientContext.create()
context.authCache = authCache

def response = httpClient.execute(host, httpPost, context)

println response.statusLine.statusCode
println EntityUtils.toString(response.entity)
