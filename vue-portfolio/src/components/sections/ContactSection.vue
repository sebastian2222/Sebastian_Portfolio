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
      <div v-reveal class="contact">
        <p class="mono contact__eyebrow">05 / Contact</p>
        <h2 id="contact-title" class="contact__title">Hiring for a software engineer?</h2>
        <p class="contact__lead">
          I'm looking for full-time roles in backend, cloud or product engineering. I'm based in
          Melbourne with unlimited Australian work rights, and I'm happy to talk about what your
          team is building.
        </p>

        <div class="contact__actions">
          <a class="btn btn--primary" :href="`mailto:${profile.email}`">
            <AppIcon name="mail" /> {{ profile.email }}
          </a>
          <button type="button" class="btn" @click="copyEmail">
            <AppIcon :name="copied ? 'check' : 'copy'" />
            <span aria-live="polite">{{ copied ? 'Copied' : 'Copy email' }}</span>
          </button>
        </div>

        <ul class="contact__links">
          <li>
            <a :href="profile.links.linkedin" target="_blank" rel="noopener">
              <AppIcon name="linkedin" /> LinkedIn
            </a>
          </li>
          <li>
            <a :href="profile.links.github" target="_blank" rel="noopener">
              <AppIcon name="github" /> GitHub
            </a>
          </li>
          <li>
            <a :href="asset(profile.resume)" download><AppIcon name="download" /> Résumé (PDF)</a>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact {
  position: relative;
  padding: clamp(2rem, 6vw, 4.5rem);
  border: 1px solid var(--border);
  border-radius: calc(var(--radius-lg) + 8px);
  background:
    radial-gradient(ellipse 60% 80% at 100% 0%, var(--accent-soft), transparent 70%), var(--surface);
  overflow: hidden;
}

.contact__eyebrow {
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.75rem;
}

.contact__title {
  margin-top: 1rem;
  font-size: clamp(2rem, 5vw, 3.4rem);
  max-width: 16ch;
}

.contact__lead {
  margin-top: 1.1rem;
  max-width: 56ch;
  color: var(--text-muted);
  font-size: 1.075rem;
}

.contact__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 2rem;
}

.contact__actions .btn--primary {
  overflow-wrap: anywhere;
}

.contact__links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.5rem;
  margin-top: 2rem;
  list-style: none;
}

.contact__links a {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  color: var(--text-muted);
  font-weight: 550;
  text-decoration: none;
}

.contact__links a:hover {
  color: var(--accent);
}
</style>
