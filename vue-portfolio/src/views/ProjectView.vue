<script setup>
import { computed } from 'vue'
import AppIcon from '@/components/AppIcon.vue'
import ArchitectureFlow from '@/components/ArchitectureFlow.vue'
import { projects, getProject } from '@/data/projects'
import { asset, isExternal } from '@/utils/format'

const props = defineProps({ slug: { type: String, required: true } })

const project = computed(() => getProject(props.slug))
const index = computed(() => projects.findIndex((p) => p.slug === props.slug))
const prev = computed(() => projects[(index.value - 1 + projects.length) % projects.length])
const next = computed(() => projects[(index.value + 1) % projects.length])

const LINK_ICONS = { live: 'arrow-up-right', repo: 'github', demo: 'play', docs: 'doc' }

// The video is embedded below, so skip the demo link in the header.
const headerLinks = computed(() =>
  project.value.links.filter((l) => !(l.kind === 'demo' && project.value.media?.video)),
)
</script>

<template>
  <article v-if="project" class="case">
    <header class="case__header">
      <div class="container">
        <RouterLink :to="{ name: 'home', hash: '#projects' }" class="back">
          <AppIcon name="arrow-left" :size="16" /> All projects
        </RouterLink>

        <p class="mono case__context">{{ project.context }}</p>
        <h1 class="case__title">{{ project.title }}</h1>
        <p class="case__tagline">{{ project.tagline }}</p>

        <dl class="facts">
          <div>
            <dt>Year</dt>
            <dd>{{ project.year }}</dd>
          </div>
          <div>
            <dt>Role</dt>
            <dd>{{ project.role }}</dd>
          </div>
          <div>
            <dt>Team</dt>
            <dd>{{ project.team }}</dd>
          </div>
        </dl>

        <div v-if="headerLinks.length || project.privateNote" class="case__links">
          <a
            v-for="(l, i) in headerLinks"
            :key="l.href"
            :href="asset(l.href)"
            class="btn"
            :class="{ 'btn--primary': i === 0 }"
            :target="isExternal(l.href) ? '_blank' : undefined"
            :rel="isExternal(l.href) ? 'noopener' : undefined"
          >
            <AppIcon :name="LINK_ICONS[l.kind]" /> {{ l.label }}
          </a>
          <p v-if="project.privateNote" class="private">
            <AppIcon name="lock" :size="15" /> {{ project.privateNote }}
          </p>
        </div>
      </div>
    </header>

    <div class="container case__body">
      <div class="case__main">
        <figure v-if="project.media?.video" class="video">
          <video
            controls
            preload="none"
            playsinline
            :poster="asset(project.media.poster)"
            :src="asset(project.media.video)"
          >
            <a :href="asset(project.media.video)">Download the demo video</a>
          </video>
          <figcaption class="mono">Walkthrough and demo recording</figcaption>
        </figure>

        <section class="block">
          <h2 class="block__title">The problem</h2>
          <p class="prose">{{ project.problem }}</p>
        </section>

        <section class="block">
          <h2 class="block__title">What I built</h2>
          <ul class="list">
            <li v-for="(item, i) in project.built" :key="i">{{ item }}</li>
          </ul>
        </section>

        <section v-if="project.contribution" class="block">
          <h2 class="block__title">My contribution</h2>
          <p class="callout">{{ project.contribution }}</p>
        </section>

        <section v-if="project.architecture" class="block">
          <h2 class="block__title">How it fits together</h2>
          <ArchitectureFlow v-bind="project.architecture" />
        </section>

        <section v-if="project.decisions?.length" class="block">
          <h2 class="block__title">Key engineering decisions</h2>
          <div class="decisions">
            <article v-for="d in project.decisions" :key="d.title" class="decision">
              <h3>{{ d.title }}</h3>
              <p>{{ d.detail }}</p>
            </article>
          </div>
        </section>

        <section v-if="project.results" class="block">
          <h2 class="block__title">Results</h2>

          <dl v-if="project.results.metrics" class="metrics">
            <div v-for="m in project.results.metrics" :key="m.label" class="metric">
              <dt>{{ m.label }}</dt>
              <dd>{{ m.value }}</dd>
            </div>
          </dl>

          <div v-if="project.results.table" class="table-wrap">
            <table>
              <caption>
                {{
                  project.results.table.caption
                }}
              </caption>
              <thead>
                <tr>
                  <th v-for="c in project.results.table.columns" :key="c" scope="col">{{ c }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, r) in project.results.table.rows" :key="r">
                  <td v-for="(cell, c) in row" :key="c">{{ cell }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <ul v-if="project.results.notes" class="list">
            <li v-for="(n, i) in project.results.notes" :key="i">{{ n }}</li>
          </ul>
        </section>
      </div>

      <aside class="case__aside" aria-label="Tech stack">
        <div class="aside__card">
          <h2 class="mono aside__title">Stack</h2>
          <ul class="aside__stack">
            <li v-for="s in project.stack" :key="s" class="chip">{{ s }}</li>
          </ul>
        </div>
      </aside>
    </div>

    <nav class="container pager" aria-label="More case studies">
      <RouterLink :to="{ name: 'project', params: { slug: prev.slug } }" class="pager__link">
        <span class="mono">Previous</span>
        <span class="pager__title"><AppIcon name="arrow-left" :size="16" /> {{ prev.title }}</span>
      </RouterLink>
      <RouterLink
        :to="{ name: 'project', params: { slug: next.slug } }"
        class="pager__link pager__link--next"
      >
        <span class="mono">Next</span>
        <span class="pager__title">{{ next.title }} <AppIcon name="arrow-right" :size="16" /></span>
      </RouterLink>
    </nav>
  </article>
</template>

<style scoped>
.case__header {
  padding-block: clamp(2.5rem, 6vw, 4.5rem) clamp(2rem, 5vw, 3rem);
  border-bottom: 1px solid var(--border);
  background:
    radial-gradient(ellipse 50% 90% at 90% 0%, var(--accent-soft), transparent 70%),
    var(--bg-raised);
}

.back {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--text-muted);
  font-size: 0.9rem;
  font-weight: 550;
  text-decoration: none;
}

