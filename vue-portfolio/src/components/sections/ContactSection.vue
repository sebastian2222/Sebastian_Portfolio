<script setup>
import { ref } from 'vue'
import AppIcon from '@/components/AppIcon.vue'
import { profile } from '@/data/profile'
import { asset } from '@/utils/format'

const copied = ref(false)

async function copyEmail() {
  try {
    await navigator.clipboard.writeText(profile.email)
    copied.value = true
    setTimeout(() => (copied.value = false), 2000)
  } catch {
    window.location.href = `mailto:${profile.email}`
  }
}
</script>

<template>
  <section id="contact" class="section" aria-labelledby="contact-title">
    <div class="container">
      <div v-reveal class="contact card">
        <span class="tape tape--pink" style="top: -12px; left: 12%; rotate: -4deg" />
        <span class="tape tape--mint" style="top: -12px; right: 12%; rotate: 4deg" />
        <svg class="plane" viewBox="0 0 64 64" aria-hidden="true">
          <path
            d="M4 30 60 6 44 58 32 38Z M32 38 60 6"
            fill="var(--card)"
            stroke="var(--ink)"
            stroke-width="3"
            stroke-linejoin="round"
          />
        </svg>

        <span class="sticker tone-mint">
          <span class="dot dot--pulse" aria-hidden="true" /> Ready for full-time opportunities
        </span>
        <h2 id="contact-title" class="contact__title">
          Hiring? Let’s build something reliable together.
        </h2>
        <p class="contact__lead">
          Based in Melbourne with full Australian work rights. Open to full-time software, backend
          and cloud engineering roles.
        </p>

        <div class="mailbox">
          <a class="mailbox__address mono" :href="`mailto:${profile.email}`">
            <AppIcon name="mail" /> {{ profile.email }}
          </a>
          <button type="button" class="btn btn--navy" @click="copyEmail">
            <AppIcon :name="copied ? 'check' : 'copy'" />
            <span aria-live="polite">{{ copied ? 'Copied!' : 'Copy email' }}</span>
          </button>
        </div>

        <div class="contact__links">
          <a class="btn" :href="profile.links.linkedin" target="_blank" rel="noopener">
            <AppIcon name="linkedin" /> LinkedIn
          </a>
          <a class="btn" :href="profile.links.github" target="_blank" rel="noopener">
            <AppIcon name="github" /> GitHub
          </a>
          <a class="btn btn--tomato" :href="asset(profile.resume)" download>
            <AppIcon name="download" /> Download résumé
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact {
  position: relative;
  display: grid;
  justify-items: center;
  gap: 1.1rem;
  padding: clamp(2rem, 6vw, 4rem) clamp(1.25rem, 4vw, 3rem);
  background: var(--yellow);
  text-align: center;
  box-shadow: 7px 7px 0 var(--ink);
}

.plane {
  position: absolute;
  width: 56px;
  top: 1.5rem;
  right: 1.75rem;
  rotate: 12deg;
}

.contact__title {
  max-width: 18ch;
  font-size: clamp(2rem, 5vw, 3.2rem);
}

.contact__lead {
  max-width: 52ch;
  font-size: 1.05rem;
}

.mailbox {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
  width: min(100%, 640px);
  margin-top: 0.5rem;
  padding: 0.6rem;
  border: var(--line);
  border-radius: var(--radius);
  background: var(--card);
  box-shadow: 5px 5px 0 var(--ink);
}

.mailbox__address {
  display: inline-flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-width: 0;
  color: var(--ink);
  font-size: clamp(0.85rem, 2vw, 1rem);
  text-decoration: none;
  overflow-wrap: anywhere;
}

.contact__links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-top: 0.5rem;
}

@media (max-width: 560px) {
  .plane {
    display: none;
  }

  .mailbox .btn {
    width: 100%;
  }
}
</style>
