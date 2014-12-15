package com.scheakur.gradle

import org.junit.Test
import org.gradle.testfixtures.ProjectBuilder
import org.gradle.api.Project
import static org.junit.Assert.*

class SamplePluginTest {

	@Test
	public void samplePluginAddsSampleTaskToProject() {
		Project project = ProjectBuilder.builder().build()
		project.apply plugin: 'com.scheakur.gradle.sample'

		assertTrue(project.tasks.sample1 instanceof SampleTask)
		assertTrue(project.tasks.sample2 != null)
	}

}
