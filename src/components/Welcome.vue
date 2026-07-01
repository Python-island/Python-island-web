<script setup>
import { ref, onMounted } from 'vue'
import pyislandLOGO from './pyislandLOGO.vue'
import 'magic.css/dist/magic.css'

// 定义渐变色组合数组
const gradientColors = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
]

// 随机选择一个渐变色
const currentGradient = ref('')

onMounted(() => {
  // 页面加载时随机选择一个渐变
  const randomIndex = Math.floor(Math.random() * gradientColors.length)
  currentGradient.value = gradientColors[randomIndex]
})
</script>

<template>
  <div class="welcome-container" :style="{ background: currentGradient }">
    <!-- 背景装饰层 -->
    <div class="background-decoration">
      <div class="floating-shape shape-1"></div>
      <div class="floating-shape shape-2"></div>
      <div class="floating-shape shape-3"></div>
      <div class="floating-shape shape-4"></div>
    </div>
    
    <!-- LOGO区域 -->
    <div class="logo-wrapper magictime twisterInDown">
      <pyislandLOGO />
    </div>
    
    <!-- 欢迎文字区域 -->
    <div class="welcome-content">
      <h1 class="welcome-title magictime vanishIn">欢迎来到PyIsland开源项目平台</h1>
      <p class="welcome-subtitle magictime vanishIn" style="animation-delay: 0.3s;">探索Pyisland、Cisland、Eisland、PyCapsule、Pyball、Macisland等优质开源项目</p>
    </div>
  </div>
</template>

<style scoped>

 html, body {
   margin: 0;
   padding: 0;
   height: 100vh;
   width: 100vw;
   overflow: hidden;
 }

.welcome-container {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 1rem;
  box-sizing: border-box;
}

/* 背景装饰动画 */
.background-decoration {
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  pointer-events: none;
}

.floating-shape {
  position: absolute;
  border-radius: 50%;
  opacity: 0.15;
  animation: float 20s infinite ease-in-out;
}

.shape-1 {
  width: 200px;
  height: 200px;
  background: #ff6b6b;
  top: -100px;
  left: -100px;
  animation-delay: 0s;
}

.shape-2 {
  width: 150px;
  height: 150px;
  background: #4ecdc4;
  bottom: -75px;
  right: -75px;
  animation-delay: 5s;
}

.shape-3 {
  width: 120px;
  height: 120px;
  background: #ffe66d;
  top: 50%;
  left: -60px;
  animation-delay: 10s;
}

.shape-4 {
  width: 180px;
  height: 180px;
  background: #1a535c;
  bottom: -90px;
  left: 10%;
  animation-delay: 15s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  33% {
    transform: translateY(-20px) rotate(90deg);
  }
  66% {
    transform: translateY(10px) rotate(180deg);
  }
}

/* LOGO样式 */
.logo-wrapper {
  animation-duration: 2s;
  margin-bottom: 1.5rem;
  filter: drop-shadow(0 10px 20px rgba(0,0,0,0.2));
  max-width: 80%;
  height: auto;
}

/* 文字内容样式 */
.welcome-content {
  text-align: center;
  color: white;
  z-index: 10;
}

.welcome-title {
  font-size: clamp(2rem, 6vw, 3.5rem);
  font-weight: 700;
  margin-top: 1rem;
  margin-bottom: 1rem;
  text-shadow: 0 4px 12px rgba(0,0,0,0.3);
  animation-duration: 1.5s;
}

.welcome-subtitle {
  font-size: clamp(1rem, 3vw, 1.5rem);
  font-weight: 300;
  margin-bottom: 1.5rem;
  opacity: 0.9;
  animation-duration: 1.5s;
}

/* 动画时长统一配置 */
.magictime {
  animation-duration: 2.5s;
}
</style>

