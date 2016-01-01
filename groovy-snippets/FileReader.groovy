def file = new File("/tmp/a.csv")

file.eachLine() {
  def (name, num) = it.split(",")
  def fileName = "sample-output-${num}.txt"
  new File("/tmp/${fileName}").withWriter("Windows-31J") { out ->
    out << """
${name}

aaa
bbb
ccc
""".split("\n").join("\r\n")
    out << "\r\n"
  }
}
