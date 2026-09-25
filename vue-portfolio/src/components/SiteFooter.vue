<script setup>
import AppIcon from './AppIcon.vue'
import { profile } from '@/data/profile'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="container footer__inner">
      <p class="mono footer__meta">
        © {{ year }} {{ profile.name }} · Built with Vue 3 &amp; Vite ·
        <a href="https://github.com/sebastian2222/Sebastian_Portfolio">source</a>
      </p>
      <ul class="footer__links">
        <li>
          <a :href="profile.links.github" rel="noopener" target="_blank">
            <AppIcon name="github" label="GitHub" />
          </a>
        </li>
        <li>
          <a :href="profile.links.linkedin" rel="noopener" target="_blank">
            <AppIcon name="linkedin" label="LinkedIn" />
          </a>
        </li>
        <li>
          <a :href="`mailto:${profile.email}`"><AppIcon name="mail" label="Email" /></a>
        </li>
      </ul>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  border-top: 1px solid var(--border);
  padding-block: 2rem;
}

.footer__inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.footer__meta {
  color: var(--text-faint);
}

.footer__links {
  display: flex;
  gap: 1rem;
  list-style: none;
  color: var(--text-muted);
}
</style>
