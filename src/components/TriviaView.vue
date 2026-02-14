<template>
  <div class="trivia-view">
    <h2>Trivia puchunguita</h2>
    
    <div class="image-feedback-container">
      <BluryImage 
        v-if="currentImage" 
        :src="currentImage" 
        width="150px" 
        height="150px" 
        class="trivia-img" 
      />
    </div>

    <div class="timer" :class="{ critical: isCritical }">Tiempo: {{ displayTime }}</div>
    
    <div v-if="currentQuestionIndex < questions.length" class="question-card">
      <h3>{{ questions[currentQuestionIndex].text }}</h3>
      <div class="options">
        <button 
          v-for="(option, index) in questions[currentQuestionIndex].options" 
          :key="index"
          @click="selectOption(index)"
          :disabled="isProcessing"
          :class="{ 
            wrong: selectedIndex === index && !isCorrect,
            correct: selectedIndex === index && isCorrect
          }"
        >
          {{ option }}
        </button>
      </div>
      <div class="feedback-area">
        <p v-if="selectedIndex !== null && !isCorrect" class="error-msg">¡Ups! Intenta de nuevo ❤️</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { GOOD_IMAGES, BAD_IMAGES, getRandomItem } from '@/utils/imageSets';
import BluryImage from './BluryImage.vue';

const emit = defineEmits(['completed']);

const LAST_QUESTION_IMAGE = 'src/assets/images/trivia/LastQimage.jpg'; // Specific fixed image

const questions = [
  {
    text: "¿Cuándo es nuestro aniversario?",
    options: ["14 Feb", "4 Oct", "30 May", "11 Jun"],
    correctIndex: 1
  },
  {
    text: "Chi é la migliore dottoressa?",
    options: ["Io sono", "Non lo so", "Chissà", "Nessuno"],
    correctIndex: 0
  },
  {
    text: "Paciente con acidosis metabólica hiperclorémica, pH urinario > 5.5 e hipokalemia. ¿Cuál es el defecto primario?",
    options: ["Disminución de reabsorción de bicarbonato en túbulo proximal", 
            "Disminución de secreción de H⁺ en túbulo distal",
            "Aumento de producción de ácidos orgánicos",
            "Hiperaldosteronismo secundario"],
    correctIndex:1
  }
];

const currentQuestionIndex = ref(0);
const selectedIndex = ref(null);
const isCorrect = ref(false);
const currentImage = ref(null);
const isProcessing = ref(false);

const updateTriviaImage = () => {
    if (currentQuestionIndex.value === questions.length - 1) {
        currentImage.value = LAST_QUESTION_IMAGE;
    } else {
        currentImage.value = getRandomItem(GOOD_IMAGES);
    }
};

onMounted(() => {
    updateTriviaImage();
    timerInterval = setInterval(() => {
        if (timeLeft.value > 0.5) {
            timeLeft.value -= 0.1;
        } else {
            isCritical.value = true;
            // Zeno's paradox style decay
            timeLeft.value = 0.01 + (timeLeft.value - 0.01) * 0.98;
             if (timeLeft.value < 0.01) timeLeft.value = 0.01;
        }
    }, 100);
});

const selectOption = (index) => {
    if (isProcessing.value) return;
    selectedIndex.value = index;
    
    if (index === questions[currentQuestionIndex.value].correctIndex) {
        isCorrect.value = true;
        isProcessing.value = true;
        
        // Show a good image immediately on success
        if (currentQuestionIndex.value !== questions.length - 1) {
            currentImage.value = getRandomItem(GOOD_IMAGES);
        }
        
        setTimeout(() => {
            if (currentQuestionIndex.value < questions.length - 1) {
                currentQuestionIndex.value++;
                selectedIndex.value = null;
                isCorrect.value = false;
                isProcessing.value = false;
                updateTriviaImage();
            } else {
                emit('completed');
            }
        }, 1500);
    } else {
        isCorrect.value = false;
        // Show a random bad image on mistake, except for the last question
        if (currentQuestionIndex.value !== questions.length - 1) {
            currentImage.value = getRandomItem(BAD_IMAGES);
        }
    }
};

// Timer logic reused
// Timer logic reused from PuzzleView
const timeLeft = ref(120.0); // Start at 30s
const isCritical = ref(false);
let timerInterval = null;

const displayTime = computed(() => {
    return timeLeft.value.toFixed(2);
});

onMounted(() => {
    timerInterval = setInterval(() => {
        if (timeLeft.value > 0.5) {
            timeLeft.value -= 0.1;
        } else {
            isCritical.value = true;
            // Zeno's paradox style decay
            timeLeft.value = 0.01 + (timeLeft.value - 0.01) * 0.98;
             if (timeLeft.value < 0.01) timeLeft.value = 0.01;
        }
    }, 100);
});

onUnmounted(() => clearInterval(timerInterval));
</script>

<style scoped>
.trivia-view {
    text-align: center;
    color: white;
    max-width: 600px;
}

.timer {
    font-size: 2rem;
    font-family: 'Courier New', Courier, monospace;
    margin: 15px 0;
    font-weight: bold;
    text-shadow: 1px 1px 3px rgba(0,0,0,0.5);
    background: rgba(0, 0, 0, 0.2);
    padding: 5px 15px;
    border-radius: 10px;
    display: inline-block;
}

.timer.critical {
    color: #ff4757;
    animation: pulse 1s infinite;
}

@keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
}

.image-feedback-container {
    position: relative;
    margin-bottom: 20px;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.trivia-img {
    max-width: 150px;
    height: auto;
}

.question-card {
    background: rgba(0, 0, 0, 0.2); /* Darker background */
    padding: 20px;
    border-radius: 15px;
    margin-top: 20px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.options {
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
    margin-top: 20px;
}

@media (min-width: 600px) {
    .options {
        grid-template-columns: 1fr 1fr;
    }
}

button {
    padding: 15px;
    font-size: 1.1rem;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    background: white;
    color: #ff6b6b;
    transition: background 0.3s;
}

button.wrong {
    background: #ff4757;
    color: white;
}

button.correct {
    background: #2ed573;
    color: white;
}

.error-msg {
    color: #ff4757;
    font-weight: bold;
    margin-top: 10px;
}

.feedback-area {
    min-height: 40px; /* Reserves space for the error message */
}
</style>
