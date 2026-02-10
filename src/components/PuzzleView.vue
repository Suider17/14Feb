<template>
  <div class="puzzle-view">
    <h2>Arma el rompecabezas</h2>
    <div class="timer" :class="{ critical: isCritical }">
        Tiempo: {{ displayTime }}
    </div>
    <div class="puzzle-grid">
      <div 
        v-for="(piece, index) in pieces" 
        :key="index"
        class="puzzle-piece"
        @click="handlePieceClick(index)"
        :class="{ selected: selectedIndex === index, solved: isSolved }"
      >
        <span>{{ piece + 1 }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const emit = defineEmits(['completed']);

// 3x3 Grid
const solvedOrder = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const pieces = ref([...solvedOrder].sort(() => Math.random() - 0.5));
const selectedIndex = ref(null);

const timeLeft = ref(10.0);
const isCritical = ref(false);
let timerInterval = null;

const displayTime = computed(() => {
    if (isCritical.value) {
        return timeLeft.value.toFixed(10); // Infinite decimals feeling
    }
    return timeLeft.value.toFixed(1);
});

onMounted(() => {
    timerInterval = setInterval(() => {
        if (timeLeft.value > 0.1) {
            timeLeft.value -= 0.1;
        } else {
            isCritical.value = true;
            // Zeno's paradox: never reach 0
            timeLeft.value = timeLeft.value * 0.99; 
        }
    }, 100);
});

onUnmounted(() => clearInterval(timerInterval));

const handlePieceClick = (index) => {
    if (selectedIndex.value === null) {
        selectedIndex.value = index;
    } else {
        // Swap
        const temp = pieces.value[selectedIndex.value];
        pieces.value[selectedIndex.value] = pieces.value[index];
        pieces.value[index] = temp;
        selectedIndex.value = null;
        checkWin();
    }
};

const checkWin = () => {
    if (pieces.value.every((val, index) => val === solvedOrder[index])) {
        setTimeout(() => emit('completed'), 1000);
    }
};
</script>

<style scoped>
.puzzle-view {
    text-align: center;
    color: white;
}

.puzzle-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 5px;
    margin: 20px auto;
    width: 100%;
    max-width: 310px;
    aspect-ratio: 1 / 1;
}

.puzzle-piece {
    width: 100%;
    height: 100%;
    background-color: #ffcccc;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    color: #ff6b6b;
    cursor: pointer;
    border-radius: 5px;
}

.puzzle-piece.selected {
    border: 3px solid #ff6b6b;
}

.timer {
    font-size: 2rem;
    font-family: monospace;
}

.timer.critical {
    color: red;
}
</style>
