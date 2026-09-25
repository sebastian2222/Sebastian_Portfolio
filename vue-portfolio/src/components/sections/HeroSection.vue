<script setup>
import AppIcon from '@/components/AppIcon.vue'
import { profile } from '@/data/profile'
</script>

<template>
  <section class="hero" aria-labelledby="hero-title">
    <div class="container">
      <div class="bench card">
        <span class="tape" style="top: -12px; left: 48px; transform: rotate(-3deg)" />
        <span class="tape tape--pink" style="top: -12px; right: 56px; transform: rotate(3deg)" />

        <!-- Decorative doodles -->
        <svg class="doodle doodle--star" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M12 2l2.9 6.9L22 9.8l-5.4 4.7L18.2 22 12 18.3 5.8 22l1.6-7.5L2 9.8l7.1-.9z"
            fill="var(--yellow)"
            stroke="var(--ink)"
            stroke-width="1.5"
            stroke-linejoin="round"
          />
        </svg>
        <svg class="doodle doodle--squiggle" viewBox="0 0 120 24" aria-hidden="true">
          <path
            d="M2 12c10-10 20 10 30 0s20 10 30 0 20 10 30 0 20 10 26 0"
            fill="none"
            stroke="var(--tomato)"
            stroke-width="3"
            stroke-linecap="round"
          />
        </svg>

        <div class="bench__grid">
          <div class="intro card">
            <p class="note">
              <span class="hand">rhymes with ‘reliable’… sort of</span>
            </p>

            <h1 id="hero-title" class="intro__title">
              Hi, I’m {{ profile.shortName }}
              <span class="wave" aria-hidden="true">👋</span>
            </h1>
            <p class="intro__headline">{{ profile.headline }}</p>
            <p class="intro__body">{{ profile.intro }}</p>

            <div class="intro__actions">
              <RouterLink :to="{ name: 'home', hash: '#projects' }" class="btn btn--tomato">
                See my work <AppIcon name="arrow-right" />
              </RouterLink>
              <RouterLink :to="{ name: 'home', hash: '#contact' }" class="btn">
                <AppIcon name="mail" /> Get in touch
              </RouterLink>
            </div>
          </div>

          <div class="polaroid-wrap">
            <span class="sticker tone-tomato sticker--a">★ {{ profile.availability }}</span>
            <span class="sticker tone-yellow sticker--b">📍 Melbourne, AU</span>
            <span class="sticker tone-mint sticker--c">
              <AppIcon name="check" :size="14" /> {{ profile.workRights }}
            </span>

            <figure class="polaroid">
              <span class="tape" style="top: -12px; left: 50%; translate: -50% 0; rotate: 2deg" />
              <img
                :src="profile.portrait"
                :alt="`Portrait of ${profile.name}`"
                width="720"
                height="960"
                fetchpriority="high"
              />
              <figcaption>
                <span class="hand polaroid__caption">Sebastian in Melbourne</span>
                <span class="mono polaroid__sub">backend · cloud · mobile</span>
              </figcaption>
            </figure>
          </div>
        </div>

        <p class="bench__tag mono">
          <span class="dot dot--pulse" aria-hidden="true" /> Sebastian’s workbench / systems &amp;
          architecture
        </p>
      </div>

      <dl class="stats">
        <div
          v-for="(s, i) in profile.stats"
          :key="s.value"
          class="stat card lift"
          :class="`tone-${s.tone}`"
          :style="{ '--tilt': i % 2 ? '1deg' : '-1deg' }"
        >
          <dt class="stat__kicker mono">
            <span>{{ s.kicker }}</span>
            <span class="stat__num">0{{ i + 1 }}</span>
          </dt>
          <dd class="stat__value">{{ s.value }}</dd>
          <dd class="stat__label mono">{{ s.label }}</dd>
        </div>
      </dl>
    </div>
  </section>
</template>

<style scoped>
.hero {
  padding-block: clamp(28px, 5vw, 56px) clamp(32px, 5vw, 48px);
}

.bench {
  position: relative;
  padding: clamp(1.25rem, 4vw, 3rem);
  border-radius: 22px;
  background:
    radial-gradient(circle at 85% 20%, rgb(255 143 199 / 0.35) 0 90px, transparent 91px),
    radial-gradient(circle at 12% 90%, rgb(45 214 160 / 0.3) 0 120px, transparent 121px),
    radial-gradient(circle at 60% 110%, rgb(255 201 60 / 0.35) 0 140px, transparent 141px),
    radial-gradient(rgb(27 31 59 / 0.12) 1.5px, transparent 1.5px) 0 0 / 22px 22px,
    var(--paper-2);
  box-shadow: 7px 7px 0 var(--ink);
}

.doodle {
  position: absolute;
  pointer-events: none;
}

