<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNavbar">
    <div class="container">
      <a class="navbar-brand" href="#">My Portfolio</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item" v-for="link in navLinks" :key="link.href">
            <a
              class="nav-link"
              :href="link.href"
              :class="{ active: activeSection === link.href }"
              >{{ link.label }}</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Projects & Skills', href: '#projects' },
  { label: 'Work Experience', href: '#experience' },
  { label: 'Education & Awards', href: '#education' },
  { label: 'Contact Me', href: '#contact' }
]

const activeSection = ref('#home')

onMounted(() => {
  const sections = document.querySelectorAll('section')
  window.addEventListener('scroll', () => {
    let current = '#home'
    sections.forEach((sec) => {
      const top = window.scrollY
      if (top >= sec.offsetTop - 100) {
        current = `#${sec.id}`
      }
    })
    activeSection.value = current
  })
})
</script>

<style scoped>
.nav-link.active {
  font-weight: bold;
  color: #ffc107 !important;
}
</style>
