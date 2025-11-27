<template>
  <section id="contact" class="container min-vh-100 py-5">
    <h2 class="text-center mb-4">Contact Me</h2>
    <form @submit.prevent="sendEmail" ref="form">
      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input v-model="formData.name" type="text" class="form-control" required />
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input v-model="formData.email" type="email" class="form-control" required />
      </div>
      <div class="mb-3">
        <label for="message" class="form-label">Message</label>
        <textarea v-model="formData.message" class="form-control" rows="5" required></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Send</button>
    </form>
    <p v-if="successMessage" class="mt-3 text-success">{{ successMessage }}</p>
  </section>
</template>

<script setup>
import emailjs from 'emailjs-com'
import { ref } from 'vue'

const form = ref(null)
const formData = ref({ name: '', email: '', message: '' })
const successMessage = ref('')

const sendEmail = () => {
  emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData.value, 'YOUR_USER_ID')
    .then(() => {
      successMessage.value = 'Email sent successfully!'
      formData.value = { name: '', email: '', message: '' }
    }).catch(error => {
      console.error('Email sending failed:', error)
    })
}
</script>
