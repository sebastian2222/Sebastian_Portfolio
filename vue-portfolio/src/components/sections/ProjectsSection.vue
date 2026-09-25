<script setup>
import { computed, ref } from 'vue'
import SectionHeading from '@/components/SectionHeading.vue'
import ProjectCard from '@/components/ProjectCard.vue'
import { categories, projects } from '@/data/projects'

const active = ref('all')

// Only offer filters that match at least one project.
const filters = computed(() =>
  categories.filter((c) => c.id === 'all' || projects.some((p) => p.categories.includes(c.id))),
)

const visible = computed(() =>
  active.value === 'all' ? projects : projects.filter((p) => p.categories.includes(active.value)),
)
const featured = computed(() => visible.value.filter((p) => p.featured))
const more = computed(() => visible.value.filter((p) => !p.featured))
</script>

<template>
  <section id="projects" class="section projects" aria-labelledby="projects-title">
    <div class="container">
      <SectionHeading
        id="projects-title"
        index="02"
        eyebrow="Projects"
        title="Selected work"
        lead="Each case study covers the problem, what I built, how it fits together and the decisions behind it. Live links, source and demos are included where the project allows."
      />

      <div class="filters" role="group" aria-label="Filter projects by area">
        <button
          v-for="f in filters"
          :key="f.id"
          type="button"
          class="filter"
          :aria-pressed="active === f.id"
          @click="active = f.id"
        >
          {{ f.label }}
        </button>
      </div>
      <p class="visually-hidden" aria-live="polite">{{ visible.length }} projects shown</p>

      <ul v-if="featured.length" class="grid grid--featured">
        <li v-for="p in featured" :key="p.slug" v-reveal>
          <ProjectCard :project="p" />
        </li>
      </ul>

      <template v-if="more.length">
        <h3 class="mono more__title">More projects</h3>
        <ul class="grid grid--more">
          <li v-for="p in more" :key="p.slug" v-reveal>
            <ProjectCard :project="p" compact />
          </li>
        </ul>
      </template>
    </div>
  </section>
</template>

<style scoped>
.projects {
  background: linear-gradient(
    180deg,
    transparent,
    var(--bg-raised) 20%,
    var(--bg-raised) 80%,
    transparent
  );
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.filter {
  padding: 0.45rem 0.95rem;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text-muted);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 160ms var(--ease);
}

.filter:hover {
  color: var(--text);
  border-color: var(--border-strong);
}

.filter[aria-pressed='true'] {
  background: var(--text);
  border-color: var(--text);
  color: var(--bg);
}

.grid {
  display: grid;
  gap: 1.25rem;
  list-style: none;
}

.grid--featured {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.grid--more {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.more__title {
  margin: 3.5rem 0 1.25rem;
  color: var(--text-faint);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.75rem;
  font-weight: 500;
}

@media (max-width: 960px) {
  .grid--more {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 680px) {
  .grid--featured,
  .grid--more {
    grid-template-columns: 1fr;
  }
}
</style>
