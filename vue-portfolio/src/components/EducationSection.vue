<template>
  <section id="education" class="py-5 bg-light">
    <div class="container">
      <h2 class="text-center mb-4">Education & Awards</h2>
      <div class="timeline">
        <TimelineItem v-for="(item, index) in education" :key="index" :item="item" />
      </div>
    </div>
  </section>
</template>

<script setup>
import TimelineItem from './TimelineItem.vue'
import education from '../assets/data/education.json'
</script>
