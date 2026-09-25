<script setup>
import AppIcon from '@/components/AppIcon.vue'
import { profile } from '@/data/profile'
import { asset } from '@/utils/format'
</script>

<template>
  <section class="hero" aria-labelledby="hero-title">
    <div class="container hero__grid">
      <div class="hero__copy">
        <p class="mono status">
          <span class="status__dot" aria-hidden="true" />
          {{ profile.availability }} · {{ profile.location }}
        </p>

        <h1 id="hero-title" class="hero__title">
          {{ profile.name }}
          <span class="hero__role">
            <span v-for="item in [profile.role, ...profile.focus]" :key="item">{{ item }}</span>
          </span>
        </h1>

        <p class="hero__headline">{{ profile.headline }}</p>
        <p class="hero__intro">{{ profile.intro }}</p>

        <div class="hero__actions">
          <RouterLink :to="{ name: 'home', hash: '#projects' }" class="btn btn--primary">
            See my work <AppIcon name="arrow-right" />
          </RouterLink>
          <a class="btn" :href="asset(profile.resume)" download>
            <AppIcon name="download" /> Download résumé
          </a>
          <a
            class="btn btn--ghost icon-only"
            :href="profile.links.github"
            target="_blank"
            rel="noopener"
          >
            <AppIcon name="github" label="GitHub" />
          </a>
          <a
            class="btn btn--ghost icon-only"
            :href="profile.links.linkedin"
            target="_blank"
            rel="noopener"
          >
            <AppIcon name="linkedin" label="LinkedIn" />
          </a>
        </div>
      </div>

      <figure class="portrait">
        <img
          :src="profile.portrait"
          :alt="`Portrait of ${profile.name}`"
          width="720"
          height="960"
          fetchpriority="high"
        />
        <figcaption class="portrait__card">
          <p class="mono portrait__label">Currently</p>
          <p>CTO at <strong>MOSAIC</strong></p>
          <p>Teaching Associate at <strong>Monash</strong></p>
          <p class="mono portrait__rights">{{ profile.workRights }}</p>
        </figcaption>
      </figure>
    </div>

    <div class="container">
      <dl class="stats">
        <div v-for="stat in profile.stats" :key="stat.label" class="stat">
          <dt class="stat__label">{{ stat.label }}</dt>
          <dd class="stat__value">{{ stat.value }}</dd>
        </div>
      </dl>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  padding-block: clamp(48px, 8vw, 96px) clamp(56px, 8vw, 96px);
  overflow: hidden;
}

/* Dot grid that fades out, a quiet nod to engineering paper. */
.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(var(--grid-dot) 1px, transparent 1px) 0 0 / 22px 22px;
  mask: radial-gradient(ellipse 80% 70% at 30% 30%, #000 20%, transparent 75%);
  pointer-events: none;
}

.hero__grid {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1.45fr) minmax(0, 0.75fr);
  gap: clamp(2rem, 6vw, 5rem);
  align-items: center;
}

.status {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.35rem 0.8rem;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: var(--surface);
  color: var(--text-muted);
  font-size: 0.75rem;
}

.status__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 0 4px var(--accent-soft);
}

@media (prefers-reduced-motion: no-preference) {
  .status__dot {
    animation: pulse 2.4s ease-in-out infinite;
  }
}

@keyframes pulse {
  50% {
    box-shadow: 0 0 0 7px transparent;
  }
}

.hero__title {
  margin-top: 1.5rem;
  font-size: clamp(2.6rem, 6.5vw, 4.9rem);
  letter-spacing: -0.035em;
  line-height: 1.02;
}

.hero__role > span {
  white-space: nowrap;
}

.hero__role > span + span::before {
  content: '/';
  margin-inline: 0.6em;
  color: var(--text-faint);
}

.hero__role {
  display: flex;
  flex-wrap: wrap;
  row-gap: 0.2rem;
  margin-top: 0.85rem;
  font-family: var(--font-mono);
  font-size: clamp(0.85rem, 1.6vw, 1rem);
  font-weight: 400;
  letter-spacing: 0.01em;
  color: var(--accent);
}

.hero__headline {
  margin-top: 1.75rem;
  font-family: var(--font-display);
  font-size: clamp(1.25rem, 2.4vw, 1.6rem);
  line-height: 1.35;
  max-width: 30ch;
}

.hero__intro {
  margin-top: 1rem;
  max-width: 58ch;
  color: var(--text-muted);
  font-size: 1.05rem;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 2rem;
}

.icon-only {
  padding: 0.7rem;
}

.portrait {
  position: relative;
  margin: 0;
  justify-self: end;
  width: 100%;
  max-width: 340px;
}

.portrait img {
  width: 100%;
  height: auto;
  aspect-ratio: 3 / 4;
  object-fit: cover;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-strong);
  filter: saturate(0.92);
}

.portrait::before {
  content: '';
  position: absolute;
  inset: 14px -14px -14px 14px;
  border: 1px solid var(--accent);
  border-radius: var(--radius-lg);
  opacity: 0.45;
  z-index: -1;
}

.portrait__card {
  position: absolute;
  left: -2.5rem;
  bottom: 1.5rem;
  display: grid;
  gap: 0.15rem;
  padding: 0.9rem 1.1rem;
  border: 1px solid var(--border-strong);
  border-radius: var(--radius);
  background: color-mix(in srgb, var(--surface) 92%, transparent);
  backdrop-filter: blur(8px);
  box-shadow: var(--shadow);
  font-size: 0.9rem;
}

.portrait__label {
  color: var(--accent);
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

.portrait__rights {
  margin-top: 0.35rem;
  color: var(--text-faint);
  font-size: 0.68rem;
}

.stats {
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin: clamp(3rem, 7vw, 5rem) 0 0;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background: var(--surface);
  overflow: hidden;
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 1.35rem 1.5rem;
}

/* Value first visually; label first in the DOM so <dt> precedes <dd>. */
.stat__value {
  order: -1;
}

.stat + .stat {
  border-left: 1px solid var(--border);
}

.stat__value {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  font-weight: 600;
  letter-spacing: -0.03em;
  line-height: 1;
}

.stat__label {
  color: var(--text-muted);
  font-size: 0.85rem;
  line-height: 1.4;
}

@media (max-width: 900px) {
  .hero__grid {
    grid-template-columns: 1fr;
  }

  .portrait {
    justify-self: start;
    max-width: 300px;
    order: -1;
  }

  .portrait__card {
    left: auto;
    right: -1rem;
    bottom: -1rem;
  }

  .stats {
    grid-template-columns: repeat(2, 1fr);
  }

  .stat:nth-child(3) {
    border-left: 0;
  }

  .stat:nth-child(n + 3) {
    border-top: 1px solid var(--border);
  }
}

@media (max-width: 420px) {
  .portrait {
    max-width: 210px;
  }

  .portrait__card {
    right: -0.5rem;
    font-size: 0.8rem;
  }
}
</style>
