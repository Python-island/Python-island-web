<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import 'magic.css/dist/magic.css'

const router = useRouter()
const route = useRoute()

// 页面顺序定义，与路由配置对应
const pageOrder = ['/', '/intro', '/team', '/download']
const isAnimating = ref(false)

/**
 * 导航到指定页面
 */
const navigateTo = (path) => {
  if (isAnimating.value || path === route.path) return
  
  isAnimating.value = true
  router.push(path)
  
  // 800ms后重置动画状态，与页面切换动画时长一致
  setTimeout(() => {
    isAnimating.value = false
  }, 800)
}

/**
 * 鼠标滚轮事件处理
 */
const handleWheel = (e) => {
  if (isAnimating.value) return
  
  const currentIndex = pageOrder.indexOf(route.path)
  if (e.deltaY > 0 && currentIndex < pageOrder.length - 1) {
    // 向下滚动，去下一页
    navigateTo(pageOrder[currentIndex + 1])
  } else if (e.deltaY < 0 && currentIndex > 0) {
    // 向上滚动，去上一页
    navigateTo(pageOrder[currentIndex - 1])
  }
}

/**
 * 获取当前页面的提示文字
 */
const getScrollTip = () => {
  const currentIndex = pageOrder.indexOf(route.path)
  if (currentIndex === 0) return '↓ 滚动了解更多 ↓'
  if (currentIndex < pageOrder.length - 1) return '↓ 继续滚动查看更多 ↓'
  return '↑ 返回上一页 ↑'
}

onMounted(() => {
  window.addEventListener('wheel', handleWheel, { passive: false })
})

onUnmounted(() => {
  window.removeEventListener('wheel', handleWheel)
})
</script>

<template>
  <!-- 路由视图过渡容器 -->
  <router-view v-slot="{ Component }">
    <transition name="page" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
  <!-- 页面切换提示 -->
  <div class="scroll-indicator">
    <span>{{ getScrollTip() }}</span>
  </div>
</template>

<style>
/* 全局重置 */
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

* {
  box-sizing: border-box;
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
  pointer-events: none;
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

/* 页面过渡动画 - 和原来的效果保持一致 */
.page-enter-from {
  transform: translateY(100%);
  opacity: 0;
}

.page-enter-to {
  transform: translateY(0%);
  opacity: 1;
}

.page-leave-from {
  transform: translateY(0%);
  opacity: 1;
}

.page-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

.page-enter-active,
.page-leave-active {
  transition: transform 0.8s cubic-bezier(0.22, 0.61, 0.36, 1),
              opacity 0.8s ease;
}
</style>
