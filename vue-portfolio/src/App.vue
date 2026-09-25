<script setup>
import SiteHeader from '@/components/SiteHeader.vue'
import SiteFooter from '@/components/SiteFooter.vue'
</script>

<template>
  <a class="skip-link" href="#main">Skip to content</a>
  <SiteHeader />
  <main id="main" tabindex="-1">
    <RouterView />
  </main>
  <SiteFooter />
</template>

<style scoped>
.skip-link {
  position: fixed;
  top: 12px;
  left: 12px;
  z-index: 100;
  padding: 0.6rem 1rem;
  border-radius: var(--radius-sm);
  background: var(--accent);
  color: var(--accent-ink);
  font-weight: 600;
  text-decoration: none;
  transform: translateY(-200%);
  transition: transform 160ms var(--ease);
}

.skip-link:focus {
  transform: none;
}

main:focus {
  outline: none;
}
</style>
