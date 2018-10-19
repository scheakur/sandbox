package design

import . "goa.design/goa/http/design"
import . "goa.design/goa/http/dsl"

var _ = API("hello-goa-api", func() {
	Title("Calculator Service")
	Description("HTTP service for adding numbers")
})

var _ = Service("hello-goa-service", func() {
	Description("The calc service performs operations on numbers")
	Method("hello", func() {
		Payload(func() {
			Attribute("name", String, "Name to say hello to")
			Required("name")
		})
		Result(String)
		HTTP(func() {
			GET("/hello/{name}")
			Response(StatusOK)
		})
	})
	Method("add", func() {
		Payload(func() {
			Attribute("a", Int, "Left operand")
			Attribute("b", Int, "Right operand")
			Required("a", "b")
		})
		Result(Int)
		HTTP(func() {
			GET("/add/{a}/{b}")
			Response(StatusOK)
		})
	})
	Method("minus", func() {
		Payload(func() {
			Attribute("a", Int, "Left operand")
			Attribute("b", Int, "Right operand")
			Required("a", "b")
		})
		Result(Int)
		HTTP(func() {
			GET("/minus/{a}/{b}")
			Response(StatusOK)
		})
	})
	Method("multiply", func() {
		Payload(func() {
			Attribute("a", Int, "Left operand")
			Attribute("b", Int, "Right operand")
			Required("a", "b")
		})
		Result(Int)
		HTTP(func() {
			GET("/multiply/{a}/{b}")
			Response(StatusOK)
		})
	})
})
