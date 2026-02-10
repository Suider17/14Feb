<template>
  <div class="carousel">
    <div class="carousel-track" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
      <div v-for="(image, index) in images" :key="index" class="carousel-slide">
        <div class="slide-bg" :style="{ backgroundImage: `url(${image})` }"></div>
        <img :src="image" alt="Carousel Slide" class="slide-img" />
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
import img1 from '@/assets/images/placeholders/image1.webp';
import img2 from '@/assets/images/placeholders/image2.webp';
import img3 from '@/assets/images/placeholders/image3.webp';
import img4 from '@/assets/images/placeholders/image4.webp';
import img5 from '@/assets/images/placeholders/image5.webp';
import img6 from '@/assets/images/placeholders/image6.webp';

const images = [img1, img2, img3, img4, img5, img6];
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
  width: 100%;
  max-width: 400px; /* Square-ish ideal */
  aspect-ratio: 1 / 1;
  overflow: hidden;
  position: relative;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  margin: 0 auto;
}

.carousel-track {
  display: flex;
  height: 100%;
  transition: transform 0.5s ease-in-out;
}

.carousel-slide {
  min-width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background: #000;
}

.slide-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    filter: blur(15px) brightness(0.7);
    z-index: 1;
}

.slide-img {
  position: relative;
  z-index: 2;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  box-shadow: 0 0 20px rgba(0,0,0,0.5);
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
