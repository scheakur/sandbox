package com.scheakur.sandbox.springboot.endpoint;

import org.springframework.boot.actuate.endpoint.AbstractEndpoint;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MyAdminEndpoint extends AbstractEndpoint<String> {

    public MyAdminEndpoint() {
        super("myadmin");
    }

    @Override
    public String invoke() {
        return "This is my admin page.";
    }

}
