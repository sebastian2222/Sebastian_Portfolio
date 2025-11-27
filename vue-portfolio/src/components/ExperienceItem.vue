<template>
  <div class="timeline__event">
    <div class="timeline__event__icon">
      <i class="bi bi-briefcase"></i>
    </div>
    <div class="timeline__event__content">
      <div class="timeline__event__title">{{ item.role }}</div>
      <div class="timeline__event__date">{{ item.company }} – {{ item.period }}</div>
      <div class="timeline__event__description">
        {{ item.description }}
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({ item: Object })
</script>
