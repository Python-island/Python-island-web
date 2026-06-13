<script setup>
/**
 * App.vue - 应用根组件
 * 粗暴翻页逻辑：两个页面一直存在，通过 CSS transform + opacity 控制显示/隐藏
 */

// 导入Vue3组合式API
import { ref, onMounted, onUnmounted } from 'vue'

// 导入页面组件
import Welcome from './components/Welcome.vue'         // 欢迎页
import Introduction from './components/Introduction.vue'  // 介绍页
import Team from './components/team.vue'               // 团队页
import Download from './components/download.vue'       // 下载页
import 'magic.css/dist/magic.css'

/**
 * 响应式状态管理
 */
const currentPage = ref('welcome')  // 当前页面标识
const isAnimating = ref(false)      // 是否正在动画中

/**
 * 页面导航核心方法
 * @param {string} page - 目标页面名称
 */
const navigateTo = (page) => {
  // 如果正在动画或目标页就是当前页，直接返回
  if (isAnimating.value || page === currentPage.value) return

  // 更新当前页面
  currentPage.value = page

  // 设置动画状态，800ms后重置
  isAnimating.value = true
  setTimeout(() => {
    isAnimating.value = false
  }, 800)
}

// 统一的页面顺序（方便后续扩展）
const pageOrder = ['welcome', 'introduction', 'team', 'download']

/**
 * 导航到上一页
 */
const goToPrev = () => {
  const currentIndex = pageOrder.indexOf(currentPage.value)
  if (currentIndex > 0) {
    navigateTo(pageOrder[currentIndex - 1])
  }
}

/**
 * 导航到下一页
 */
const goToNext = () => {
  const currentIndex = pageOrder.indexOf(currentPage.value)
  if (currentIndex < pageOrder.length - 1) {
    navigateTo(pageOrder[currentIndex + 1])
  }
}

/**
 * 鼠标滚轮事件处理
 */
const handleWheel = (e) => {
  if (isAnimating.value) return
  if (e.deltaY > 0) {
    goToNext()
  } else if (e.deltaY < 0) {
    goToPrev()
  }
}

onMounted(() => {
  window.addEventListener('wheel', handleWheel, { passive: false })
})

onUnmounted(() => {
  window.removeEventListener('wheel', handleWheel)
})
</script>

<template>
  <div class="app-container">
    <!-- 欢迎页面 -->
    <div :class="['page-wrapper', { 'page-active': currentPage === 'welcome' }]">
      <Welcome />
    </div>

    <!-- 介绍页面：isActive 控制内部动画 -->
    <div :class="['page-wrapper', { 'page-active': currentPage === 'introduction' }]">
      <Introduction :is-active="currentPage === 'introduction'" />
    </div>

    <!-- 团队页面：isActive 控制内部动画 -->
    <div :class="['page-wrapper', { 'page-active': currentPage === 'team' }]">
      <Team :is-active="currentPage === 'team'" />
    </div>

    <!-- 下载页面：isActive 控制内部动画 -->
    <div :class="['page-wrapper', { 'page-active': currentPage === 'download' }]">
      <Download :is-active="currentPage === 'download'" />
    </div>

    <!-- 页面切换提示 -->
    <div class="scroll-indicator">
      <span v-if="currentPage === 'welcome'">↓ 滚动了解更多 ↓</span>
      <span v-else-if="currentPage === 'introduction'">↓ 继续滚动查看团队 ↓</span>
      <span v-else-if="currentPage === 'team'">↓ 前往下载中心 ↓</span>
      <span v-else>↑ 返回上一页 ↑</span>
    </div>
  </div>
</template>

<style>
/* 全局重置（非 scoped，才能作用到 html/body） */
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

* {
  box-sizing: border-box;
}
</style>

<style scoped>
.app-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

/* 页面容器 - 粗暴版：两个页面都一直存在，仅用 transform 切换位置 */
.page-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* 默认状态：下移 100%，完全透明，不可交互 */
  transform: translateY(100%);
  opacity: 0;
  pointer-events: none;
  transition: transform 0.8s cubic-bezier(0.22, 0.61, 0.36, 1),
              opacity 0.8s ease;
  z-index: 1;
}

/* 激活状态：回到原位，可见，可交互 */
.page-wrapper.page-active {
  transform: translateY(0%);
  opacity: 1;
  pointer-events: auto;
  z-index: 10;
}

/* 滚动提示条 */
.scroll-indicator {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-size: 1rem;
  text-shadow: 0 2px 8px rgba(0,0,0,0.3);
  z-index: 100;
  background: rgba(0,0,0,0.2);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  opacity: 0.8;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.6;
    transform: translateX(-50%) scale(1);
  }
  50% {
    opacity: 1;
    transform: translateX(-50%) scale(1.05);
  }
}
</style>
