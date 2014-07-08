package com.scheakur.sandbox.springboot;

import org.springframework.boot.*;
import org.springframework.boot.autoconfigure.*;
import org.springframework.stereotype.*;
import org.springframework.ui.*;
import org.springframework.web.bind.annotation.*;

@Controller
@EnableAutoConfiguration
public class App {

    public static void main(final String... args) {
        SpringApplication.run(App.class, args);
    }

    @RequestMapping("/hi")
    public String hi(
            @RequestParam(value="name", required=false, defaultValue="scheakur")
            String name,
            Model model) {
        model.addAttribute("name", name);
        return "/hi";
    }

}