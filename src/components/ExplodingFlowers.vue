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
    // Start spawning flowers
    const interval = setInterval(() => {
        if (count.value < 50) count.value++;
    }, 100);
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
    z-index: 100;
}

.flower {
    position: absolute;
    font-size: 50px;
    animation: growAndPop 2s forwards;
    opacity: 0;
}

@keyframes growAndPop {
    0% { transform: scale(0); opacity: 1; }
    80% { transform: scale(3); opacity: 1; }
    100% { transform: scale(4); opacity: 0; }
}
</style>
