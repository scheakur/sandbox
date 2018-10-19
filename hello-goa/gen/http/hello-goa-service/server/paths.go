// Code generated by goa v2.0.0-wip, DO NOT EDIT.
//
// HTTP request path constructors for the hello-goa-service service.
//
// Command:
// $ goa gen github.com/scheakur/sandbox/hello-goa/design

package server

import (
	"fmt"
)

// HelloHelloGoaServicePath returns the URL path to the hello-goa-service service hello HTTP endpoint.
func HelloHelloGoaServicePath(name string) string {
	return fmt.Sprintf("/hello/%v", name)
}

// AddHelloGoaServicePath returns the URL path to the hello-goa-service service add HTTP endpoint.
func AddHelloGoaServicePath(a int, b int) string {
	return fmt.Sprintf("/add/%v/%v", a, b)
}

// MinusHelloGoaServicePath returns the URL path to the hello-goa-service service minus HTTP endpoint.
func MinusHelloGoaServicePath(a int, b int) string {
	return fmt.Sprintf("/minus/%v/%v", a, b)
}

// MultiplyHelloGoaServicePath returns the URL path to the hello-goa-service service multiply HTTP endpoint.
func MultiplyHelloGoaServicePath(a int, b int) string {
	return fmt.Sprintf("/multiply/%v/%v", a, b)
}
