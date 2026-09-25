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
  <section id="projects" class="section" aria-labelledby="projects-title">
    <div class="container">
      <SectionHeading
        id="projects-title"
        label="Shipped work"
        :note="`${projects.filter((p) => p.featured).length} featured builds`"
        title="Things I’ve built"
        tag="PORTFOLIO"
        tone="tomato"
        lead="Each one has a full case study: the problem, what I built, how it fits together and the decisions behind it."
      />

      <div class="filters" role="group" aria-label="Filter projects by area">
        <button
          v-for="f in filters"
          :key="f.id"
          type="button"
          class="filter mono"
          :aria-pressed="active === f.id"
          @click="active = f.id"
        >
          {{ f.label }}
        </button>
        <span class="hand filters__note" aria-hidden="true">← pick one!</span>
      </div>
      <p class="visually-hidden" aria-live="polite">{{ visible.length }} projects shown</p>

      <ul v-if="featured.length" class="grid grid--featured">
        <li v-for="p in featured" :key="p.slug" v-reveal>
          <ProjectCard :project="p" />
        </li>
      </ul>

      <template v-if="more.length">
        <h3 class="more__title">
          <span class="sticker tone-lilac">More builds in the vault</span>
        </h3>
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
.filters {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 2rem;
}

.filter {
  padding: 0.45rem 0.9rem;
  border: var(--line-thin);
  border-radius: 999px;
  background: var(--card);
  box-shadow: var(--shadow-sm);
  font-size: 0.78rem;
  cursor: pointer;
  transition:
    transform 140ms var(--ease),
    background 140ms var(--ease);
}

.filter:hover {
  transform: translate(-1px, -2px);
  background: var(--yellow-tint);
}

.filter[aria-pressed='true'] {
  background: var(--ink);
  color: var(--paper);
}

.filters__note {
  font-size: 1.35rem;
  color: var(--tomato-text);
}

.grid {
  display: grid;
  gap: 1.75rem;
  list-style: none;
}

.grid--featured {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.grid--more {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.more__title {
  margin: 3rem 0 1.25rem;
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

  .filters__note {
    display: none;
  }
}
</style>
