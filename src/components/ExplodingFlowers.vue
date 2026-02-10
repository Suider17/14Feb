<template>
  <div class="flower-container">
    <div
      v-for="n in count"
      :key="n"
      class="flower"
      :style="getFlowerStyle(n)"
    >
      🌸
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const count = ref(0);

const getFlowerStyle = (n) => {
  const left = Math.random() * 100 + 'vw';
  const top = Math.random() * 100 + 'vh';
  const scale = 0; // Starts small
  const delay = Math.random() * 2 + 's';
  
  return {
    left: left,
    top: top,
    animationDelay: delay
  };
};

onMounted(() => {
    // Start spawning flowers - Slower rate
    const interval = setInterval(() => {
        if (count.value < 30) count.value++; // Reduced max count
    }, 400); // Slower interval
});
</script>

<style scoped>
.flower-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1; /* Below content */
}

.flower {
    position: absolute;
    font-size: 40px; /* Slightly smaller base */
    animation: growAndPop 3s forwards; /* Slower animation */
    opacity: 0;
}

@keyframes growAndPop {
    0% { transform: scale(0); opacity: 0.8; }
    80% { transform: scale(1.5); opacity: 0.8; } /* Reduced max scale */
    100% { transform: scale(2); opacity: 0; }
}
</style>
