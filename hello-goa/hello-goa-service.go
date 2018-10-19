package hellogoaapi

import (
	"context"
	"log"

	hellogoaservice "github.com/scheakur/sandbox/hello-goa/gen/hello-goa-service"
)

// hello-goa-service service example implementation.
// The example methods log the requests and return zero values.
type helloGoaServiceSvc struct {
	logger *log.Logger
}

// NewHelloGoaService returns the hello-goa-service service implementation.
func NewHelloGoaService(logger *log.Logger) hellogoaservice.Service {
	return &helloGoaServiceSvc{logger}
}

// Hello implements hello.
func (s *helloGoaServiceSvc) Hello(ctx context.Context, p *hellogoaservice.HelloPayload) (res string, err error) {
	s.logger.Print("helloGoaService.hello")
	return "Hello, " + p.Name + "!", nil
}

// Add implements add.
func (s *helloGoaServiceSvc) Add(ctx context.Context, p *hellogoaservice.AddPayload) (res int, err error) {
	s.logger.Print("helloGoaService.add")
	return p.A + p.B, nil
}

// Minus implements minus.
func (s *helloGoaServiceSvc) Minus(ctx context.Context, p *hellogoaservice.MinusPayload) (res int, err error) {
	s.logger.Print("helloGoaService.minus")
	return p.A - p.B, nil
}

// Multiply implements multiply.
func (s *helloGoaServiceSvc) Multiply(ctx context.Context, p *hellogoaservice.MultiplyPayload) (res int, err error) {
	s.logger.Print("helloGoaService.multiply")
	return p.A * p.B, nil
}
