<template>
  <div v-if="showWarning" class="mobile-warning-overlay">
    <div class="mobile-warning-modal">
      <h3>⚠️ 警告</h3>
      <p>移动端设备访问此网站可能导致严重的画面问题</p>
      <p>请在PC端访问此网站</p>
      <button @click="closeWarning">我知道，执意尝试继续访问</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import pyislandLOGO from './pyislandLOGO.vue'
const showWarning = ref(false)

onMounted(() => {
  // 检测移动设备
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  showWarning.value = isMobile
})

const closeWarning = () => {
  window.location.href = 'https://pyisland.com/dnr.mp4'
}
</script>

<style scoped>
.mobile-warning-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  padding: 2rem 0;
}

.mobile-warning-modal {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  width: 100%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.mobile-warning-modal h3 {
  color: #dc2626;
  margin-bottom: 1rem;
}

.mobile-warning-modal p {
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

.mobile-warning-modal button {
  background: #2681dc;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 999px;
  cursor: pointer;
  font-size: 1rem;
}

.mobile-warning-modal button:hover {
  background: #2681dc;
}
</style>