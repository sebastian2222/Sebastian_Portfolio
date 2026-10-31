<script setup>
import { reactive } from 'vue'
import AppIcon from '@/components/AppIcon.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import { experience } from '@/data/experience'
import { getProject } from '@/data/projects'
import { formatPeriod } from '@/utils/format'
import { track } from '@/utils/analytics'

// Tab colour per card, in order.
const TABS = ['yellow', 'mint', 'tomato']
const CHIP_TONES = ['mint', 'yellow', 'cobalt', 'lilac', 'pink', 'tomato']

// Progressive disclosure: the strongest highlights and tools show first.
// Hidden items stay in the DOM (v-show) so search and Ctrl+F still find them.
const VISIBLE_HIGHLIGHTS = 3
const VISIBLE_CHIPS = 8

const expanded = reactive({})
const hiddenHighlights = (job) => Math.max(0, job.highlights.length - VISIBLE_HIGHLIGHTS)
const hasMore = (job) => hiddenHighlights(job) > 0 || job.stack.length > VISIBLE_CHIPS

function toggleLabel(job) {
  if (expanded[job.id]) return 'Show less'
  const n = hiddenHighlights(job)
  if (!n) return 'Show all tools'
  return `Show ${n} more ${n === 1 ? 'highlight' : 'highlights'}`
}

function toggle(job) {
  expanded[job.id] = !expanded[job.id]
  if (expanded[job.id]) track('experience_expand', { job_id: job.id })
}
</script>

<template>
  <section id="experience" class="section" aria-labelledby="experience-title">
    <div class="container">
      <SectionHeading
        id="experience-title"
        label="Field experience"
        note="3+ years of production impact"
        title="Work experience"
        tag="LOGBOOK"
        tone="cobalt"
        lead="Index cards pulled straight from my engineering logbook."
      />

      <nav class="jump" aria-label="Jump to a role">
        <ol class="jump__list">
          <li v-for="(job, i) in experience" :key="job.id">
            <RouterLink
              :to="{ name: 'home', hash: `#job-${job.id}` }"
              class="jump__item"
              :class="`tone-${TABS[i % TABS.length]}`"
            >
              <span class="jump__role">{{ job.role }}</span>
              <span class="jump__org">{{ job.org }}</span>
              <span class="jump__dates mono">{{ formatPeriod(job.start, job.end) }}</span>
            </RouterLink>
          </li>
        </ol>
      </nav>

      <ol class="jobs">
        <li
          v-for="(job, i) in experience"
          :id="`job-${job.id}`"
          :key="job.id"
          v-reveal
          class="job card"
          :class="`tone-${TABS[i % TABS.length]}`"
        >
          <p class="job__tab mono">{{ formatPeriod(job.start, job.end) }}</p>

          <div class="job__head">
            <div>
              <h3 class="job__role">{{ job.role }}</h3>
              <p class="job__org">{{ job.org }}</p>
              <p class="job__where mono"><AppIcon name="pin" :size="13" /> {{ job.location }}</p>
            </div>
            <RouterLink
              v-for="slug in job.projects"
              :key="slug"
              :to="{ name: 'project', params: { slug } }"
              class="job__case mono"
            >
              Case study: {{ getProject(slug).title }} <AppIcon name="arrow-right" :size="14" />
            </RouterLink>
          </div>

          <p class="job__summary">{{ job.summary }}</p>

          <ul :id="`job-${job.id}-details`" class="job__highlights">
            <li
              v-for="(h, j) in job.highlights"
              v-show="expanded[job.id] || j < VISIBLE_HIGHLIGHTS"
              :key="j"
            >
              {{ h }}
            </li>
          </ul>

          <ul class="job__stack" aria-label="Tools used">
            <li
              v-for="(s, j) in job.stack"
              v-show="expanded[job.id] || j < VISIBLE_CHIPS"
              :key="s"
              class="chip"
              :class="`tone-${CHIP_TONES[j % CHIP_TONES.length]}`"
            >
              {{ s }}
            </li>
            <li
              v-if="!expanded[job.id] && job.stack.length > VISIBLE_CHIPS"
              class="chip job__more-chip"
              aria-hidden="true"
            >
              +{{ job.stack.length - VISIBLE_CHIPS }}
            </li>
          </ul>

          <button
            v-if="hasMore(job)"
            type="button"
            class="btn btn--navy job__toggle"
            :aria-expanded="String(!!expanded[job.id])"
            :aria-controls="`job-${job.id}-details`"
            @click="toggle(job)"
          >
            {{ toggleLabel(job) }}
            <AppIcon
              name="chevron-down"
              :size="16"
              class="job__chevron"
              :class="{ 'job__chevron--up': expanded[job.id] }"
            />
          </button>

          <div v-if="job.links.length || job.note" class="job__footer">
            <a
              v-for="l in job.links"
              :key="l.href"
              :href="l.href"
              target="_blank"
              rel="noopener"
              class="job__link mono"
            >
              {{ l.label }} <AppIcon name="arrow-up-right" :size="13" />
            </a>
            <p v-if="job.note" class="job__note">
              <AppIcon name="lock" :size="14" /> {{ job.note }}
            </p>
          </div>
        </li>
      </ol>

      <p class="next">
        <RouterLink :to="{ name: 'home', hash: '#projects' }" class="btn btn--yellow">
          See the projects behind this work <AppIcon name="arrow-right" />
        </RouterLink>
      </p>
    </div>
  </section>
