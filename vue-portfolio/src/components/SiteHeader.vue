<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import AppIcon from './AppIcon.vue'
import { useTheme } from '@/composables/useTheme'
import { profile } from '@/data/profile'
import { asset } from '@/utils/format'

const nav = [
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
]

const route = useRoute()
const { theme, toggle } = useTheme()
const open = ref(false)
const scrolled = ref(false)

const onScroll = () => (scrolled.value = window.scrollY > 8)
const onKey = (e) => e.key === 'Escape' && (open.value = false)

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKey)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKey)
})

watch(
  () => route.fullPath,
  () => (open.value = false),
)
</script>

<template>
  <header class="header" :class="{ 'header--scrolled': scrolled || open }">
    <div class="container header__inner">
      <RouterLink to="/" class="brand" aria-label="Sebastian Parakal Jose, home">
        <span class="brand__mark" aria-hidden="true">{{ profile.initials }}</span>
        <span class="brand__name">{{ profile.name }}</span>
      </RouterLink>

      <nav id="site-nav" class="nav" :class="{ 'nav--open': open }" aria-label="Primary">
        <ul class="nav__list">
          <li v-for="item in nav" :key="item.id">
            <RouterLink :to="{ name: 'home', hash: `#${item.id}` }" class="nav__link">
              {{ item.label }}
            </RouterLink>
          </li>
        </ul>
        <a class="btn btn--primary nav__cta" :href="asset(profile.resume)" download>
          <AppIcon name="download" /> Résumé
        </a>
      </nav>

      <div class="header__actions">
        <button
          type="button"
          class="icon-btn"
          :aria-label="theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'"
          @click="toggle"
        >
          <AppIcon :name="theme === 'dark' ? 'sun' : 'moon'" />
        </button>
        <button
          type="button"
          class="icon-btn menu-btn"
          :aria-expanded="open"
          aria-controls="site-nav"
          :aria-label="open ? 'Close menu' : 'Open menu'"
          @click="open = !open"
        >
          <AppIcon :name="open ? 'close' : 'menu'" />
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
  border-bottom: 1px solid transparent;
  transition:
    background 200ms var(--ease),
    border-color 200ms var(--ease);
}

.header--scrolled {
  background: color-mix(in srgb, var(--bg) 82%, transparent);
  backdrop-filter: saturate(140%) blur(12px);
  border-bottom-color: var(--border);
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
  gap: 0.65rem;
  text-decoration: none;
  font-weight: 600;
  margin-right: auto;
}

.brand__mark {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: 9px;
  background: var(--surface-2);
  border: 1px solid var(--border-strong);
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  box-shadow: inset 0 -3px 0 var(--accent);
}

.brand__name {
  font-family: var(--font-display);
  font-size: 0.975rem;
}

.nav {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.nav__list {
  display: flex;
  gap: 0.25rem;
  list-style: none;
}

.nav__link {
  display: block;
  padding: 0.45rem 0.7rem;
  border-radius: 999px;
  color: var(--text-muted);
  font-size: 0.9rem;
  font-weight: 500;
  text-decoration: none;
}

.nav__link:hover {
  color: var(--text);
  background: var(--surface-2);
}

.nav__cta {
  padding: 0.55rem 0.95rem;
  font-size: 0.875rem;
}

.header__actions {
  display: flex;
  gap: 0.35rem;
}

.icon-btn {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--surface);
  cursor: pointer;
  transition: border-color 160ms var(--ease);
}

.icon-btn:hover {
  border-color: var(--accent);
}

.menu-btn {
  display: none;
}

@media (max-width: 820px) {
  .brand__name {
    display: none;
  }

  .menu-btn {
    display: grid;
  }

  .nav {
    position: fixed;
    inset: var(--header-h) 0 auto 0;
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
    padding: 1rem var(--gutter) 1.5rem;
    background: var(--bg);
    border-bottom: 1px solid var(--border);
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
  }

  .nav__link {
    padding: 0.75rem 0.5rem;
    font-size: 1.05rem;
    border-radius: var(--radius-sm);
  }

  .nav__cta {
    justify-content: center;
    padding: 0.8rem;
  }
}
</style>
