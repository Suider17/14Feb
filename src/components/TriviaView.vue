<template>
  <div class="trivia-view">
    <h2>Trivia de Amor</h2>
    <div class="timer" :class="{ critical: isCritical }">Tiempo: {{ displayTime }}</div>
    
    <div v-if="currentQuestionIndex < questions.length" class="question-card">
      <h3>{{ questions[currentQuestionIndex].text }}</h3>
      <div class="options">
        <button 
          v-for="(option, index) in questions[currentQuestionIndex].options" 
          :key="index"
          @click="selectOption(index)"
          :class="{ 
            wrong: selectedIndex === index && !isCorrect,
            correct: selectedIndex === index && isCorrect
          }"
        >
          {{ option }}
        </button>
      </div>
       <p v-if="selectedIndex !== null && !isCorrect" class="error-msg">¡Ups! Intenta de nuevo ❤️</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const emit = defineEmits(['completed']);

const questions = [
  {
    text: "¿Cuál es mi color favorito?",
    options: ["Rojo", "Azul", "Rosa", "Verde"],
    correctIndex: 2
  },
  {
    text: "¿Dónde fue nuestra primera cita?",
    options: ["Cine", "Parque", "Restaurante", "Playa"],
    correctIndex: 1
  },
  {
    text: "¿Qué comida amo más?",
    options: ["Pizza", "Sushi", "Tacos", "Hamburguesa"],
    correctIndex: 1
  }
];

const currentQuestionIndex = ref(0);
const selectedIndex = ref(null);
const isCorrect = ref(false);

const selectOption = (index) => {
    selectedIndex.value = index;
    if (index === questions[currentQuestionIndex.value].correctIndex) {

        isCorrect.value = true;
        setTimeout(() => {
            if (currentQuestionIndex.value < questions.length - 1) {
                currentQuestionIndex.value++;
                selectedIndex.value = null;
                isCorrect.value = false;
            } else {
                emit('completed');
            }
        }, 1000);
    } else {
        isCorrect.value = false;
    }
};

// Timer logic reused
const timeLeft = ref(10.0);
const isCritical = ref(false);
let timerInterval = null;

const displayTime = computed(() => {
    if (isCritical.value) return timeLeft.value.toFixed(10);
    return timeLeft.value.toFixed(1);
});

onMounted(() => {
    timerInterval = setInterval(() => {
        if (timeLeft.value > 0.1) {
            timeLeft.value -= 0.1;
        } else {
            isCritical.value = true;
            timeLeft.value = timeLeft.value * 0.999;
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
</style>
