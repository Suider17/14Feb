<template>
  <div class="final-view">
    <div class="final-content">
      <h1>Devoción</h1>
      <p class="message-text">
        Y ahora te amo más, porque te descubro más humana,
        porque, siendo deidad, bajaste a mi mundo.
        Siendo pureza, te revolcaste conmigo en lo inmundo.
        Siento por dentro cómo esto emana,
        casi como en el pecho, una orden del destino.
        Te cuidaré siempre, mi amuleto entre lo terrenal y lo divino.
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
  line-height: 1.6;
  background: rgba(0, 0, 0, 0.4); /* Darker background */
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.3);
  white-space: pre-line;
  text-align: left; /* Better for verses */
}

.carousel-container {
  margin-top: 30px;
}
</style>