.case__context {
  margin-top: 2rem;
  color: var(--accent);
  font-size: 0.78rem;
}

.case__title {
  margin-top: 0.75rem;
  font-size: clamp(2.3rem, 6vw, 4rem);
  letter-spacing: -0.035em;
  max-width: 20ch;
}

.case__tagline {
  margin-top: 1rem;
  max-width: 62ch;
  color: var(--text-muted);
  font-size: clamp(1.05rem, 2vw, 1.25rem);
}

.facts {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 2.5rem;
  margin: 2rem 0 0;
}

.facts dt {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--text-faint);
}

.facts dd {
  margin: 0.2rem 0 0;
  font-weight: 600;
}

.case__links {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.6rem 1rem;
  margin-top: 2rem;
}

.private {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--text-faint);
  font-size: 0.875rem;
}

.case__body {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 260px;
  gap: clamp(2rem, 5vw, 4rem);
  padding-block: clamp(2.5rem, 6vw, 4rem);
}

.case__main {
  display: grid;
  gap: clamp(2.5rem, 5vw, 3.5rem);
  min-width: 0;
}

.video {
  margin: 0;
}

.video video {
  width: 100%;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-strong);
  background: #000;
  aspect-ratio: 16 / 9;
}

.video figcaption {
  margin-top: 0.6rem;
  color: var(--text-faint);
  font-size: 0.75rem;
}

.block__title {
  font-size: clamp(1.35rem, 2.6vw, 1.7rem);
  margin-bottom: 1.1rem;
}

.prose {
  font-size: 1.075rem;
  color: var(--text-muted);
  max-width: 68ch;
}

.list {
  display: grid;
  gap: 0.75rem;
  list-style: none;
  max-width: 72ch;
}

.list li {
  position: relative;
  padding-left: 1.5rem;
}

.list li::before {
  content: '→';
  position: absolute;
  left: 0;
  color: var(--accent);
  font-family: var(--font-mono);
}

.callout {
  padding: 1.25rem 1.4rem;
  border-left: 3px solid var(--accent);
  border-radius: 0 var(--radius) var(--radius) 0;
  background: var(--accent-soft);
  max-width: 72ch;
}

.decisions {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1rem;
}

.decision {
  padding: 1.25rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
}

.decision h3 {
  font-size: 1.05rem;
  margin-bottom: 0.5rem;
}

.decision p {
  color: var(--text-muted);
  font-size: 0.95rem;
}

.metrics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1rem;
  margin: 0 0 1.5rem;
}

.metric {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  padding: 1.1rem 1.25rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
}

.metric dd {
  order: -1;
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.75rem;
  font-weight: 600;
  letter-spacing: -0.03em;
  color: var(--accent);
}

.metric dt {
  color: var(--text-muted);
  font-size: 0.875rem;
}

.table-wrap {
  overflow-x: auto;
  margin-bottom: 1.5rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.925rem;
  font-variant-numeric: tabular-nums;
}

caption {
  padding: 0.85rem 1rem;
  text-align: left;
  color: var(--text-muted);
  font-size: 0.85rem;
  border-bottom: 1px solid var(--border);
}

th,
td {
  padding: 0.65rem 1rem;
  text-align: right;
  white-space: nowrap;
}

th:first-child,
td:first-child {
  text-align: left;
}

th {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-faint);
  background: var(--surface-2);
}

tbody tr + tr td {
  border-top: 1px solid var(--border);
}

.case__aside {
  position: relative;
}

.aside__card {
  position: sticky;
  top: calc(var(--header-h) + 1.5rem);
  padding: 1.25rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
}

.aside__title {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--text-faint);
  margin-bottom: 0.85rem;
  font-weight: 500;
}

.aside__stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  list-style: none;
}

.pager {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  padding-bottom: clamp(3rem, 8vw, 6rem);
}

.pager__link {
  display: grid;
  gap: 0.35rem;
  padding: 1.25rem 1.4rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
  text-decoration: none;
  transition: border-color 160ms var(--ease);
}

.pager__link:hover {
  border-color: var(--accent);
  color: var(--text);
}

.pager__link .mono {
  color: var(--text-faint);
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.pager__title {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1.05rem;
}

.pager__link--next {
  text-align: right;
  justify-items: end;
}

@media (max-width: 900px) {
  .case__body {
    grid-template-columns: 1fr;
  }

  .case__aside {
    order: -1;
  }

  .aside__card {
    position: static;
  }
}

@media (max-width: 560px) {
  .pager {
    grid-template-columns: 1fr;
  }
}
</style>
