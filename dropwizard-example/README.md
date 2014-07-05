Dropwizard Example
==================

## Build

```sh
mvn package
```

## Run

```sh
java -jar target/dropwizard-example-1.0-SNAPSHOT.jar server hi.yml
```

## Access

- [http://localhost:8080/hi](http://localhost:8080/hi)
- [http://localhost:8080/hi?name=You](http://localhost:8080/hi?name=You)
- [http://localhost:8081/healthcheck](http://localhost:8081/healthcheck)

