package com.scheakur.sandbox.dropwizard.resources;

import com.scheakur.sandbox.dropwizard.core.Echo;
import com.google.common.base.Optional;
import com.codahale.metrics.annotation.Timed;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import java.util.concurrent.atomic.AtomicLong;

@Path("/hi")
@Produces(MediaType.APPLICATION_JSON)
public class Hi {

    private final String template;
    private final String defaultName;
    private final AtomicLong counter;

    public Hi(String template, String defaultName) {
        this.template = template;
        this.defaultName = defaultName;
        this.counter = new AtomicLong();
    }

    @GET
    @Timed
    public Echo sayHello(@QueryParam("name") Optional<String> name) {
        final String value = String.format(template, name.or(defaultName));
        return new Echo(counter.incrementAndGet(), value);
    }

}
