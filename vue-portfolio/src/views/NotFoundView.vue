<script setup>
import AppIcon from '@/components/AppIcon.vue'
</script>

<template>
  <section class="section">
    <div class="container notfound">
      <p class="mono notfound__code">HTTP 404</p>
      <h1>This route isn't in the routing table.</h1>
      <p class="notfound__lead">
        The page may have moved. Everything is reachable from the home page.
      </p>
      <RouterLink to="/" class="btn btn--primary">
        <AppIcon name="arrow-left" /> Back home
      </RouterLink>
    </div>
  </section>
</template>

<style scoped>
.notfound {
  display: grid;
  gap: 1.25rem;
  justify-items: start;
  min-height: 50vh;
  align-content: center;
}

.notfound__code {
  color: var(--accent);
}

.notfound h1 {
  font-size: clamp(2rem, 5vw, 3.2rem);
  max-width: 18ch;
}

.notfound__lead {
  color: var(--text-muted);
}
</style>
