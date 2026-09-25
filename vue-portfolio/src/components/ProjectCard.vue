<script setup>
import { computed } from 'vue'
import AppIcon from './AppIcon.vue'

const props = defineProps({
  project: { type: Object, required: true },
  compact: { type: Boolean, default: false },
})

const MAX_TAGS = 5
const tags = computed(() => props.project.stack.slice(0, MAX_TAGS))
const extra = computed(() => Math.max(0, props.project.stack.length - MAX_TAGS))

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
  <article class="card" :class="{ 'card--compact': compact }">
    <div class="card__top mono">
      <span>{{ project.context }}</span>
      <span class="card__year">{{ project.year }}</span>
    </div>

    <h3 class="card__title">
      <RouterLink :to="{ name: 'project', params: { slug: project.slug } }" class="card__link">
        {{ project.title }}
      </RouterLink>
    </h3>
    <p class="card__tagline">{{ project.tagline }}</p>

    <ul v-if="!compact" class="card__tags" aria-label="Tech stack">
      <li v-for="tag in tags" :key="tag" class="chip">{{ tag }}</li>
      <li v-if="extra" class="chip">+{{ extra }}</li>
    </ul>

    <div class="card__footer">
      <ul class="card__badges">
        <li class="badge badge--team">{{ project.team }}</li>
        <li v-for="b in badges" :key="b.text" class="badge">
          <AppIcon :name="b.icon" :size="13" /> {{ b.text }}
        </li>
      </ul>
      <span class="card__cta" aria-hidden="true">
        Case study <AppIcon name="arrow-right" :size="16" />
      </span>
    </div>
  </article>
</template>

<style scoped>
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  height: 100%;
  padding: clamp(1.25rem, 3vw, 1.75rem);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background: linear-gradient(180deg, var(--surface) 0%, var(--bg-raised) 100%);
  box-shadow: var(--shadow);
  transition:
    border-color 200ms var(--ease),
    transform 200ms var(--ease);
}

.card:hover,
.card:focus-within {
  border-color: color-mix(in srgb, var(--accent) 55%, var(--border));
  transform: translateY(-3px);
}

.card__top {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  color: var(--text-faint);
  font-size: 0.72rem;
}

.card__year {
  flex-shrink: 0;
}

.card__title {
  font-size: clamp(1.3rem, 2.4vw, 1.6rem);
}

/* Stretched link: the whole card is clickable, one tab stop. */
.card__link {
  text-decoration: none;
}

.card__link::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
}

.card__link:focus-visible {
  outline: none;
}

.card:has(.card__link:focus-visible) {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
}

.card__tagline {
  color: var(--text-muted);
}

.card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  list-style: none;
}

.card__footer {
  margin-top: auto;
  padding-top: 0.75rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}

.card__badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  list-style: none;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--accent);
  background: var(--accent-soft);
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
}

.badge--team {
  color: var(--text-muted);
  background: var(--surface-2);
}

.card__cta {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-muted);
  transition:
    color 200ms var(--ease),
    gap 200ms var(--ease);
}

.card:hover .card__cta {
  color: var(--accent);
  gap: 0.55rem;
}

.card--compact .card__title {
  font-size: 1.2rem;
}
</style>
