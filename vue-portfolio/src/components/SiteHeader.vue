<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import AppIcon from './AppIcon.vue'
import { profile } from '@/data/profile'
import { asset } from '@/utils/format'

const nav = [
  { id: 'journey', label: 'Journey' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'toolbox', label: 'Toolbox' },
  { id: 'field-notes', label: 'Field notes' },
  { id: 'contact', label: 'Contact' },
]

const route = useRoute()
const open = ref(false)
const onKey = (e) => e.key === 'Escape' && (open.value = false)

onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
watch(
  () => route.fullPath,
  () => (open.value = false),
)
</script>

<template>
  <header class="header">
    <div class="container header__inner">
      <RouterLink to="/" class="brand" aria-label="Sebastian Parakal Jose, home">
        <span class="brand__mark" aria-hidden="true">SJ</span>
        <span class="brand__text">
          <span class="brand__name">Sebastian Jose</span>
          <span class="brand__sub mono">engineer's notebook</span>
        </span>
      </RouterLink>

      <span class="sticker tone-mint header__status">
        <span class="dot dot--pulse" aria-hidden="true" /> Open to work
      </span>

      <nav id="site-nav" class="nav" :class="{ 'nav--open': open }" aria-label="Primary">
        <ul class="nav__list">
          <li v-for="item in nav" :key="item.id">
            <RouterLink :to="{ name: 'home', hash: `#${item.id}` }" class="nav__link mono">
              {{ item.label }}
            </RouterLink>
          </li>
        </ul>
      </nav>

      <div class="header__actions">
        <a class="btn btn--yellow header__cv" :href="asset(profile.resume)" download>
          <AppIcon name="download" /> <span>Download CV</span>
        </a>
        <img
          class="header__avatar"
          :src="profile.portrait"
          alt=""
          width="40"
          height="40"
          aria-hidden="true"
        />
        <button
          type="button"
          class="menu-btn"
          :aria-expanded="open"
          aria-controls="site-nav"
          :aria-label="open ? 'Close menu' : 'Open menu'"
          @click="open = !open"
        >
          <AppIcon :name="open ? 'close' : 'menu'" :size="20" />
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 50;
  height: var(--header-h);
  background: rgb(255 248 236 / 0.95);
  backdrop-filter: blur(8px);
  border-bottom: var(--line);
}

.header__inner {
  height: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  color: var(--ink);
  text-decoration: none;
}

.brand__mark {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border: var(--line-thin);
  border-radius: var(--radius);
  background: var(--yellow);
  box-shadow: var(--shadow-sm);
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 0.85rem;
  transform: rotate(-4deg);
  transition: transform 160ms var(--ease);
}

.brand:hover .brand__mark {
  transform: rotate(0);
}

.brand__text {
  display: grid;
  line-height: 1.1;
}

.brand__name {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 1.15rem;
}

.brand__sub {
  font-size: 0.7rem;
  font-weight: 500;
  color: var(--ink-soft);
}

.header__status {
  transform: rotate(1.5deg);
}

.nav {
  margin-left: auto;
}

.nav__list {
  display: flex;
  gap: 0.2rem;
  padding: 0.25rem;
  list-style: none;
  border: var(--line-thin);
  border-radius: var(--radius);
  background: rgb(244 237 225 / 0.8);
}

.nav__link {
  display: block;
  padding: 0.4rem 0.7rem;
  border: 2px solid transparent;
  border-radius: var(--radius-sm);
  color: var(--ink-soft);
  font-size: 0.75rem;
  text-decoration: none;
  transition: all 140ms var(--ease);
}

.nav__link:hover {
  color: var(--ink);
  background: var(--card);
  border-color: var(--ink);
  box-shadow: var(--shadow-sm);
}

.header__actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.header__cv {
  padding: 0.6rem 1rem;
  border-radius: 999px;
  font-size: 0.78rem;
}

.header__avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: var(--line-thin);
  box-shadow: var(--shadow-sm);
  object-fit: cover;
  object-position: top;
}

.menu-btn {
  display: none;
  place-items: center;
  width: 42px;
  height: 42px;
  border: var(--line-thin);
  border-radius: 50%;
  background: var(--pink);
  box-shadow: var(--shadow-sm);
  cursor: pointer;
}

@media (max-width: 1080px) {
  .header__status,
  .header__avatar {
    display: none;
  }
}

@media (max-width: 900px) {
  .menu-btn {
    display: grid;
  }

  .header__actions {
    margin-left: auto;
  }

  .nav {
    position: fixed;
    inset: var(--header-h) 0 auto 0;
    padding: 1.25rem var(--gutter) 1.75rem;
    background: var(--yellow);
    border-bottom: var(--line);
    transform: translateY(-8px);
    opacity: 0;
    visibility: hidden;
    transition:
      opacity 180ms var(--ease),
      transform 180ms var(--ease),
      visibility 180ms;
  }

  .nav--open {
    transform: none;
    opacity: 1;
    visibility: visible;
  }

  .nav__list {
    flex-direction: column;
    gap: 0.5rem;
    border: 0;
    background: none;
    padding: 0;
  }

  .nav__link {
    padding: 0.8rem 1rem;
    font-size: 1rem;
    background: var(--card);
    border-color: var(--ink);
    box-shadow: var(--shadow-sm);
    color: var(--ink);
  }
}

@media (max-width: 520px) {
  .brand__sub,
  .header__cv span {
    display: none;
  }

  .header__cv {
    padding: 0.6rem;
  }
}
</style>
