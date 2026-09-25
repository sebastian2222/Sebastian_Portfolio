<script setup>
defineProps({
  index: { type: String, default: '' },
  eyebrow: { type: String, required: true },
  title: { type: String, required: true },
  lead: { type: String, default: '' },
  id: { type: String, default: undefined },
})
</script>

<template>
  <header v-reveal class="heading">
    <p class="mono heading__eyebrow">
      <span v-if="index" class="heading__index">{{ index }}</span>
      {{ eyebrow }}
    </p>
    <h2 :id="id" class="heading__title">{{ title }}</h2>
    <p v-if="lead" class="heading__lead">{{ lead }}</p>
  </header>
</template>

<style scoped>
.heading {
  max-width: 720px;
  margin-bottom: clamp(2rem, 5vw, 3.5rem);
}

.heading__eyebrow {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.75rem;
  margin-bottom: 0.9rem;
}

.heading__index {
  color: var(--text-faint);
}

.heading__index::after {
  content: '/';
  margin-left: 0.6rem;
}

.heading__title {
  font-size: clamp(1.9rem, 4vw, 2.75rem);
}

.heading__lead {
  margin-top: 1rem;
  color: var(--text-muted);
  font-size: 1.075rem;
}
</style>
