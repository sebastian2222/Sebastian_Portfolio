<template>
  <section id="projects" class="container py-5 min-vh-100">
    <h2 class="text-center mb-4">Projects & Skills</h2>

    <!-- Carousel Controls -->
    <div class="d-flex justify-content-center align-items-center mb-3">
      <button @click="prev" class="btn btn-outline-secondary me-2" :disabled="currentIndex === 0">
        <i class="bi bi-chevron-left"></i>
      </button>
      <button
        @click="next"
        class="btn btn-outline-secondary"
        :disabled="currentIndex + visibleCount >= projects.length"
      >
        <i class="bi bi-chevron-right"></i>
      </button>
    </div>

    <!-- Projects Grid -->
    <div class="row">
      <ProjectCard
        v-for="(project, index) in visibleProjects"
        :key="index"
        :project="project"
      />
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import ProjectCard from './ProjectCard.vue'
import projects from '../assets/data/projects.json'

const currentIndex = ref(0)
const visibleCount = 6 // Show 6 at a time

const visibleProjects = computed(() => {
  return projects.slice(currentIndex.value, currentIndex.value + visibleCount)
})

function next() {
  if (currentIndex.value + visibleCount < projects.length) {
    currentIndex.value += 3 // Slide by one row (3 items)
  }
}

function prev() {
  if (currentIndex.value - 3 >= 0) {
    currentIndex.value -= 3
  }
}
</script>

<style scoped>
button[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
