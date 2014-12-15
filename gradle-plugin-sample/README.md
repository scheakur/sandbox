# gradle-plugin-sample

Gradleプラグインのサンプル

```sh
cd plugin                 # サンプルプラグインの実装があるディレクトリ
./gradlew uploadArchives  # サンプルプラグインを repo ディレクトリに upload する
cd -
cd consumer               # サンプルプラグインを利用するプロジェクト
./gradlew tasks
./gradlew sample1
./gradlew sample2
./gradlew sample3
```
