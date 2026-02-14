<template>
  <div class="music-player">
    <audio ref="audioPlayer" loop>
      <source src="@/assets/audio/placeholder.mp3" type="audio/mpeg">
      Your browser does not support the audio element.
    </audio>
    <button @click="togglePlay" class="play-btn">
      {{ isPlaying ? '🔊' : '🔇' }}
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const audioPlayer = ref(null);
const isPlaying = ref(false);

const togglePlay = () => {
  if (isPlaying.value) {
    audioPlayer.value.pause();
  } else {
    audioPlayer.value.play().catch(e => console.log('Autoplay blocked', e));
  }
  isPlaying.value = !isPlaying.value;
};

// Attempt autoplay
onMounted(() => {
    if (audioPlayer.value) {
        audioPlayer.value.volume = 0.2;
    }
});
</script>

<style scoped>
.music-player {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
}

.play-btn {
  background: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 20px;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
}
</style>
