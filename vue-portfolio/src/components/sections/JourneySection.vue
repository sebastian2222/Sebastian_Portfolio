<script setup>
import SectionHeading from '@/components/SectionHeading.vue'
import { profile } from '@/data/profile'
</script>

<template>
  <section id="journey" class="section" aria-labelledby="journey-title">
    <div class="container">
      <SectionHeading
        id="journey-title"
        label="Timeline map"
        note="Calicut → Hyderabad → Melbourne"
        title="My journey"
        tag="ROUTE 18–26"
        tone="lilac"
        lead="From Calicut to Melbourne: the route through kernels, payment processors and disaster tech."
      />

      <div v-reveal class="route card">
        <ol class="stops">
          <li
            v-for="(stop, i) in profile.journey"
            :key="stop.title"
            class="stop lift"
            :class="`tone-${stop.tone}`"
          >
            <p class="stop__head">
              <span class="stop__tag mono">{{ stop.tag }}</span>
              <span class="stop__years mono">{{ stop.years }}</span>
            </p>
            <h3 class="stop__title">{{ stop.title }}</h3>
            <p class="stop__subtitle mono">{{ stop.subtitle }}</p>
            <p class="stop__text">{{ stop.text }}</p>
            <p class="stop__place mono">📍 {{ stop.place }}</p>
            <span v-if="i < profile.journey.length - 1" class="stop__arrow" aria-hidden="true"
              >→</span
            >
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>

<style scoped>
.route {
  position: relative;
  padding: clamp(1.25rem, 3vw, 2rem);
  background: var(--card);
}

.stops {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  list-style: none;
}

.stop {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 1rem;
  border: var(--line-thin);
  border-radius: var(--radius);
  background: var(--paper);
  box-shadow: 3px 3px 0 var(--ink);
}

.stop:last-child {
  background: var(--ink);
  color: var(--paper);
}

.stop__head {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
}

.stop__tag {
  padding: 0.05rem 0.45rem;
  border: 1.5px solid var(--ink);
  border-radius: 5px;
  background: var(--tone-tint);
  color: var(--ink);
  font-size: 0.65rem;
  text-transform: uppercase;
}

.stop__years {
  padding: 0.05rem 0.45rem;
  border: 1.5px solid var(--ink);
  border-radius: 5px;
  background: var(--tone);
  color: var(--tone-ink);
  font-size: 0.7rem;
}

.stop:last-child .stop__tag {
  background: var(--yellow);
}

.stop:last-child .stop__years {
  background: var(--card);
  color: var(--ink);
}

.stop__title {
  font-size: 1.15rem;
}

.stop__subtitle {
  color: var(--tomato-text);
  font-size: 0.75rem;
}

.stop:last-child .stop__subtitle {
  color: var(--yellow);
}

.stop__text {
  font-size: 0.9rem;
  color: var(--ink-soft);
}

.stop:last-child .stop__text,
.stop:last-child .stop__place {
  color: var(--paper-3);
}

.stop__place {
  margin-top: auto;
  padding-top: 0.5rem;
  font-size: 0.7rem;
  font-weight: 500;
  color: var(--ink-faint);
}

.stop__arrow {
  position: absolute;
  right: -1.2rem;
  top: 50%;
  translate: 0 -50%;
  z-index: 2;
  font-family: var(--font-hand);
  font-size: 1.6rem;
  color: var(--tomato);
}

@media (max-width: 980px) {
  .stops {
    grid-template-columns: repeat(2, 1fr);
  }

  .stop__arrow {
    display: none;
  }
}

@media (max-width: 560px) {
  .stops {
    grid-template-columns: 1fr;
  }
}
</style>
