<script setup>
/**
 * team.vue - 团队介绍页面
 * 风格与 Welcome/Introduction 保持一致：渐变背景 + 浮动装饰 + 居中内容
 */

import { ref, onMounted } from 'vue'
import Group from './group.vue'

// 渐变色组合（与 Introduction 保持类似风格）
const gradientColors = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)',
  'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
]

// 随机选择一个渐变色
const currentGradient = ref('')
// 是否播放进入动画
const playAnimations = ref(false)

onMounted(() => {
  const randomIndex = Math.floor(Math.random() * gradientColors.length)
  currentGradient.value = gradientColors[randomIndex]
  // 页面挂载后播放动画
  setTimeout(() => {
    playAnimations.value = true
  }, 100)
})
</script>

<template>
  <div class="team-container" :style="{ background: currentGradient }">
    <!-- 背景装饰层（风格与其它页面一致） -->
    <div class="background-decoration">
      <div class="floating-shape shape-1"></div>
      <div class="floating-shape shape-2"></div>
      <div class="floating-shape shape-3"></div>
      <div class="floating-shape shape-4"></div>
    </div>

    <!-- 内容区域 -->
    <div class="team-content">
      <!-- 标题区 -->
      <div :class="['header-section', playAnimations ? 'magictime vanishIn' : '']">
        <h1 class="team-title">开发团队</h1>
        <p class="team-subtitle">认识每一位贡献者</p>
      </div>

      <!-- 团队卡片 Swiper 组件 -->
      <div :class="['group-wrapper', playAnimations ? 'magictime vanishIn' : '']">
        <Group />
      </div>
    </div>
  </div>
</template>

<style scoped>
.team-container {
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
  color: white;
}

/* 背景装饰动画（与其它页面一致） */
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
  top: 30%;
  right: -60px;
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
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-20px) rotate(90deg); }
  66% { transform: translateY(10px) rotate(180deg); }
}

/* 内容区：垂直居中，标题在上，卡片在下 */
.team-content {
  z-index: 10;
  width: 100%;
  max-width: 1200px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: clamp(1rem, 2vh, 2rem);
  min-height: 0;
}

/* 标题区 */
.header-section {
  text-align: center;
  flex-shrink: 0;
  animation-duration: 1s;
  margin: 3rem;
}

.team-title {
  font-size: clamp(1.8rem, 4.5vw, 2.6rem);
  font-weight: 700;
  margin: 0;
  letter-spacing: 0.05em;
  text-shadow: 0 4px 16px rgba(0,0,0,0.25);
}

.team-subtitle {
  font-size: clamp(0.85rem, 1.6vw, 1rem);
  font-weight: 300;
  opacity: 0.9;
  margin-top: 0.3rem;
}

/* group 组件容器：允许垂直方向占据剩余空间但不超出 */
.group-wrapper {
  width: 100%;
  max-width: 1000px;
  flex-shrink: 1;
  min-height: 0;
  animation-duration: 1.2s;
  animation-delay: 0.3s;
}

/* 响应式：小屏时缩小间距 */
@media (max-width: 640px) {
  .team-content {
    gap: 1rem;
  }
}
</style>
