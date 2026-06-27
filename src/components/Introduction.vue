<script setup>
import { ref, onMounted } from 'vue'
import { Github, Tiktok, Tv, Like } from '@icon-park/vue-next'

// 定义渐变色组合数组
const gradientColors = [
  'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
  'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)',
  'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)',
  'linear-gradient(135deg, #fec163 0%, #de4313 100%)',
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
]

// 随机选择一个渐变色
const currentGradient = ref('')
// 是否播放卡片动画
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
  <div class="introduction-container" :style="{ background: currentGradient }">
    <!-- 背景装饰层 -->
    <div class="background-decoration">
      <div class="floating-shape shape-1"></div>
      <div class="floating-shape shape-2"></div>
      <div class="floating-shape shape-3"></div>
      <div class="floating-shape shape-4"></div>
    </div>

    <!-- 内容区域 -->
    <div class="introduction-content">
      <!-- 标题区：仅在激活时播放动画 -->
      <div :class="['header-section', playAnimations ? 'magictime vanishIn' : '']">
        <h1 class="introduction-title">PyIsland</h1>
        <p class="introduction-subtitle">Pyisland / Cisland / Eisland</p>
      </div>

      <!-- 社交按钮区域：仅在激活时播放动画 -->
      <div :class="['social-buttons', playAnimations ? 'magictime vanishIn' : '']" :style="playAnimations ? 'animation-delay: 0.5s;' : ''">
        <a href="https://github.com/Python-island/Python-island" target="_blank" rel="noopener noreferrer" class="social-button github-btn">
          <Github theme="outline" size="24" fill="#333"/>
          <span class="button-text">Pyisland / Cisland</span>
        </a>
        <a href="https://github.com/JNTMTMTM/eIsland" target="_blank" rel="noopener noreferrer" class="social-button github-btn">
          <Github theme="outline" size="24" fill="#333"/>
          <span class="button-text">Eisland</span>
        </a>
        <a href="https://www.douyin.com/video/7644551661326748963" target="_blank" rel="noopener noreferrer" class="social-button douyin-btn">
          <Tiktok theme="outline" size="24" fill="#333"/>
          <span class="button-text">抖音</span>
        </a>
        <a href="https://www.bilibili.com/video/BV1QEE36eEWJ/#reply116715266508450" target="_blank" rel="noopener noreferrer" class="social-button bilibili-btn">
          <Tv theme="outline" size="24" fill="#333"/>
          <span class="button-text">B站</span>
        </a>
        <a href="https://pyisland.com" target="_blank" rel="noopener noreferrer" class="social-button bilibili-btn">
          <like theme="outline" size="24" fill="#333"/>
          <span class="button-text">Pyisland官网（鸡哥友情链接）</span>
        </a>
        <a href="https://docs.pyisland.com" target="_blank" rel="noopener noreferrer" class="social-button bilibili-btn">
          <like theme="outline" size="24" fill="#333"/>
          <span class="button-text">Pyisland文档站</span>
        </a>
      </div>

      <!-- 2x2 四宫格卡片：仅在激活时播放动画，渐进延迟 -->
      <div class="feature-grid">
        <div
          :class="['feature-card', playAnimations ? 'magictime vanishIn' : '']"
          :style="playAnimations ? 'animation-delay: 1s;' : ''"
        >
          <div class="card-icon icon-python">🖥️</div>
          <div class="card-text">
            <h3>丰富生态</h3>
            <p>项目含盖了Pyside6，PyQT5，tauri，electron等主流桌面框架。</p>
          </div>
        </div>

        <div
          :class="['feature-card', playAnimations ? 'magictime vanishIn' : '']"
          :style="playAnimations ? 'animation-delay: 1s;' : ''"
        >
          <div class="card-icon icon-ui">🎨</div>
          <div class="card-text">
            <h3>现代 UI</h3>
            <p>三者追求现代的用户界面，提供流畅的动画与清爽的视觉风格。</p>
          </div>
        </div>

        <div
          :class="['feature-card', playAnimations ? 'magictime vanishIn' : '']"
          :style="playAnimations ? 'animation-delay: 1s;' : ''"
        >
          <div class="card-icon icon-speed">⚡</div>
          <div class="card-text">
            <h3>高性能</h3>
            <p>按需加载与资源优化，启动与交互响应更快</p>
          </div>
        </div>

        <div
          :class="['feature-card', playAnimations ? 'magictime vanishIn' : '']"
          :style="playAnimations ? 'animation-delay: 1s;' : ''"
        >
          <div class="card-icon icon-plugin">🔧</div>
          <div class="card-text">
            <h3>开发者支持</h3>
            <p>抖音平台与B站平台均有开发者支持，欢迎加入我们的社区！</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.introduction-container {
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
  width: 180px;
  height: 180px;
  background: #ff6b6b;
  top: -90px;
  right: -90px;
  animation-delay: 0s;
}

