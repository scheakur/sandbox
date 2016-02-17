import java.io.File

fun main(args: Array<String>) {
  println("Hello, Kotlin!")

  val folders = File(args[0]).listFiles { file -> file.isDirectory() }
  folders?.forEach { folder -> println(folder) }

  val array = Array(5, { i -> "${i} * ${i} = ${(i * i)}" })
  for (elem in array) {
    println(elem)
  }
}
