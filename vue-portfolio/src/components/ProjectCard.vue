<script setup>
import { computed } from 'vue'
import AppIcon from './AppIcon.vue'
import { toneOf } from '@/data/projects'

const props = defineProps({
  project: { type: Object, required: true },
  compact: { type: Boolean, default: false },
})

const MAX_TAGS = 5
const tags = computed(() => props.project.stack.slice(0, MAX_TAGS))
const extra = computed(() => Math.max(0, props.project.stack.length - MAX_TAGS))
const tone = computed(() => toneOf(props.project))

const badges = computed(() => {
  const kinds = new Set(props.project.links.map((l) => l.kind))
  const list = []
  if (kinds.has('live')) list.push({ icon: 'arrow-up-right', text: 'Live' })
  if (props.project.media?.video) list.push({ icon: 'play', text: 'Demo video' })
  if (kinds.has('repo')) list.push({ icon: 'code', text: 'Source' })
  return list
})
</script>

<template>
  <article class="pcard card" :class="[`tone-${tone}`, { 'pcard--compact': compact }]">
    <header class="pcard__bar">
      <span class="mono pcard__context">{{ project.context }}</span>
      <span class="mono pcard__year">{{ project.year }}</span>
    </header>

    <div class="pcard__body">
      <h3 class="pcard__title">
        <RouterLink :to="{ name: 'project', params: { slug: project.slug } }" class="pcard__link">
          {{ project.title }}
        </RouterLink>
      </h3>
      <p class="pcard__tagline">{{ project.tagline }}</p>

      <ul v-if="!compact" class="pcard__tags" aria-label="Tech stack">
        <li v-for="tag in tags" :key="tag" class="chip">{{ tag }}</li>
        <li v-if="extra" class="chip">+{{ extra }}</li>
      </ul>

      <div class="pcard__footer">
        <ul class="pcard__badges">
          <li class="badge badge--team mono">{{ project.team }}</li>
          <li v-for="b in badges" :key="b.text" class="badge mono">
            <AppIcon :name="b.icon" :size="12" /> {{ b.text }}
          </li>
        </ul>
        <span class="pcard__cta mono" aria-hidden="true">
          Case study <AppIcon name="arrow-right" :size="15" />
        </span>
      </div>
    </div>
  </article>
</template>

<style scoped>
.pcard {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  transition:
    transform 160ms var(--ease),
    box-shadow 160ms var(--ease);
}

.pcard:hover,
.pcard:focus-within {
  transform: translate(-2px, -3px);
  box-shadow: var(--shadow-lg);
}

.pcard__bar {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.7rem 1.1rem;
  background: var(--tone);
  color: var(--tone-ink);
  border-bottom: var(--line-thin);
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.pcard__year {
  flex-shrink: 0;
}

.pcard__body {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1.25rem 1.25rem 1.1rem;
}

.pcard__title {
  font-size: clamp(1.3rem, 2.4vw, 1.55rem);
}

.pcard__link {
  color: var(--ink);
  text-decoration: none;
}

/* Stretched link: whole card clickable, one tab stop. */
.pcard__link::after {
  content: '';
  position: absolute;
  inset: 0;
}

.pcard__link:focus-visible {
  outline: none;
}

.pcard:has(.pcard__link:focus-visible) {
  outline: 3px solid var(--cobalt);
  outline-offset: 4px;
}

.pcard__tagline {
  color: var(--ink-soft);
  font-size: 0.95rem;
}

.pcard__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  list-style: none;
}

.pcard__tags .chip {
  background: var(--tone-tint);
}

.pcard__footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-top: auto;
  padding-top: 0.9rem;
  border-top: 2px dashed rgb(27 31 59 / 0.2);
}

.pcard__badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  list-style: none;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.15rem 0.5rem;
  border: 1.5px solid var(--ink);
  border-radius: 999px;
  background: var(--mint);
  font-size: 0.68rem;
  text-transform: uppercase;
}

.badge--team {
  background: var(--paper-2);
}

.pcard__cta {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  color: var(--tomato-text);
  font-size: 0.78rem;
  transition: gap 160ms var(--ease);
}

.pcard:hover .pcard__cta {
  gap: 0.55rem;
}

.pcard--compact .pcard__title {
  font-size: 1.2rem;
}

.pcard--compact .pcard__tagline {
  font-size: 0.9rem;
}
</style>
