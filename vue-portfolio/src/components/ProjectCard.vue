<template>
  <div class="col-md-4 mb-4">
    <div class="card h-100 shadow">
      <img :src="project.image" class="card-img-top" :alt="project.title" />
      <div class="card-body">
        <h5 class="card-title">{{ project.title }}</h5>
        <p class="card-text">{{ project.description }}</p>
        <div>
          <span
            v-for="tech in project.technologies"
            :key="tech"
            class="badge bg-secondary me-1"
            >{{ tech }}</span
          >
        </div>
      </div>
      <div class="card-footer">
        <a
          v-if="project.link"
          :href="project.link"
          target="_blank"
          class="btn btn-outline-primary w-100"
          >View Project</a
        >
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({ project: Object })
</script>
