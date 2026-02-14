<template>
  <div class="transition-screen">
    <FireworksEffect v-if="showFireworks" />
    <div class="image-container" v-if="currentImage">
      <BluryImage 
        :src="currentImage" 
        width="400px" 
        height="400px" 
        alt="Happy Image"
      />
    </div>
    <h1>{{ text }}</h1>
    <button @click="$emit('completed')" class="next-btn">{{ buttonText }}</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { GOOD_IMAGES, getRandomItem } from '@/utils/imageSets';
import BluryImage from './BluryImage.vue';
import FireworksEffect from './FireworksEffect.vue';

defineProps({
  text: String,
  showFireworks: {
    type: Boolean,
    default: false
  },
  buttonText: {
    type: String,
    default: 'Siguiente ➡️'
  }
});

const currentImage = ref('');

onMounted(() => {
  currentImage.value = getRandomItem(GOOD_IMAGES);
});
</script>

<style scoped>
.transition-screen {
  text-align: center;
  color: white;
  animation: fadeIn 1s;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.transition-screen h1 {
  font-size: 2rem;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
  background: rgba(0, 0, 0, 0.3);
  padding: 8px 10px;
  border-radius: 15px;
  margin: 16px 0;
}

.image-container {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.next-btn {
  margin-top: 30px;
  padding: 10px 30px;
  font-size: 1.2rem;
  background: white;
  color: #ff6b6b;
  border: none;
  border-radius: 25px;
  cursor: pointer;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>
