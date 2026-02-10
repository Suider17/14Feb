<template>
  <div class="hearts-container">
    <div
      v-for="n in heartCount"
      :key="n"
      class="heart"
      :style="getHeartStyle(n)"
    >
      ❤️
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const heartCount = 50;

const getHeartStyle = (n) => {
  const size = Math.random() * 20 + 10 + 'px';
  const left = Math.random() * 100 + 'vw';
  const duration = Math.random() * 10 + 10 + 's';
  const delay = Math.random() * 10 + 's';
  const opacity = Math.random() * 0.5 + 0.5;

  return {
    fontSize: size,
    left: left,
    animationDuration: duration,
    animationDelay: delay,
    opacity: opacity
  };
};
</script>

<style scoped>
.hearts-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.heart {
  position: absolute;
  top: -50px;
  animation: fall linear infinite;
}

@keyframes fall {
  to {
    transform: translateY(110vh) rotate(360deg);
  }
}
</style>
