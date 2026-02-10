<template>
  <div class="countdown-view">
    <div class="carousel-container">
        <Carousel />
    </div>
    
    <div v-if="timeLeft > 0" class="timer">
      <h1>Cuenta regresiva para San Valentín</h1>
      <div class="time-display">
        <div class="time-segment">
          <span class="number">{{ days }}</span>
          <span class="label">Días</span>
        </div>
        <div class="time-segment">
          <span class="number">{{ hours }}</span>
          <span class="label">Horas</span>
        </div>
        <div class="time-segment">
          <span class="number">{{ minutes }}</span>
          <span class="label">Minutos</span>
        </div>
        <div class="time-segment">
          <span class="number">{{ seconds }}</span>
          <span class="label">Segundos</span>
        </div>
      </div>
      <!-- <button @click="$emit('start')" class="debug-btn">Debug: Start Now 🚀</button> -->
    </div>
    <div v-else class="start-section">
      <h1>¡Es hora!</h1>
      <p>Tengo algo especial para ti...</p>
      <button @click="$emit('start')" class="start-btn">Empezar ❤️</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import Carousel from './Carousel.vue';

const targetDate = new Date('2026-02-14T12:00:00'); // Fixed to 2026 for now based on user context
const now = ref(new Date());
let timer = null;

const timeLeft = computed(() => targetDate - now.value);

const days = computed(() => Math.floor(timeLeft.value / (1000 * 60 * 60 * 24)));
const hours = computed(() => Math.floor((timeLeft.value % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
const minutes = computed(() => Math.floor((timeLeft.value % (1000 * 60 * 60)) / (1000 * 60)));
const seconds = computed(() => Math.floor((timeLeft.value % (1000 * 60)) / 1000));

onMounted(() => {
  timer = setInterval(() => {
    now.value = new Date();
  }, 1000);
});

onUnmounted(() => {
  clearInterval(timer);
});
</script>

<style scoped>
.countdown-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* keep centered vertically */
  min-height: 100%;
  color: white;
  text-align: center;
  padding: 20px 0;
  overflow-y: auto; /* Allow scrolling if carousel pushes content */
}

.carousel-container {
    margin-bottom: 30px;
    width: 100%;
    margin-top: 20px;
}

.time-display {
  display: flex;
  gap: 15px;
  margin-top: 20px;
  flex-wrap: wrap;
  justify-content: center;
}

.time-segment {
  display: flex;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.2); /* Darker background for contrast */
  padding: 10px;
  border-radius: 10px;
  min-width: 60px;
  flex: 1;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.number {
  font-size: 2rem;
  font-weight: bold;
}

@media (min-width: 600px) {
  .number {
    font-size: 3rem;
  }
  .time-segment {
    min-width: 80px;
    padding: 20px;
  }
}

.label {
  font-size: 0.9rem;
  text-transform: uppercase;
}

.start-btn {
  margin-top: 20px;
  padding: 15px 40px;
  font-size: 1.5rem;
  background: white;
  color: #ff6b6b;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: transform 0.2s;
}

.start-btn:hover {
  transform: scale(1.1);
}

.debug-btn {
  display: none; /* Hidden requested by user */
}
</style>
