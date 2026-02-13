<template>
  <div 
    class="blury-image-container" 
    :style="{ 
      width: width, 
      height: height,
      maxWidth: maxWidth,
      maxHeight: maxHeight 
    }"
  >
    <div 
      class="blur-bg" 
      :style="{ backgroundImage: `url(${src})` }"
    ></div>
    <img 
      :src="src" 
      :alt="alt" 
      class="main-img" 
    />
  </div>
</template>

<script setup>
defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: 'Image'
  },
  width: {
    type: String,
    default: '100%'
  },
  height: {
    type: String,
    default: 'auto'
  },
  maxWidth: {
    type: String,
    default: '100%'
  },
  maxHeight: {
    type: String,
    default: '400px'
  }
});
</script>

<style scoped>
.blury-image-container {
  position: relative;
  overflow: hidden;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  background: #000;
  margin: 0 auto;
}

.blur-bg {
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

.main-img {
  position: relative;
  z-index: 2;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}
</style>
