<template>
  <div class="final-view">
    <div class="final-content">
      <h1 class="title">Devoción</h1>
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
  justify-content: flex-start; /* Pin to top to avoid pushing carousel too far */
  align-items: center;
  padding-top: 20px;
}

.final-content {
  position: relative;
  z-index: 30; /* Above flowers */
  max-width: 800px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
}

.title {
  font-size: 2rem;
  margin-bottom: 5px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.message-text {
  max-width: 600px;
  margin: 5px auto;
  font-size: 1.1rem;
  line-height: 1.4;
  background: rgba(0, 0, 0, 0.4);
  padding: 15px 20px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.3);
  white-space: pre-line;
  text-align: center; /* Back to centered for better carousel alignment */
}

.carousel-container {
  margin-top: 15px;
  width: 100%;
}
</style>
