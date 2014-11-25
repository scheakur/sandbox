# JVM Option

- JVMの実行時オプションをいろいろ指定してみる

## MetaspaceSizer

- クラスを動的に定義してMetaspaceのサイズを拡大していく
- `MaxMetaspaceSize` や `MetaspaceSize` を指定したときにどういう挙動になるのかを確認するのが目的

### 使い方

```sh
javac MetaspaceSizer.java; java -XX:MaxMetaspaceSize=10m -XX:MetaspaceSize=1m -XX:+PrintGC  MetaspaceSizer
javac MetaspaceSizer.java; java -XX:MaxMetaspaceSize=10m -XX:MetaspaceSize=10m -XX:+PrintGC  MetaspaceSizer
```
