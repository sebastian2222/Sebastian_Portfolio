<script setup>
import { profile } from '@/data/profile'
import { skills } from '@/data/skills'
import { education } from '@/data/education'
import { formatPeriod } from '@/utils/format'

const GROUP_TONES = ['mint', 'yellow', 'cobalt', 'lilac', 'pink', 'tomato', 'mint', 'yellow']
</script>

<template>
  <section id="toolbox" class="section" aria-labelledby="about-title">
    <div class="container about">
      <div v-reveal class="story card">
        <span class="tape tape--pink" style="top: -12px; left: 40px; rotate: -3deg" />
        <p class="mono story__label">About Sebastian</p>
        <h2 id="about-title" class="story__title">Built for production. Curious by default.</h2>
        <div class="story__body">
          <p v-for="(para, i) in profile.about" :key="i">{{ para }}</p>
        </div>

        <h3 class="mono block-title">Education credentials</h3>
        <ul class="edu">
          <li v-for="e in education" :key="e.id" class="edu__item">
            <div class="edu__head">
              <p class="edu__school">{{ e.school }}</p>
              <p class="edu__result mono">{{ e.result }}</p>
            </div>
            <p class="edu__degree">{{ e.degree }}</p>
            <p class="edu__meta mono">{{ e.location }} · {{ formatPeriod(e.start, e.end) }}</p>
          </li>
        </ul>
      </div>

      <div v-reveal class="pegboard card">
        <div class="pegboard__head">
          <div>
            <p class="mono story__label">The pegboard</p>
            <h2 class="story__title">My everyday toolbox</h2>
          </div>
          <span class="sticker tone-yellow">Verified tech</span>
        </div>
        <p class="pegboard__lead">Tools I’ve used to ship real work, not just tutorials.</p>

        <div v-for="(group, i) in skills" :key="group.group" class="pegboard__group">
          <h3 class="mono block-title">{{ group.group }}</h3>
          <ul class="pegboard__items">
            <li
              v-for="item in group.items"
              :key="item"
              class="chip"
              :class="`tone-${GROUP_TONES[i % GROUP_TONES.length]}`"
            >
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about {
  display: grid;
  grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
  gap: 2rem;
  align-items: start;
}

.story,
.pegboard {
  position: relative;
  padding: clamp(1.25rem, 3vw, 2rem);
}

.story {
  background: var(--paper);
}

.story__label {
  color: var(--tomato-text);
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.story__title {
  margin-top: 0.35rem;
  font-size: clamp(1.5rem, 3vw, 2rem);
}

.story__body {
  display: grid;
  gap: 0.9rem;
  margin-top: 1rem;
  color: var(--ink-soft);
}

.block-title {
  margin: 1.5rem 0 0.6rem;
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--ink);
}

.edu {
  display: grid;
  gap: 0.75rem;
  list-style: none;
}

.edu__item {
  padding: 0.85rem 1rem;
  border: var(--line-thin);
  border-radius: var(--radius);
  background: var(--card);
  box-shadow: 3px 3px 0 var(--ink);
}

.edu__head {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.25rem 0.75rem;
}

.edu__school {
  font-family: var(--font-display);
  font-weight: 800;
}

.edu__result {
  color: var(--tomato-text);
  font-size: 0.75rem;
}

.edu__degree {
  font-size: 0.9rem;
}

.edu__meta {
  font-size: 0.7rem;
  font-weight: 500;
  color: var(--ink-faint);
}

.pegboard {
  background:
    radial-gradient(rgb(27 31 59 / 0.18) 2px, transparent 2px) 0 0 / 28px 28px,
    var(--paper-2);
}

.pegboard__head {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}

.pegboard__head .sticker {
  rotate: 3deg;
}

.pegboard__lead {
  margin-top: 0.4rem;
  color: var(--ink-soft);
}

.pegboard__group .block-title {
  margin-top: 1.25rem;
}

.pegboard__items {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  list-style: none;
}

.pegboard__items .chip {
  background: var(--tone-tint);
}

@media (max-width: 900px) {
  .about {
    grid-template-columns: 1fr;
  }
}
</style>
