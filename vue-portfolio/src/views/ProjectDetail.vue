<!-- src/views/ProjectDetail.vue -->
<template>
  <div class="container py-5 min-vh-100">
    <h2>{{ project.title }}</h2>
    <img :src="project.image" class="img-fluid mb-4" :alt="project.title" />
    <p>{{ project.details }}</p>
    <div>
      <span
        v-for="tech in project.technologies"
        :key="tech"
        class="badge bg-secondary me-1"
        >{{ tech }}</span
      >
    </div>
    <a :href="project.link" class="btn btn-primary mt-3" target="_blank">View Source</a>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import projects from '../assets/data/projects.json'

const route = useRoute()
const project = ref(null)

onMounted(() => {
  project.value = projects.find(p => p.slug === route.params.slug)
})
</script>
