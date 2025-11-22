<template>
  <section id="projects" class="py-5 bg-light">
    <div class="container">
      <h2 class="text-center mb-4">Projects & Skills</h2>
      <div class="row">
        <ProjectCard
          v-for="(project, index) in projects"
          :key="index"
          :project="project"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import ProjectCard from './ProjectCard.vue'
import projects from '../assets/data/projects.json'
</script>
