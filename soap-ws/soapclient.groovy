@GrabResolver(name='reficio', root='http://repo.reficio.org/maven/')
@GrabResolver(name='soapui', root='http://www.soapui.org/repository/maven2/')
@GrabResolver(name='pentaho-releases', root='http://repository.pentaho.org/artifactory/repo/')

@Grab('org.reficio:soap-builder:1.0.0-SNAPSHOT')
@Grab('org.reficio:soap-client:1.0.0-SNAPSHOT')

import org.reficio.ws.builder.*
import org.reficio.ws.builder.core.*
import org.reficio.ws.client.core.*

def separator = '-' * 72

Wsdl wsdl = Wsdl.parse('http://wsf.cdyne.com/WeatherWS/Weather.asmx?WSDL')

println wsdl.dump()
println separator

SoapBuilder builder = wsdl.binding()
	.localPart('WeatherSoap')
	.find()

println builder.dump()
println separator

SoapOperation operation = builder.operation()
	.soapAction('http://ws.cdyne.com/WeatherWS/GetWeatherInformation')
	.find()

println operation.dump()
println separator

String request = builder.buildInputMessage(operation)

println request.dump()
println separator

SoapClient client = SoapClient.builder()
	.endpointUri('http://wsf.cdyne.com/WeatherWS/Weather.asmx')
	.build()

println client.dump()
println separator

String response = client.post('http://ws.cdyne.com/WeatherWS/GetWeatherInformation', request)

println groovy.xml.XmlUtil.serialize(response)
