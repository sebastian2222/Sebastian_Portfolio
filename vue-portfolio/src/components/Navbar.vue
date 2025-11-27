<template>
  <nav id="navbar" class="navbar navbar-expand-lg navbar-dark bg-dark py-3 fixed-top">
    <div class="container">
      <a class="navbar-brand fw-bold fs-4" href="#">My Portfolio</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item" v-for="link in links" :key="link.id">
            <a
              class="nav-link"
              :href="`#${link.id}`"
              :class="{ active: currentSection === link.id }"
            >
              {{ link.name }}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const links = [
  { name: 'Home', id: 'home' },
  { name: 'Projects & Skills', id: 'projects' },
  { name: 'Work Experience', id: 'experience' },
  { name: 'Education & Awards', id: 'education' },
  { name: 'Contact Me', id: 'contact' }
]

const currentSection = ref('home')

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          currentSection.value = entry.target.id
        }
      })
    },
    { threshold: 0.6 }
  )

  links.forEach(link => {
    const section = document.getElementById(link.id)
    if (section) observer.observe(section)
  })
})
</script>

<style scoped>
.nav-link.active {
  font-weight: bold;
  color: #ffc107 !important;
}
</style>
