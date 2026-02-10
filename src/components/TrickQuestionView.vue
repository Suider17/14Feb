<template>
  <div class="trick-view">
    <div class="image-container">
       <img :src="currentImage" alt="Trick Image" class="trick-img" />
    </div>
    <h2>¿Quieres ser mi San Valentín?</h2>
    <div class="buttons">
      <button 
        class="yes-btn" 
        :style="{ transform: `scale(${yesScale})` }"
        @click="$emit('completed')"
      >
        SÍ
      </button>
      <button 
        class="no-btn"
        :style="noStyle"
        @click="handleNoClick"
        @mouseover="moveNoButton" 
      >
        NO
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import startImg from '@/assets/images/trick_start.svg';
import endImg from '@/assets/images/trick_end.svg';

const yesScale = ref(1);
const noCount = ref(0);
const noPosition = ref({ x: 0, y: 0 });
const noAbsolute = ref(false);

const currentImage = computed(() => {
    return noCount.value > 0 ? endImg : startImg;
});

const noStyle = computed(() => {
    const style = {
        transform: `scale(${Math.max(0.5, 1 - noCount.value * 0.2)})`
    };
    if (noAbsolute.value) {
        style.position = 'fixed';
        style.left = noPosition.value.x + 'px';
        style.top = noPosition.value.y + 'px';
    }
    return style;
});

const handleNoClick = () => {
    yesScale.value += 0.5;
    noCount.value++;
    moveNoButton();
};

const moveNoButton = () => {
    if (noCount.value >= 3) {
        noAbsolute.value = true;
        const x = Math.random() * (window.innerWidth - 100);
        const y = Math.random() * (window.innerHeight - 50);
        noPosition.value = { x, y };
    }
};
</script>

<style scoped>
.trick-view {
  text-align: center;
  color: white;
}

.image-container img {
  max-width: 100%;
  height: auto;
  max-height: 40vh;
  border-radius: 10px;
  margin-bottom: 20px;
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
  align-items: center;
  flex-wrap: wrap;
}

button {
  padding: 10px 30px;
  font-size: 1.2rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.yes-btn {
  background-color: #4cd137;
  color: white;
}

.no-btn {
  background-color: #e84118;
  color: white;
}
</style>