</template>

<style scoped>
.jump {
  margin-bottom: 3rem;
}

.jump__list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.75rem;
  list-style: none;
}

.jump__item {
  display: grid;
  gap: 0.15rem;
  height: 100%;
  min-height: 44px;
  padding: 0.6rem 0.8rem;
  border: var(--line-thin);
  border-left: 6px solid var(--tone);
  border-radius: var(--radius-sm);
  background: var(--card);
  box-shadow: var(--shadow-sm);
  color: var(--ink);
  text-decoration: none;
  transition: transform 140ms var(--ease);
}

.jump__item:hover {
  transform: translate(-1px, -2px);
}

.jump__role {
  font-weight: 700;
  line-height: 1.25;
}

.jump__org {
  color: var(--ink-soft);
  font-size: 0.85rem;
  line-height: 1.3;
}

.jump__dates {
  color: var(--ink-faint);
  font-size: 0.7rem;
}

.jobs {
  display: grid;
  gap: 2.75rem;
  list-style: none;
}

.job {
  position: relative;
  padding: 0 clamp(1.25rem, 3vw, 2rem) clamp(1.25rem, 3vw, 2rem);
}

.job__tab {
  display: inline-block;
  margin: -1.9rem 0 0.75rem 0.25rem;
  padding: 0.35rem 1rem;
  border: var(--line);
  border-bottom: 0;
  border-radius: 10px 10px 0 0;
  background: var(--tone);
  color: var(--tone-ink);
  font-size: 0.75rem;
  text-transform: uppercase;
}

.job__head {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}

.job__role {
  font-size: clamp(1.35rem, 2.6vw, 1.7rem);
}

.job__org {
  margin-top: 0.15rem;
  color: var(--tomato-text);
  font-weight: 700;
}

.job__where {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  margin-top: 0.25rem;
  font-size: 0.72rem;
  font-weight: 500;
  color: var(--ink-faint);
}

.job__case {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.4rem 0.75rem;
  border: var(--line-thin);
  border-radius: var(--radius-sm);
  background: var(--paper-2);
  box-shadow: var(--shadow-sm);
  color: var(--ink);
  font-size: 0.72rem;
  text-decoration: none;
  transition: transform 140ms var(--ease);
}

.job__case:hover {
  transform: translate(-1px, -2px);
}

.job__summary {
  margin-top: 0.9rem;
  color: var(--ink-soft);
}

.job__highlights {
  display: grid;
  gap: 0.55rem;
  margin-top: 1rem;
  list-style: none;
}

.job__highlights li {
  position: relative;
  padding-left: 1.2rem;
}

.job__highlights li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.6em;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--tomato);
  border: 1.5px solid var(--ink);
}

.job__stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1.4rem;
  list-style: none;
}

.job__more-chip {
  background: var(--paper-2);
  color: var(--ink-soft);
}

.job__toggle {
  margin-top: 1.25rem;
  min-height: 44px;
  padding: 0.65rem 1.1rem;
  font-size: 0.8rem;
}

.job__toggle[aria-expanded='true'] {
  background: var(--card);
  color: var(--ink);
}

.job__chevron {
  transition: rotate 200ms var(--ease);
}

.job__chevron--up {
  rotate: 180deg;
}

@media (prefers-reduced-motion: reduce) {
  .jump__item,
  .job__chevron {
    transition: none;
  }
}

.next {
  display: flex;
  justify-content: center;
  margin-top: 2.5rem;
}

.job__footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.6rem 1.25rem;
  margin-top: 1.25rem;
  padding-top: 1rem;
  border-top: 2px dashed rgb(27 31 59 / 0.25);
}

.job__link {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.78rem;
}

.job__note {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--ink-faint);
  font-size: 0.85rem;
}
</style>
