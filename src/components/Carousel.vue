<template>
  <div class="carousel">
    <div class="carousel-track" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
      <div v-for="(image, index) in images" :key="index" class="carousel-slide">
        <img :src="image" alt="Carousel Slide" />
      </div>
    </div>
    <div class="controls">
        <button @click="prev">❮</button>
        <button @click="next">❯</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import img1 from '@/assets/images/placeholders/img1.svg';
import img2 from '@/assets/images/placeholders/img2.svg';
import img3 from '@/assets/images/placeholders/img3.svg';

const images = [img1, img2, img3];
const currentIndex = ref(0);
let interval = null;

const next = () => {
    currentIndex.value = (currentIndex.value + 1) % images.length;
};

const prev = () => {
    currentIndex.value = (currentIndex.value - 1 + images.length) % images.length;
};

onMounted(() => {
    interval = setInterval(next, 3000);
});

onUnmounted(() => clearInterval(interval));
</script>

<style scoped>
.carousel {
  width: 80%;
  max-width: 600px;
  overflow: hidden;
  position: relative;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  margin: 0 auto;
}

.carousel-track {
  display: flex;
  transition: transform 0.5s ease-in-out;
}

.carousel-slide {
  min-width: 100%;
}

.carousel-slide img {
  width: 100%;
  display: block;
}

.controls {
    position: absolute;
    top: 50%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    transform: translateY(-50%);
}

.controls button {
    background: rgba(0,0,0,0.5);
    color: white;
    border: none;
    font-size: 2rem;
    padding: 10px;
    cursor: pointer;
}
</style>
