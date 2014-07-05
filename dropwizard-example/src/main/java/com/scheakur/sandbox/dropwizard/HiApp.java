package com.scheakur.sandbox.dropwizard;

import io.dropwizard.Application;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;
import com.scheakur.sandbox.dropwizard.resources.Hi;
import com.scheakur.sandbox.dropwizard.health.TemplateHealthCheck;

public class HiApp extends Application<HiConf> {

    public static void main(String[] args) throws Exception {
        new HiApp().run(args);
    }

    @Override
    public String getName() {
        return "hi";
    }

    @Override
    public void initialize(Bootstrap<HiConf> bootstrap) {
        // nothing to do yet
    }

    @Override
    public void run(HiConf conf, Environment env) {
        final Hi res = new Hi(conf.getTemplate(), conf.getDefaultName());
        final TemplateHealthCheck healthCheck =
            new TemplateHealthCheck(conf.getTemplate());
        env.healthChecks().register("template", healthCheck);
        env.jersey().register(res);
    }

}
