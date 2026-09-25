<script setup>
import { profile } from '@/data/profile'

const year = new Date().getFullYear()
const links = [
  { label: 'LinkedIn', href: profile.links.linkedin },
  { label: 'GitHub', href: profile.links.github },
  { label: 'Email', href: `mailto:${profile.email}` },
  { label: 'wdr26.org', href: 'https://wdr26.org' },
  { label: 'hushapp.live', href: 'https://www.hushapp.live' },
]
</script>

<template>
  <footer class="footer">
    <div class="container footer__inner">
      <p class="mono footer__meta">
        © {{ year }} {{ profile.name }} · built with Vue &amp; lots of chai ☕ ·
        <a href="https://github.com/sebastian2222/Sebastian_Portfolio">source</a>
      </p>
      <ul class="footer__links">
        <li v-for="l in links" :key="l.label">
          <a
            class="mono"
            :href="l.href"
            :target="l.href.startsWith('http') ? '_blank' : undefined"
            rel="noopener"
            >{{ l.label }}</a
          >
        </li>
      </ul>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  margin-top: 2rem;
  border-top: var(--line);
  background: var(--paper-2);
  padding-block: 1.5rem;
}

.footer__inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.footer__meta {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--ink-soft);
}

.footer__meta a,
.footer__links a {
  color: var(--ink);
}

.footer__links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.25rem;
  list-style: none;
}

.footer__links a {
  font-size: 0.75rem;
  text-decoration: none;
  border-bottom: 2px solid var(--yellow);
}

.footer__links a:hover {
  border-color: var(--tomato);
}
</style>
