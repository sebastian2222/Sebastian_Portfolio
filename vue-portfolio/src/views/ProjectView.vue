<script setup>
import { computed } from 'vue'
import AppIcon from '@/components/AppIcon.vue'
import ArchitectureFlow from '@/components/ArchitectureFlow.vue'
import { projects, getProject, toneOf } from '@/data/projects'
import { asset, isExternal } from '@/utils/format'

const props = defineProps({ slug: { type: String, required: true } })

const project = computed(() => getProject(props.slug))
const tone = computed(() => toneOf(project.value))
const index = computed(() => projects.findIndex((p) => p.slug === props.slug))
const prev = computed(() => projects[(index.value - 1 + projects.length) % projects.length])
const next = computed(() => projects[(index.value + 1) % projects.length])

const LINK_ICONS = { live: 'arrow-up-right', repo: 'github', demo: 'play', docs: 'doc' }
const DECISION_TONES = ['yellow', 'mint', 'pink', 'lilac', 'cobalt', 'tomato']

// The video is embedded below, so skip the demo link in the header.
const headerLinks = computed(() =>
  project.value.links.filter((l) => !(l.kind === 'demo' && project.value.media?.video)),
)
</script>

<template>
  <article v-if="project" class="case">
    <header class="container case__header">
      <RouterLink :to="{ name: 'home', hash: '#projects' }" class="btn case__back">
        <AppIcon name="arrow-left" :size="16" /> All projects
      </RouterLink>

      <div class="hero card" :class="`tone-${tone}`">
        <span class="tape" style="top: -12px; left: 48px; rotate: -3deg" />
        <p class="mono hero__context">{{ project.context }}</p>
        <h1 class="hero__title">{{ project.title }}</h1>
        <p class="hero__tagline">{{ project.tagline }}</p>
        <p v-if="project.course" class="mono hero__course">Built at: {{ project.course }}</p>

        <ul class="hero__stickers">
          <li class="sticker tone-yellow">{{ project.year }}</li>
          <li class="sticker tone-mint">{{ project.team }}</li>
          <li class="sticker tone-pink">{{ project.role }}</li>
        </ul>

        <div v-if="headerLinks.length || project.privateNote" class="hero__links">
          <a
            v-for="(l, i) in headerLinks"
            :key="l.href"
            :href="asset(l.href)"
            class="btn"
            :class="{ 'btn--navy': i === 0 }"
            :target="isExternal(l.href) ? '_blank' : undefined"
            :rel="isExternal(l.href) ? 'noopener' : undefined"
          >
            <AppIcon :name="LINK_ICONS[l.kind]" /> {{ l.label }}
          </a>
          <p v-if="project.privateNote" class="private mono">
            <AppIcon name="lock" :size="14" /> {{ project.privateNote }}
          </p>
        </div>
      </div>
    </header>

    <div class="container case__body">
      <div class="case__main">
        <figure v-if="project.media?.video" class="video card">
          <video
            controls
            preload="none"
            playsinline
            :poster="asset(project.media.poster)"
            :src="asset(project.media.video)"
          >
            <a :href="asset(project.media.video)">Download the demo video</a>
          </video>
          <figcaption class="hand">demo walkthrough ↑</figcaption>
        </figure>

        <section class="block">
          <h2 class="block__title"><span class="block__num mono">01</span> The problem</h2>
          <p class="prose">{{ project.problem }}</p>
        </section>

        <section class="block">
          <h2 class="block__title"><span class="block__num mono">02</span> What I built</h2>
          <ul class="list">
            <li v-for="(item, i) in project.built" :key="i">{{ item }}</li>
          </ul>
        </section>

        <section v-if="project.contribution" class="block">
          <h2 class="block__title"><span class="block__num mono">03</span> My part</h2>
          <p class="sticky-note">{{ project.contribution }}</p>
        </section>

        <section v-if="project.architecture" class="block">
          <h2 class="block__title"><span class="block__num mono">04</span> How it fits together</h2>
          <ArchitectureFlow v-bind="project.architecture" />
        </section>

        <section v-if="project.decisions?.length" class="block">
          <h2 class="block__title"><span class="block__num mono">05</span> Key decisions</h2>
          <div class="decisions">
            <article
              v-for="(d, i) in project.decisions"
              :key="d.title"
              class="decision card"
              :class="`tone-${DECISION_TONES[i % DECISION_TONES.length]}`"
            >
              <h3>{{ d.title }}</h3>
              <p>{{ d.detail }}</p>
            </article>
          </div>
        </section>

        <section v-if="project.results" class="block">
          <h2 class="block__title"><span class="block__num mono">06</span> Results</h2>

          <dl v-if="project.results.metrics" class="metrics">
            <div
              v-for="(m, i) in project.results.metrics"
              :key="m.label"
              class="metric card"
              :class="`tone-${DECISION_TONES[i % DECISION_TONES.length]}`"
            >
              <dt class="mono">{{ m.label }}</dt>
              <dd>{{ m.value }}</dd>
            </div>
          </dl>

          <div v-if="project.results.table" class="table-wrap card">
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
        <div class="aside card">
          <p class="mono aside__title">Tech stack</p>
          <ul class="aside__stack">
            <li
              v-for="(s, i) in project.stack"
              :key="s"
              class="chip"
              :class="`tone-${DECISION_TONES[i % DECISION_TONES.length]}`"
            >
              {{ s }}
            </li>
          </ul>
        </div>
      </aside>
    </div>

    <nav class="container pager" aria-label="More case studies">
      <RouterLink
        :to="{ name: 'project', params: { slug: prev.slug } }"
        class="pager__link card"
        :class="`tone-${toneOf(prev)}`"
      >
        <span class="mono pager__label">← Previous</span>
        <span class="pager__title">{{ prev.title }}</span>
      </RouterLink>
      <RouterLink
        :to="{ name: 'project', params: { slug: next.slug } }"
        class="pager__link pager__link--next card"
        :class="`tone-${toneOf(next)}`"
      >
        <span class="mono pager__label">Next →</span>
        <span class="pager__title">{{ next.title }}</span>
      </RouterLink>
    </nav>
  </article>
