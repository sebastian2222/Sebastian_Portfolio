<script setup>
defineProps({
  lanes: { type: Array, required: true },
  caption: { type: String, default: '' },
})
</script>

<template>
  <figure class="flow">
    <div v-for="lane in lanes" :key="lane.name" class="lane">
      <p class="mono lane__name">{{ lane.name }}</p>
      <ol class="lane__steps">
        <li v-for="(step, i) in lane.steps" :key="i" class="step">
          <span class="step__box">{{ step }}</span>
        </li>
      </ol>
    </div>
    <figcaption v-if="caption" class="flow__caption">{{ caption }}</figcaption>
  </figure>
</template>

<style scoped>
.flow {
  margin: 0;
  padding: clamp(1rem, 3vw, 1.75rem);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background:
    radial-gradient(var(--grid-dot) 1px, transparent 1px) 0 0 / 18px 18px,
    var(--bg-raised);
  display: grid;
  gap: 1.5rem;
}

.lane {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 1rem;
  align-items: start;
}

.lane__name {
  padding-top: 0.45rem;
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 0.7rem;
}

.lane__steps {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  row-gap: 0.6rem;
  list-style: none;
}

.step {
  display: flex;
  align-items: center;
}

/* Connector arrow between consecutive steps. */
.step + .step::before {
  content: '';
  width: 22px;
  height: 1px;
  margin-inline: 4px;
  background: var(--border-strong);
  mask: linear-gradient(90deg, #000 70%, transparent);
}

.step__box {
  display: inline-block;
  padding: 0.45rem 0.75rem;
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-sm);
  background: var(--surface);
  font-size: 0.85rem;
  line-height: 1.35;
}

.step:first-child .step__box {
  border-color: color-mix(in srgb, var(--accent) 60%, var(--border));
}

.flow__caption {
  color: var(--text-muted);
  font-size: 0.9rem;
  border-top: 1px dashed var(--border);
  padding-top: 1rem;
}

@media (max-width: 640px) {
  .lane {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }

  .lane__steps {
    flex-direction: column;
    align-items: flex-start;
    row-gap: 0;
  }

  .step {
    flex-direction: column;
    align-items: flex-start;
  }

  .step + .step::before {
    width: 1px;
    height: 14px;
    margin: 2px 0 2px 1.25rem;
    mask: none;
  }
}
</style>
