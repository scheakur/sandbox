def env = args.length > 0 ? args[0] : ""

def slurper = new ConfigSlurper(env)

def config = [
	"config.groovy",
	"config.override.groovy",
].inject(new ConfigObject()) { c, path ->
	def file = new File(path)
	return (file.exists()) ? c.merge(slurper.parse(file.toURL())) : c
}

println config
