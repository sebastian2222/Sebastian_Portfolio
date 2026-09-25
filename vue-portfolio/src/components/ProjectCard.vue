<template>
  <div class="col-12 col-sm-6 col-md-4 mb-4 d-flex">
    <div class="card h-100 shadow-sm w-100">
      <img
        v-if="project.image"
        :src="project.image"
        class="card-img-top"
        :alt="project.title"
      />
      <div class="card-body d-flex flex-column">
        <h5 class="card-title">{{ project.title }}</h5>
        <p class="card-text">{{ project.description }}</p>
        <div class="mt-auto mb-3">
          <span
            v-for="tech in project.technologies"
            :key="tech"
            class="badge bg-secondary me-1"
          >
            {{ tech }}
          </span>
        </div>
        <a
          v-if="project.link"
          :href="project.link"
          target="_blank"
          class="btn btn-outline-primary w-100"
        >
          View Project
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({ project: Object })
</script>
