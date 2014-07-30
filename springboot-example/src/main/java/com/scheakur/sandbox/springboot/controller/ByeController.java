package com.scheakur.sandbox.springboot.controller;

import com.scheakur.sandbox.springboot.NotFoundException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class ByeController {

	@RequestMapping("/bye/{name}")
	public String bye(@PathVariable("name") String name, Model model) {
		if (name.equals("scheakur")) {
			throw new NotFoundException();
		}
		model.addAttribute("name", name);
		return "bye";
	}

	@ExceptionHandler(NotFoundException.class)
	public String notFound() {
		return "error/404";
	}

}
