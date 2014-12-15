package com.scheakur.gradle

import org.gradle.api.DefaultTask
import org.gradle.api.tasks.TaskAction

class SampleTask extends DefaultTask {

	String sample = "Sample Task"

	@TaskAction
	def sample() {
		println sample
	}

}

