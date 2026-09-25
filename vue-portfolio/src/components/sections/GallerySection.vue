<script setup>
import SectionHeading from '@/components/SectionHeading.vue'
import { gallery } from '@/data/gallery'
</script>

<template>
  <section class="section gallery-section" aria-labelledby="gallery-title">
    <div class="container">
      <SectionHeading
        id="gallery-title"
        index="04"
        eyebrow="Off the keyboard"
        title="Community, demos and good company"
        lead="Much of my best work has come from building with other people, in hackathon rooms, at expos and at meetups."
      />

      <ul class="gallery">
        <li v-for="photo in gallery" :key="photo.src" v-reveal class="photo">
          <figure>
            <img
              :src="photo.src"
              :alt="photo.alt"
              :width="photo.width"
              :height="photo.height"
              loading="lazy"
              decoding="async"
            />
            <figcaption class="mono">{{ photo.caption }}</figcaption>
          </figure>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.gallery {
  list-style: none;
  columns: 3 260px;
  column-gap: 1rem;
}

.photo {
  break-inside: avoid;
  margin-bottom: 1rem;
}

.photo figure {
  margin: 0;
  overflow: hidden;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
}

.photo img {
  width: 100%;
  height: auto;
  transition: transform 500ms var(--ease);
}

.photo:hover img {
  transform: scale(1.03);
}

.photo figcaption {
  padding: 0.7rem 0.9rem;
  color: var(--text-muted);
  font-size: 0.75rem;
}
</style>
