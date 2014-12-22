def text = '''
<property name="root">
	<property name="foo" value="fooval"/>
	<property name="bar" value="barval"/>
	<property name="baz" value="bazval"/>
	<property name="qux" value="quxval"/>
</property>
'''

println(text)

def root = new XmlParser().parseText(text)

println(root)

// collect attribute
println(root.children().collect{
	return it.attribute("value")
})
println(root.children().collect{ it['@name'] })

// sort
root.children().sort(true) { it['@name'] }
new XmlNodePrinter().print(root)
