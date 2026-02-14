<template>
  <div class="app-container">
    <FallingHearts />
    <MusicPlayer />
    
    <main class="content">
      <CountdownView v-if="currentPhase === 'COUNTDOWN'" @start="nextPhase" />
      <TrickQuestionView v-else-if="currentPhase === 'TRICK'" @completed="nextPhase" />
      <TransitionScreen v-else-if="currentPhase === 'TRANSITION_1'" @completed="nextPhase" :text="'¡Sabía que dirías que sí!'" buttonText="Siguiente" />
      <PuzzleView v-else-if="currentPhase === 'PUZZLE'" @completed="nextPhase" />
      <TransitionScreen v-else-if="currentPhase === 'TRANSITION_2'" @completed="nextPhase" :text="'¡Uy, esa mami rompecabecista!'" buttonText="Ya casi acabamos 🥵" />
      <TriviaView v-else-if="currentPhase === 'TRIVIA'" @completed="nextPhase" />
      <TransitionScreen v-else-if="currentPhase === 'TRANSITION_3'" @completed="nextPhase" :text="'¡Tremenda esa reina!'" :showFireworks="true" buttonText="Ir al final " />
      <FinalView v-else-if="currentPhase === 'FINAL'" />
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import FallingHearts from './components/FallingHearts.vue';
import MusicPlayer from './components/MusicPlayer.vue';
import CountdownView from './components/CountdownView.vue';
import TrickQuestionView from './components/TrickQuestionView.vue';
import PuzzleView from './components/PuzzleView.vue';
import TriviaView from './components/TriviaView.vue';
import FinalView from './components/FinalView.vue';
import TransitionScreen from './components/TransitionScreen.vue';

const phases = ['COUNTDOWN', 'TRICK', 'TRANSITION_1', 'PUZZLE', 'TRANSITION_2', 'TRIVIA', 'TRANSITION_3', 'FINAL'];
const currentPhaseIndex = ref(0);
const currentPhase = ref(phases[0]);

const nextPhase = () => {
  if (currentPhaseIndex.value < phases.length - 1) {
    currentPhaseIndex.value++;
    currentPhase.value = phases[currentPhaseIndex.value];
  }
};
</script>

<style>
/* Global reset and base styles */
body, html {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: 'Arial', sans-serif;
  overflow: hidden; /* Prevent scrollbars from falling hearts */
}

.app-container {
  width: 100vw;
  height: 100vh;
  background-color: #ffc0cb; /* Pink background */
  position: relative;
  padding: 20px;
  box-sizing: border-box;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3); /* Global text shadow for readability */
}

.content {
  position: relative;
  z-index: 10;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
