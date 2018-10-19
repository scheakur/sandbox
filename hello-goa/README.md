1. Write design/desgin.go
2. Generate code from desgin

```
goa gen github.com/scheakur/sandbox/hello-goa/design
goa example github.com/scheakur/sandbox/hello-goa/design
```

3. Implement `hello-goa-service.go`
4. Build and run

```
cd cmd/hello_goaapi
go build
./hello_goaapi -listen "localhost:8080"
```

5. Access API

```
> curl -X GET http://localhost:8080/hello/scheakur
"Hello, scheakur!"
```

```
> curl -X GET localhost:8080/add/2/3
5
```
