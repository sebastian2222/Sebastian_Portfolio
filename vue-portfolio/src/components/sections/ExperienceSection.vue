<script setup>
import AppIcon from '@/components/AppIcon.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import { experience } from '@/data/experience'
import { getProject } from '@/data/projects'
import { formatPeriod } from '@/utils/format'

// Tab colour per card, in order.
const TABS = ['yellow', 'mint', 'tomato']
const CHIP_TONES = ['mint', 'yellow', 'cobalt', 'lilac', 'pink', 'tomato']
</script>

<template>
  <section id="experience" class="section" aria-labelledby="experience-title">
    <div class="container">
      <SectionHeading
        id="experience-title"
        label="Field experience"
        note="4+ years of production impact"
        title="Work experience"
        tag="LOGBOOK"
        tone="cobalt"
        lead="Index cards pulled straight from my engineering logbook."
      />

      <ol class="jobs">
        <li
          v-for="(job, i) in experience"
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

          <ul class="job__highlights">
            <li v-for="(h, j) in job.highlights" :key="j">{{ h }}</li>
          </ul>

          <ul class="job__stack" aria-label="Tools used">
            <li
              v-for="(s, j) in job.stack"
              :key="s"
              class="chip"
              :class="`tone-${CHIP_TONES[j % CHIP_TONES.length]}`"
            >
              {{ s }}
            </li>
          </ul>

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
    </div>
  </section>
</template>

<style scoped>
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
