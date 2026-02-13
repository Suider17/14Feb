<template>
  <div class="fireworks-container">
    <div v-for="n in 10" :key="n" :class="['firework', `f${n}`]">
      <div v-for="p in 8" :key="p" class="particle"></div>
    </div>
  </div>
</template>

<style scoped>
.fireworks-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1000;
  background: transparent;
}

.firework {
  position: absolute;
  width: 5px;
  height: 5px;
}

.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  opacity: 0;
}

/* Distribution */
.f1 { left: 15%; top: 20%; } .f2 { left: 10%; top: 50%; } .f3 { left: 15%; top: 80%; }
.f4 { right: 15%; top: 20%; } .f5 { right: 10%; top: 50%; } .f6 { right: 15%; top: 80%; }
.f7 { left: 30%; top: 30%; } .f8 { right: 30%; top: 30%; }
.f9 { left: 30%; top: 70%; } .f10 { right: 30%; top: 70%; }

/* Animation trigger */
.firework { animation: fireworkMain 2s infinite; }
.f1 { animation-delay: 0s; } .f2 { animation-delay: 0.4s; } .f3 { animation-delay: 0.8s; }
.f4 { animation-delay: 0.2s; } .f5 { animation-delay: 0.6s; } .f6 { animation-delay: 1s; }
.f7 { animation-delay: 0.3s; } .f8 { animation-delay: 0.7s; } .f9 { animation-delay: 0.5s; } .f10 { animation-delay: 0.9s; }

@keyframes fireworkMain {
  0% { transform: scale(1); }
  30% { transform: scale(1); }
  100% { transform: scale(1); }
}

.firework .particle {
  animation: particleBurst 2s infinite;
  animation-delay: inherit;
}

/* Burst directions */
.particle:nth-child(1) { transform: translate(40px, 40px); background: #ff6b6b; }
.particle:nth-child(2) { transform: translate(-40px, 40px); background: #4cd137; }
.particle:nth-child(3) { transform: translate(40px, -40px); background: #00a8ff; }
.particle:nth-child(4) { transform: translate(-40px, -40px); background: #fbc531; }
.particle:nth-child(5) { transform: translate(0, 50px); background: #9c88ff; }
.particle:nth-child(6) { transform: translate(0, -50px); background: #ff9f43; }
.particle:nth-child(7) { transform: translate(50px, 0); background: #ff4757; }
.particle:nth-child(8) { transform: translate(-50px, 0); background: #2ed573; }

@keyframes particleBurst {
  0% { transform: translate(0,0); opacity: 0; }
  10% { opacity: 1; }
  100% { opacity: 0; } /* Ends at the burst position defined in nth-child */
}
</style>
