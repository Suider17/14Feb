<template>
  <div class="final-view">
    <div class="final-content">
      <h1>¡Feliz San Valentín! ❤️</h1>
      <p class="message-text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        (Aquí irá tu mensaje especial)
      </p>
      <div class="carousel-container">
        <Carousel />
      </div>
    </div>
  </div>
</template>

<script setup>
import Carousel from './Carousel.vue';
</script>

<style scoped>
.final-view {
  text-align: center;
  color: white;
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 20;
  display: flex;
  flex-direction: column;
  justify-content: center; /* Vertically center the content */
  align-items: center;     /* Horizontally center */
}

.final-content {
  position: relative;
  z-index: 30; /* Above flowers */
  max-width: 800px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.message-text {
  max-width: 600px;
  margin: 20px auto;
  font-size: 1.2rem;
  line-height: 1.5;
  background: rgba(0, 0, 0, 0.4); /* Darker background */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.2);
}

.carousel-container {
  margin-top: 30px;
}
</style>