.shape-2 {
  width: 140px;
  height: 140px;
  background: #4ecdc4;
  bottom: -70px;
  left: -70px;
  animation-delay: 5s;
}

.shape-3 {
  width: 110px;
  height: 110px;
  background: #ffe66d;
  top: 30%;
  right: -55px;
  animation-delay: 10s;
}

.shape-4 {
  width: 160px;
  height: 160px;
  background: #1a535c;
  bottom: -80px;
  right: 20%;
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

/* 内容样式 */
.introduction-content {
  text-align: center;
  color: white;
  z-index: 10;
  max-width: 900px;
  width: 100%;
  padding: 1rem 2rem;
}

/* 标题区 */
.header-section {
  margin-bottom: 1.5rem;
  animation-duration: 1s;
}

.introduction-title {
  font-size: clamp(2rem, 5vw, 3.2rem);
  font-weight: 700;
  margin: 0;
  letter-spacing: 0.05em;
  text-shadow: 0 4px 16px rgba(0,0,0,0.25);
}

.introduction-subtitle {
  font-size: clamp(0.9rem, 2vw, 1.1rem);
  font-weight: 300;
  opacity: 0.9;
  margin-top: 0.4rem;
  letter-spacing: 0.02em;
}

/* 社交按钮区域 */
.social-buttons {
  display: flex;
  gap: 0.8rem;
  justify-content: center;
  margin-bottom: 2rem;
  animation-duration: 1s;
}

/* 社交按钮样式 */
.social-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding: 0.8rem 1.2rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  color: white;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
}

.social-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 28px rgba(0,0,0,0.15);
}

.button-icon {
  font-size: 1.2rem;
}

.button-text {
  white-space: nowrap;
}

/* 按钮主题色 */
.github-btn { background: rgba(75, 139, 190, 0.25); }
.douyin-btn { background: rgba(255, 107, 107, 0.25); }
.bilibili-btn { background: rgba(255, 230, 109, 0.25); }

/* 2x2 四宫格卡片布局 */
.feature-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 1rem;
  margin: 0 auto;
  max-width: 800px;
}

/* 卡片样式 */
.feature-card {
  display: flex;
  align-items: center;
  text-align: left;
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding: 1.2rem 1.3rem;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  animation-duration: 1.2s;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 28px rgba(0,0,0,0.15);
}

/* 图标区域 */
.card-icon {
  flex-shrink: 0;
  width: 52px;
  height: 52px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  margin-right: 1rem;
  background: rgba(255,255,255,0.15);
}

.icon-python { background: rgba(75, 139, 190, 0.25); }
.icon-ui     { background: rgba(255, 107, 107, 0.25); }
.icon-speed  { background: rgba(255, 230, 109, 0.25); }
.icon-plugin { background: rgba(78, 205, 196, 0.25); }

/* 文字区域 */
.card-text h3 {
  font-size: 1.05rem;
  font-weight: 600;
  margin: 0 0 0.35rem 0;
}

.card-text p {
  font-size: 0.85rem;
  line-height: 1.5;
  opacity: 0.9;
  margin: 0;
}

/* 响应式：窄屏时退化为单列 */
@media (max-width: 640px) {
  .feature-grid {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, auto);
  }
}

/* 动画时长统一配置 */
.magictime {
  animation-duration: 1.2s;
}
</style>