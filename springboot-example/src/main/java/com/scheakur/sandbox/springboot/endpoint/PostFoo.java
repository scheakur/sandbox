package com.scheakur.sandbox.springboot.endpoint;

import org.springframework.boot.actuate.endpoint.AbstractEndpoint;
import org.springframework.boot.actuate.endpoint.mvc.EndpointMvcAdapter;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Configuration
public class PostFoo {

    public static class FooEndpoint extends AbstractEndpoint<String> {

        public FooEndpoint() {
            super("foo");
        }

        @Override
        public String invoke() {
            return "This is foo endpoint.";
        }

    }

    public static class FooMvcEndpoint extends EndpointMvcAdapter {

        public FooMvcEndpoint(FooEndpoint delegate) {
            super(delegate);
        }

        @RequestMapping(method= RequestMethod.POST)
        @ResponseBody
        @Override
        public Object invoke() {
            return super.invoke();
        }

    }

    @Bean
    @ConditionalOnMissingBean
    public FooEndpoint fooEndpoint() {
        return new FooEndpoint();
    }


    @Bean
    @ConditionalOnMissingBean
    public FooMvcEndpoint fooMvcEndpoint(FooEndpoint delegate) {
        return new FooMvcEndpoint(delegate);
    }

}