.doodle--star {
  width: 44px;
  top: 28px;
  right: 42%;
  rotate: 12deg;
}

.doodle--squiggle {
  width: 120px;
  bottom: 70px;
  right: 40%;
}

.bench__grid {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
  gap: clamp(1.5rem, 4vw, 3rem);
  align-items: center;
}

.intro {
  display: grid;
  gap: 1rem;
  padding: clamp(1.25rem, 3vw, 2rem);
  background: rgb(255 248 236 / 0.97);
  border-radius: var(--radius-lg);
}

.note {
  justify-self: start;
  padding: 0.15rem 0.8rem;
  border: var(--line-thin);
  border-radius: var(--radius-sm);
  background: var(--yellow-tint);
  box-shadow: 3px 3px 0 var(--ink);
  rotate: -1.5deg;
}

.note .hand {
  font-size: 1.35rem;
}

.intro__title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: clamp(2.3rem, 5.5vw, 3.6rem);
  letter-spacing: -0.03em;
}

.wave {
  display: inline-grid;
  place-items: center;
  width: 1.2em;
  height: 1.2em;
  font-size: 0.7em;
  border: var(--line-thin);
  border-radius: var(--radius);
  background: var(--yellow);
  box-shadow: 3px 3px 0 var(--ink);
  rotate: 6deg;
}

.intro__headline {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(1.2rem, 2.4vw, 1.5rem);
  line-height: 1.3;
}

.intro__body {
  color: var(--ink-soft);
  font-size: 1.05rem;
}

.intro__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding-top: 0.25rem;
}

.polaroid-wrap {
  position: relative;
  justify-self: center;
  width: min(100%, 330px);
  padding-block: 1rem;
}

.polaroid {
  position: relative;
  margin: 0;
  padding: 0.85rem 0.85rem 1.1rem;
  background: var(--card);
  border: var(--line);
  border-radius: var(--radius);
  box-shadow: 6px 6px 0 var(--ink);
  rotate: -2deg;
  transition: rotate 200ms var(--ease);
}

.polaroid:hover {
  rotate: 0deg;
}

.polaroid img {
  width: 100%;
  height: auto;
  aspect-ratio: 4 / 4.4;
  object-fit: cover;
  object-position: 50% 18%;
  border: var(--line-thin);
  border-radius: var(--radius-sm);
}

.polaroid figcaption {
  display: grid;
  justify-items: center;
  padding-top: 0.7rem;
}

.polaroid__caption {
  font-size: 1.6rem;
}

.polaroid__sub {
  font-size: 0.7rem;
  color: var(--ink-soft);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.sticker--a,
.sticker--b,
.sticker--c {
  position: absolute;
  z-index: 3;
}

.sticker--a {
  top: 0;
  left: -1.5rem;
  rotate: -6deg;
}

.sticker--b {
  top: 48%;
  right: -1.5rem;
  rotate: 6deg;
}

.sticker--c {
  bottom: 0;
  left: 0.5rem;
  rotate: -2deg;
}

.bench__tag {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1.75rem;
  padding: 0.45rem 0.9rem;
  border: var(--line-thin);
  border-radius: var(--radius-sm);
  background: var(--ink);
  color: var(--paper);
  box-shadow: 3px 3px 0 var(--yellow);
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
  margin: 2rem 0 0;
}

.stat {
  display: flex;
  flex-direction: column;
  padding: 1rem 1.1rem;
  background: var(--tone);
  color: var(--tone-ink);
  border-radius: var(--radius);
  box-shadow: 4px 4px 0 var(--ink);
  rotate: var(--tilt);
}

.stat:hover {
  rotate: 0deg;
}

.stat__kicker {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  opacity: 0.9;
}

.stat__num {
  display: grid;
  place-items: center;
  width: 1.6rem;
  height: 1.6rem;
  border: 1.5px solid currentColor;
  border-radius: 6px;
}

.stat__value {
  margin: 0.5rem 0 0;
  font-family: var(--font-display);
  font-size: clamp(1.6rem, 2.6vw, 2rem);
  font-weight: 800;
  line-height: 1.1;
}

.stat__label {
  margin: 0.25rem 0 0;
  font-size: 0.72rem;
  font-weight: 500;
}

@media (max-width: 900px) {
  .bench__grid {
    grid-template-columns: 1fr;
  }

  .polaroid-wrap {
    order: -1;
    width: min(80%, 280px);
  }

  .doodle--star {
    right: 1.5rem;
    top: 1.5rem;
  }

  .doodle--squiggle {
    display: none;
  }

  .stats {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .stats {
    grid-template-columns: 1fr;
  }

  .sticker--a {
    left: -0.5rem;
  }

  .sticker--b {
    right: -0.5rem;
  }
}
</style>
