package com.scheakur.gradle

import org.gradle.api.Project
import org.gradle.api.Plugin

class SamplePlugin implements Plugin<Project> {

	void apply(Project target) {
		target.task("sample1", type: SampleTask)

		target.task("sample2") << {
			println "Sample Task 2";
		}

	}

}
