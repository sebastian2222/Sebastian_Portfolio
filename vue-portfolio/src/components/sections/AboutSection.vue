<script setup>
import SectionHeading from '@/components/SectionHeading.vue'
import { profile } from '@/data/profile'
import { skills } from '@/data/skills'
import { education } from '@/data/education'
import { formatPeriod } from '@/utils/format'
</script>

<template>
  <section id="about" class="section" aria-labelledby="about-title">
    <div class="container">
      <SectionHeading id="about-title" index="03" eyebrow="About" title="How I work" />

      <div class="about">
        <div v-reveal class="about__story">
          <p v-for="(para, i) in profile.about" :key="i">{{ para }}</p>
        </div>

        <div v-reveal class="about__edu">
          <h3 class="mono block-title">Education</h3>
          <article v-for="e in education" :key="e.id" class="edu">
            <p class="mono edu__when">{{ formatPeriod(e.start, e.end) }}</p>
            <h4 class="edu__school">{{ e.school }}</h4>
            <p>{{ e.degree }}</p>
            <p class="edu__result">{{ e.result }}</p>
            <p v-for="(d, i) in e.details" :key="i" class="edu__detail">{{ d }}</p>
          </article>
        </div>
      </div>

      <h3 class="mono block-title skills__title">Toolbox</h3>
      <div class="skills">
        <div v-for="group in skills" :key="group.group" v-reveal class="skill-group">
          <h4 class="skill-group__name">{{ group.group }}</h4>
          <ul class="skill-group__items">
            <li v-for="item in group.items" :key="item" class="chip">{{ item }}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
  gap: clamp(2rem, 6vw, 5rem);
}

.about__story {
  display: grid;
  align-content: start;
  gap: 1.1rem;
  font-size: 1.075rem;
  color: var(--text-muted);
}

.about__story p:first-child {
  color: var(--text);
  font-size: 1.2rem;
  font-family: var(--font-display);
  line-height: 1.5;
}

.block-title {
  color: var(--text-faint);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.75rem;
  font-weight: 500;
  margin-bottom: 1rem;
}

.about__edu {
  display: grid;
  gap: 1rem;
  align-content: start;
}

.edu {
  padding: 1.25rem 1.35rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
}

.edu__when {
  color: var(--text-faint);
  font-size: 0.75rem;
}

.edu__school {
  margin-top: 0.3rem;
  font-size: 1.1rem;
}

.edu__result {
  margin-top: 0.4rem;
  color: var(--accent);
  font-weight: 600;
  font-size: 0.925rem;
}

.edu__detail {
  margin-top: 0.4rem;
  color: var(--text-muted);
  font-size: 0.9rem;
}

.skills__title {
  margin-top: clamp(3rem, 7vw, 5rem);
}

.skills {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1rem;
}

.skill-group {
  padding: 1.1rem 1.25rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
}

.skill-group__name {
  font-size: 0.975rem;
  margin-bottom: 0.75rem;
}

.skill-group__items {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  list-style: none;
}

@media (max-width: 860px) {
  .about {
    grid-template-columns: 1fr;
  }
}
</style>
