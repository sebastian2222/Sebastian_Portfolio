<script setup>
import SectionHeading from '@/components/SectionHeading.vue'
import { gallery } from '@/data/gallery'

const TILTS = ['-2deg', '1.5deg', '-1deg', '2deg']
const TAPES = ['', 'tape--pink', 'tape--mint', '']
</script>

<template>
  <section id="field-notes" class="section" aria-labelledby="gallery-title">
    <div class="container">
      <SectionHeading
        id="gallery-title"
        label="Snapshots"
        note="life outside the terminal"
        title="Off the keyboard"
        tag="FIELD NOTES"
        tone="pink"
        lead="Community talks, demo days and meetups around Melbourne."
      />

      <ul class="wall">
        <li
          v-for="(photo, i) in gallery"
          :key="photo.src"
          v-reveal
          class="polaroid"
          :style="{ '--tilt': TILTS[i % TILTS.length] }"
        >
          <span class="tape" :class="TAPES[i % TAPES.length]" />
          <figure>
            <img
              :src="photo.src"
              :alt="photo.alt"
              :width="photo.width"
              :height="photo.height"
              loading="lazy"
              decoding="async"
            />
            <figcaption class="hand">{{ photo.caption }}</figcaption>
          </figure>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.wall {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem 1.5rem;
  list-style: none;
  padding-top: 0.75rem;
}

.polaroid {
  position: relative;
  rotate: var(--tilt);
  transition: rotate 200ms var(--ease);
}

.polaroid:hover {
  rotate: 0deg;
}

.polaroid .tape {
  top: -12px;
  left: 50%;
  translate: -50% 0;
  width: 90px;
}

.polaroid figure {
  margin: 0;
  padding: 0.7rem 0.7rem 0.4rem;
  background: var(--card);
  border: var(--line);
  border-radius: var(--radius);
  box-shadow: 6px 6px 0 var(--ink);
}

.polaroid img {
  width: 100%;
  height: auto;
  aspect-ratio: 1;
  object-fit: cover;
  border: var(--line-thin);
  border-radius: 6px;
}

.polaroid figcaption {
  padding: 0.6rem 0.2rem 0.3rem;
  font-size: 1.3rem;
  text-align: center;
}

@media (max-width: 960px) {
  .wall {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 520px) {
  .wall {
    grid-template-columns: 1fr;
    padding-inline: 1rem;
  }
}
</style>
