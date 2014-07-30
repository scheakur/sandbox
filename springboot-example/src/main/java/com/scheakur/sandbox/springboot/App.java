package com.scheakur.sandbox.springboot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.filter.CharacterEncodingFilter;

import javax.servlet.Filter;

@Controller
@EnableAutoConfiguration
@ComponentScan
public class App {

    public static void main(final String... args) {
        SpringApplication.run(App.class, args);
    }

    @RequestMapping(value="/hi", method=RequestMethod.GET)
    public String hi(@RequestParam(value="name", required=false, defaultValue="scheakur") String name, Model model) {
        model.addAttribute("name", name);
        Data data = Data.with(3);
        model.addAttribute("data", data);
        return "hi";
    }

    @RequestMapping(value="/hi", method=RequestMethod.POST)
    public String postHi(Data data, Model model) {
        model.addAttribute("data", data);
        return "data";
    }

    @RequestMapping("/hi/hi")
    public String hi2(@RequestParam(value="name", required=false, defaultValue="scheakur") String name, Model model) {
        model.addAttribute("name", name);
        return "hi/hi";
    }

    @Bean
    public Filter characterEncodingFilter() {
        CharacterEncodingFilter filter = new CharacterEncodingFilter();
        filter.setEncoding("UTF-8");
        filter.setForceEncoding(true);
        return filter;
    }

}