</template>

<style scoped>
.case__header {
  padding-top: clamp(1.5rem, 4vw, 2.5rem);
}

.case__back {
  padding: 0.55rem 0.9rem;
  font-size: 0.78rem;
}

.hero {
  position: relative;
  margin-top: 2rem;
  padding: clamp(1.5rem, 4vw, 3rem);
  background: var(--tone);
  color: var(--tone-ink);
  box-shadow: 7px 7px 0 var(--ink);
}

.hero__context {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.hero__title {
  margin-top: 0.5rem;
  font-size: clamp(2.3rem, 6vw, 4rem);
  letter-spacing: -0.03em;
}

.hero__tagline {
  margin-top: 0.75rem;
  max-width: 60ch;
  font-size: clamp(1.05rem, 2vw, 1.25rem);
  font-weight: 500;
}

.hero__course {
  margin-top: 0.75rem;
  font-size: 0.75rem;
  font-weight: 500;
  opacity: 0.85;
}

.hero__stickers {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 1.5rem;
  list-style: none;
}

.hero__stickers .sticker:nth-child(odd) {
  rotate: -2deg;
}

.hero__stickers .sticker:nth-child(even) {
  rotate: 2deg;
}

.hero__links {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.9rem 1.25rem;
  margin-top: 1.75rem;
}

.private {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.7rem;
  border: 1.5px solid var(--ink);
  border-radius: var(--radius-sm);
  background: var(--card);
  color: var(--ink);
  font-size: 0.72rem;
}

.case__body {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 280px;
  gap: clamp(2rem, 5vw, 3.5rem);
  padding-block: clamp(2.5rem, 6vw, 4rem);
}

.case__main {
  display: grid;
  gap: clamp(2.5rem, 5vw, 3.25rem);
  min-width: 0;
}

.video {
  margin: 0;
  padding: 0.75rem;
}

.video video {
  width: 100%;
  aspect-ratio: 16 / 9;
  border: var(--line-thin);
  border-radius: var(--radius-sm);
  background: #000;
}

.video figcaption {
  padding-top: 0.4rem;
  font-size: 1.3rem;
  text-align: center;
  color: var(--tomato-text);
}

.block__title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  font-size: clamp(1.4rem, 2.8vw, 1.8rem);
}

