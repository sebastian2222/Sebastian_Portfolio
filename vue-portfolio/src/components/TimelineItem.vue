<template>
  <div class="mb-4 ps-3">
    <h5>{{ item.role }} – <small>{{ item.company }}</small></h5>
    <p class="text-muted">{{ item.startDate }} – {{ item.endDate }}</p>
    <ul>
      <li v-for="point in item.details" :key="point">{{ point }}</li>
    </ul>
  </div>
</template>

<script setup>
defineProps({ item: Object })
</script>
