<script setup>
import AppIcon from '@/components/AppIcon.vue'
</script>

<template>
  <section class="section">
    <div class="container">
      <div class="notfound card">
        <span class="tape" style="top: -12px; left: 40px; rotate: -3deg" />
        <span class="sticker tone-tomato">HTTP 404</span>
        <h1>This page isn’t in my notebook.</h1>
        <p class="notfound__lead">It may have moved. Everything is reachable from the home page.</p>
        <p class="hand notfound__note">(I checked twice.)</p>
        <RouterLink to="/" class="btn btn--yellow">
          <AppIcon name="arrow-left" /> Back home
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.notfound {
  position: relative;
  display: grid;
  gap: 1rem;
  justify-items: start;
  max-width: 640px;
  padding: clamp(1.5rem, 5vw, 3rem);
}

.notfound h1 {
  font-size: clamp(2rem, 5vw, 3rem);
}

.notfound__lead {
  color: var(--ink-soft);
}

.notfound__note {
  font-size: 1.4rem;
  color: var(--tomato-text);
}
</style>
