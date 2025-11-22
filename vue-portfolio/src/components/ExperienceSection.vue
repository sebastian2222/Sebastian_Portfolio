<template>
  <section id="experience" class="py-5">
    <div class="container">
      <h2 class="text-center mb-4">Work Experience</h2>
      <div class="timeline">
        <TimelineItem v-for="(item, index) in experience" :key="index" :item="item" />
      </div>
    </div>
  </section>
</template>

<script setup>
import TimelineItem from './TimelineItem.vue'
import experience from '../assets/data/experience.json'
</script>

<style scoped>
.timeline {
  position: relative;
  margin-left: 20px;
  border-left: 2px solid #ccc;
}
</style>
