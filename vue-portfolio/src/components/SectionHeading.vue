<script setup>
defineProps({
  id: { type: String, default: undefined },
  label: { type: String, required: true },
  note: { type: String, default: '' },
  title: { type: String, required: true },
  tag: { type: String, default: '' },
  tone: { type: String, default: 'yellow' },
  lead: { type: String, default: '' },
})
</script>

<template>
  <header v-reveal class="heading">
    <p class="heading__meta">
      <span class="sticker" :class="`tone-${tone}`">{{ label }}</span>
      <span v-if="note" class="mono heading__note">• {{ note }}</span>
    </p>
    <div class="heading__row">
      <h2 :id="id" class="heading__title">{{ title }}</h2>
      <span v-if="tag" class="mono heading__tag">{{ tag }}</span>
    </div>
    <p v-if="lead" class="heading__lead">{{ lead }}</p>
  </header>
</template>

<style scoped>
.heading {
  margin-bottom: clamp(1.5rem, 4vw, 2.25rem);
  max-width: 760px;
}

.heading__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.6rem;
}

.heading__note {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--ink-soft);
}

.heading__row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
  margin-top: 0.6rem;
}

.heading__title {
  font-size: clamp(1.9rem, 4.5vw, 2.75rem);
}

.heading__tag {
  padding: 0.2rem 0.6rem;
  border: var(--line-thin);
  border-radius: var(--radius-sm);
  background: var(--yellow);
  box-shadow: var(--shadow-sm);
  font-size: 0.72rem;
  transform: rotate(-3deg);
}

.heading__lead {
  margin-top: 0.5rem;
  color: var(--ink-soft);
}
</style>