.block__num {
  display: grid;
  place-items: center;
  width: 2.1rem;
  height: 2.1rem;
  border: var(--line-thin);
  border-radius: var(--radius-sm);
  background: var(--yellow);
  box-shadow: var(--shadow-sm);
  font-size: 0.8rem;
  rotate: -4deg;
}

.prose {
  max-width: 68ch;
  font-size: 1.05rem;
  color: var(--ink-soft);
}

.list {
  display: grid;
  gap: 0.75rem;
  max-width: 72ch;
  list-style: none;
}

.list li {
  position: relative;
  padding-left: 1.6rem;
}

.list li::before {
  content: '→';
  position: absolute;
  left: 0;
  top: -0.15em;
  font-family: var(--font-hand);
  font-size: 1.35rem;
  color: var(--tomato-text);
}

.sticky-note {
  max-width: 64ch;
  padding: 1.25rem 1.4rem;
  border: var(--line-thin);
  border-radius: 4px;
  background: var(--yellow);
  box-shadow: 5px 5px 0 var(--ink);
  font-weight: 500;
  rotate: -0.6deg;
}

.decisions {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.25rem;
}

.decision {
  padding: 1.15rem 1.2rem;
  border-top-width: 10px;
  border-top-color: var(--tone);
  box-shadow: 4px 4px 0 var(--ink);
}

.decision h3 {
  margin-bottom: 0.45rem;
  font-size: 1.05rem;
}

.decision p {
  font-size: 0.93rem;
  color: var(--ink-soft);
}

.metrics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  gap: 1.25rem;
  margin: 0 0 1.5rem;
}

.metric {
  display: flex;
  flex-direction: column;
  padding: 1rem 1.2rem;
  background: var(--tone);
  color: var(--tone-ink);
  box-shadow: 4px 4px 0 var(--ink);
}

.metric:nth-child(odd) {
  rotate: -1deg;
}

.metric:nth-child(even) {
  rotate: 1deg;
}

.metric dd {
  order: -1;
  margin: 0;
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 800;
  line-height: 1.1;
}

.metric dt {
  font-size: 0.72rem;
  font-weight: 600;
}

.table-wrap {
  overflow-x: auto;
  margin-bottom: 1.5rem;
  box-shadow: 4px 4px 0 var(--ink);
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.92rem;
  font-variant-numeric: tabular-nums;
}

caption {
  padding: 0.8rem 1rem;
  text-align: left;
  font-weight: 600;
  border-bottom: var(--line-thin);
}

th,
td {
  padding: 0.6rem 1rem;
  text-align: right;
  white-space: nowrap;
}

th:first-child,
td:first-child {
  text-align: left;
}

th {
  background: var(--yellow);
  font-family: var(--font-mono);
  font-size: 0.7rem;
  text-transform: uppercase;
  border-bottom: var(--line-thin);
}

tbody tr:nth-child(even) td {
  background: var(--paper);
}

.aside {
  position: sticky;
  top: calc(var(--header-h) + 1.5rem);
  padding: 1.25rem;
  background: var(--paper-2);
}

.aside__title {
  margin-bottom: 0.9rem;
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.aside__stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  list-style: none;
}

.aside__stack .chip {
  background: var(--tone-tint);
}

.pager {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  padding-bottom: clamp(2rem, 6vw, 4rem);
}

.pager__link {
  display: grid;
  gap: 0.35rem;
  padding: 1.25rem 1.4rem;
  background: var(--tone);
  color: var(--tone-ink);
  text-decoration: none;
  transition:
    transform 160ms var(--ease),
    box-shadow 160ms var(--ease);
}

.pager__link:hover {
  transform: translate(-2px, -2px);
  box-shadow: var(--shadow-lg);
}

.pager__label {
  font-size: 0.72rem;
  text-transform: uppercase;
}

.pager__title {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 1.2rem;
}

.pager__link--next {
  text-align: right;
}

@media (max-width: 900px) {
  .case__body {
    grid-template-columns: 1fr;
  }

  .case__aside {
    order: -1;
  }

  .aside {
    position: static;
  }
}

@media (max-width: 560px) {
  .pager {
    grid-template-columns: 1fr;
  }
}
</style>
