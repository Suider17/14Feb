<template>
  <div class="transition-screen">
    <h1>{{ text }}</h1>
    <button @click="$emit('completed')" class="next-btn">Siguiente ➡️</button>
  </div>
</template>

<script setup>
defineProps({
  text: String
});
</script>

<style scoped>
.transition-screen {
  text-align: center;
  color: white;
  animation: fadeIn 1s;
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
