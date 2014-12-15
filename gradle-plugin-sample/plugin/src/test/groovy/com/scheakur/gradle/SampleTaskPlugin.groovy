package com.scheakur.gradle

import org.junit.Test
import org.gradle.testfixtures.ProjectBuilder
import org.gradle.api.Project
import static org.junit.Assert.*

class SampleTaskTest {

	@Test
	public void canAddTaskToProject() {
		Project project = ProjectBuilder.builder().build()
		def task = project.task('sample1', type: SampleTask)
		assertTrue(task instanceof SampleTask)
	}

}
