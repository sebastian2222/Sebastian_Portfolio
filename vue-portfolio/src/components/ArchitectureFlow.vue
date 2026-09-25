<script setup>
defineProps({
  lanes: { type: Array, required: true },
  caption: { type: String, default: '' },
})

const LANE_TONES = ['yellow', 'mint', 'pink', 'lilac']
</script>

<template>
  <figure class="flow card">
    <div
      v-for="(lane, i) in lanes"
      :key="lane.name"
      class="lane"
      :class="`tone-${LANE_TONES[i % LANE_TONES.length]}`"
    >
      <p class="mono lane__name">{{ lane.name }}</p>
      <ol class="lane__steps">
        <li v-for="(step, j) in lane.steps" :key="j" class="step">
          <span class="step__box">{{ step }}</span>
        </li>
      </ol>
    </div>
    <figcaption v-if="caption" class="flow__caption">
      <span class="hand flow__note" aria-hidden="true">how it works →</span> {{ caption }}
    </figcaption>
  </figure>
</template>

<style scoped>
.flow {
  display: grid;
  gap: 1.25rem;
  margin: 0;
  padding: clamp(1rem, 3vw, 1.75rem);
  background:
    radial-gradient(rgb(27 31 59 / 0.12) 1.5px, transparent 1.5px) 0 0 / 20px 20px,
    var(--paper);
}

.lane {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 1rem;
  align-items: start;
}

.lane__name {
  justify-self: start;
  margin-top: 0.3rem;
  padding: 0.15rem 0.5rem;
  border: 1.5px solid var(--ink);
  border-radius: 6px;
  background: var(--tone);
  font-size: 0.68rem;
  text-transform: uppercase;
}

.lane__steps {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  row-gap: 0.7rem;
  list-style: none;
}

.step {
  display: flex;
  align-items: center;
}

/* Hand-drawn style connector between steps */
.step + .step::before {
  content: '→';
  margin-inline: 0.4rem;
  font-family: var(--font-hand);
  font-size: 1.3rem;
  line-height: 1;
  color: var(--tomato-text);
}

.step__box {
  display: inline-block;
  padding: 0.4rem 0.7rem;
  border: var(--line-thin);
  border-radius: var(--radius-sm);
  background: var(--card);
  box-shadow: var(--shadow-sm);
  font-size: 0.85rem;
  font-weight: 600;
  line-height: 1.35;
}

.step:first-child .step__box {
  background: var(--tone-tint);
}

.flow__caption {
  padding-top: 1rem;
  border-top: 2px dashed rgb(27 31 59 / 0.25);
  color: var(--ink-soft);
  font-size: 0.92rem;
}

.flow__note {
  font-size: 1.25rem;
  color: var(--tomato-text);
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
    content: '↓';
    margin: 0.1rem 0 0.1rem 1rem;
  }
}
</style>
