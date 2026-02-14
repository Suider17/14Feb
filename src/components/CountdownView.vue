<template>
  <div class="countdown-view">
    <div class="carousel-container">
        <Carousel />
    </div>
    
    <Transition name="fade" mode="out-in">
      <div v-if="timeLeft > 0" class="timer" key="timer">
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
      </div>
      <div v-else class="start-section" key="start">
        <FireworksEffect />
        <div class="start-content-pop">
          <h1>¡Ya, por fin!</h1>
          <p>Dame un besito antes de empezar</p>
          <button @click="$emit('start')" class="start-btn">Empezar ❤️</button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import Carousel from './Carousel.vue';
import FireworksEffect from './FireworksEffect.vue';

const targetDate = new Date('2026-02-14T12:00:00'); // Fixed to 2026 for now based on user context
const now = ref(new Date());
let timer = null;

const timeLeft = computed(() => targetDate - now.value);

const days = computed(() => Math.max(0, Math.floor(timeLeft.value / (1000 * 60 * 60 * 24))));
const hours = computed(() => Math.max(0, Math.floor((timeLeft.value % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))));
const minutes = computed(() => Math.max(0, Math.floor((timeLeft.value % (1000 * 60 * 60)) / (1000 * 60))));
const seconds = computed(() => Math.max(0, Math.floor((timeLeft.value % (1000 * 60)) / 1000)));

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

.timer h1 {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
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
  background: rgba(0, 0, 0, 0.4); /* Darker for better contrast */
  padding: 10px;
  border-radius: 10px;
  min-width: 60px;
  flex: 1;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
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

.start-section {
  position: relative;
  z-index: 10;
}

.start-section h1 {
  font-size: 3rem;
  margin-bottom: 16px;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.6);
}

.start-section p {
  font-size: 1.5rem;
  margin-bottom: 30px;
  background: rgba(0, 0, 0, 0.3);
  padding: 10px 20px;
  border-radius: 20px;
  display: inline-block;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
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
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.start-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

/* Transitions */
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s, transform 1s;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.start-content-pop {
  animation: popIn 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes popIn {
  0% { transform: scale(0.5); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}
</style>
