<template>
  <section id="education" class="container py-5 min-vh-100">
    <h2 class="text-center mb-5">Education & Awards</h2>
    <div class="timeline">
      <TimelineItem v-for="(item, index) in education" :key="index" :item="item" />
    </div>
  </section>
</template>

<script setup>
import TimelineItem from './TimelineItem.vue'
import education from '../assets/data/education.json'
</script>
