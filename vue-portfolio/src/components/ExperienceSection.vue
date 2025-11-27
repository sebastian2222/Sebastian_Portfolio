<template>
  <section id="experience" class="container py-5 min-vh-100">
    <h2 class="text-center mb-5">Work Experience</h2>
    <div class="timeline">
      <ExperienceItem v-for="(item, index) in experience" :key="index" :item="item" />
    </div>
  </section>
</template>

<script setup>
import ExperienceItem from './ExperienceItem.vue'
import experience from '../assets/data/experience.json'
</script>
