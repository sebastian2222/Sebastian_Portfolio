<script setup>
import AppIcon from '@/components/AppIcon.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import { experience } from '@/data/experience'
import { getProject } from '@/data/projects'
import { formatPeriod } from '@/utils/format'
</script>

<template>
  <section id="experience" class="section" aria-labelledby="experience-title">
    <div class="container">
      <SectionHeading
        id="experience-title"
        index="01"
        eyebrow="Experience"
        title="Production systems, people and platforms"
        lead="From payment switches that move card transactions worldwide to a humanitarian platform launched in Geneva."
      />

      <ol class="timeline">
        <li v-for="job in experience" :key="job.id" v-reveal class="job">
          <div class="job__when">
            <p class="mono">{{ formatPeriod(job.start, job.end) }}</p>
            <p class="job__where"><AppIcon name="pin" :size="14" /> {{ job.location }}</p>
          </div>

          <div class="job__body">
            <h3 class="job__role">{{ job.role }}</h3>
            <p class="job__org">{{ job.org }}</p>
            <p class="job__summary">{{ job.summary }}</p>

            <ul class="job__highlights">
              <li v-for="(h, i) in job.highlights" :key="i">{{ h }}</li>
            </ul>

            <ul class="job__stack" aria-label="Tools used">
              <li v-for="s in job.stack" :key="s" class="chip">{{ s }}</li>
            </ul>

            <div v-if="job.links.length || job.projects.length || job.note" class="job__links">
              <RouterLink
                v-for="slug in job.projects"
                :key="slug"
                :to="{ name: 'project', params: { slug } }"
                class="job__link"
              >
                Case study: {{ getProject(slug).title }} <AppIcon name="arrow-right" :size="14" />
              </RouterLink>
              <a
                v-for="l in job.links"
                :key="l.href"
                :href="l.href"
                target="_blank"
                rel="noopener"
                class="job__link"
              >
                {{ l.label }} <AppIcon name="arrow-up-right" :size="14" />
              </a>
              <p v-if="job.note" class="job__note">
                <AppIcon name="lock" :size="14" /> {{ job.note }}
              </p>
            </div>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.timeline {
  list-style: none;
  display: grid;
  gap: 0;
}

.job {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: clamp(1rem, 4vw, 3rem);
  padding-block: 2.25rem;
  border-top: 1px solid var(--border);
}

.job:last-child {
  border-bottom: 1px solid var(--border);
}

.job__when {
  color: var(--text-muted);
}

.job__where {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  margin-top: 0.35rem;
  font-size: 0.85rem;
  color: var(--text-faint);
}

.job__role {
  font-size: 1.4rem;
}

.job__org {
  margin-top: 0.2rem;
  color: var(--accent);
  font-weight: 550;
}

.job__summary {
  margin-top: 0.9rem;
  color: var(--text-muted);
}

.job__highlights {
  margin-top: 1rem;
  display: grid;
  gap: 0.6rem;
  list-style: none;
}

.job__highlights li {
  position: relative;
  padding-left: 1.25rem;
}

.job__highlights li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.7em;
  width: 7px;
  height: 7px;
  border-radius: 2px;
  background: var(--accent);
  opacity: 0.8;
}

.job__stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 1.25rem;
  list-style: none;
}

.job__links {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem 1.25rem;
  margin-top: 1.25rem;
}

.job__link {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-weight: 600;
  font-size: 0.9rem;
  text-decoration: none;
  color: var(--text);
  border-bottom: 1px solid var(--border-strong);
}

.job__link:hover {
  border-color: var(--accent);
}

.job__note {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--text-faint);
  font-size: 0.85rem;
}

@media (max-width: 720px) {
  .job {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
}
</style>
