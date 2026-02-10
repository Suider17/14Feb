<template>
  <div class="trick-view">
    <div class="image-container">
       <img :src="currentImage" alt="Trick Image" class="trick-img" />
    </div>
    <h2>¿Quieres ser mi San Valentín?</h2>
    <div class="buttons" ref="containerRef">
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
const containerRef = ref(null); // Reference to the area where buttons exist

const currentImage = computed(() => {
    return noCount.value > 0 ? endImg : startImg;
});

const noStyle = computed(() => {
    // scale shrinks until count is 3, then stops shrinking
    const scaleFactor = Math.max(0, 3 - Math.min(noCount.value, 3)); 
    // Logic: 0->1, 1->0.8, 2->0.6, 3->0.4 (example)
    // Simpler: 1 - (min(count, 3) * 0.2) -> 1, 0.8, 0.6, 0.4
    const currentScale = 1 - (Math.min(noCount.value, 3) * 0.2);

    const style = {
        transform: `scale(${currentScale})`,
        transition: 'all 0.3s ease' // Ensure smooth transition
    };
    
    if (noAbsolute.value) {
        style.position = 'absolute'; // Changed to absolute within relative container
        style.left = noPosition.value.x + 'px';
        style.top = noPosition.value.y + 'px';
    }
    return style;
});

const handleNoClick = () => {
    // Only grow Yes button up to 3 times (1 + 0.5*3 = 2.5 max)
    if (noCount.value < 3) {
        yesScale.value += 0.5;
    }
    noCount.value++;
    moveNoButton();
};

const moveNoButton = () => {
    // Start moving immediately or after some interactions? 
    // User said: "Primero marca un area... y despues haz que el de no se mueva"
    // And "cuando sean más de tres solo se va a mover"
    
    // Let's start moving it relative to the container once interaction starts
    noAbsolute.value = true;
    
    if (containerRef.value) {
        const containerRect = containerRef.value.getBoundingClientRect();
        const btnWidth = 100; // Approx
        const btnHeight = 50; // Approx
        
        const maxX = containerRect.width - btnWidth;
        const maxY = containerRect.height - btnHeight;
        
        const x = Math.random() * maxX;
        const y = Math.random() * maxY;
        
        noPosition.value = { x, y };
        
        // Ensure it doesn't just stay in center initially if we want it to move
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
  position: relative; /* Essential for absolute positioning of No button */
  min-height: 300px; /* Defined area size */
  width: 100%;
  max-width: 600px; /* Limit width */
  margin-left: auto;
  margin-right: auto;
  border: 2px dashed rgba(255, 255, 255, 0.3); /* Temporary visualization or design choice */
  border-radius: 15px;
  padding: 20px;
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
