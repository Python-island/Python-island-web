<script setup>
import { ref, watch, computed, onMounted } from 'vue'
import axios from 'axios'

const props = defineProps({
  isActive: { type: Boolean, default: false }
})

const playAnimations = ref(false)
watch(
  () => props.isActive,
  (val) => {
    if (val) playAnimations.value = true
  },
  { immediate: true }
)

// 1. 存放接口原始数组
const versionList = ref([])

// 2. 接口请求函数（只保留一个，删掉第二个冲突的onMounted请求）
const getVersionData = async () => {
  try {
    const res = await axios.get('https://server.pyisland.com/api/v1/version/list')
    versionList.value = res.data.data
    console.log('接口返回版本数据', versionList.value)
  } catch (err) {
    console.error('接口请求失败', err)
  }
}

// 3. 计算属性实时筛选三个软件（数据一变自动更新）
const eisland = computed(() => versionList.value.find(item => item.appName === 'eisland'))
const tauri = computed(() => versionList.value.find(item => item.appName === 'tauri'))
const pyisland = computed(() => versionList.value.find(item => item.appName === 'pyisland'))

// ========== 关键修复：用 computed 生成下载列表，自动同步链接 ==========
const downloads = computed(() => [
  {
    name: 'pyisland',
    version: pyisland.value?.version || '1.7.2', // 修复不存在的versionInfo
    size: '2 MB',
    icon: 'P',
    tagColor: 'linear-gradient(135deg, #42b883, #35495e)',
    desc: '基于Pyside6+QwebEngineView打造的灵动岛，为pyisland主分支的最新版本。',
    features: ['Pyside6框架', 'QwebEngineView渲染', '轻量化', '学习简单'],
    videoIframe: '',
    downloadUrl: pyisland.value?.downloadUrl || '' // 自动响应接口数据
  },
  {
    name: 'eisland',
    version: eisland.value?.version || '26.6',
    size: '1024GB',
    icon: 'E',
    tagColor: 'linear-gradient(135deg, #306998, #FFD43B)',
    desc: '采用Electron框架制作的刘海屏，功能丰富，动画流畅，为该系列功能最多版本。',
    features: ['功能最强', '插件丰富', '动画流畅', '长期维护'],
    videoIframe: '',
    downloadUrl: eisland.value?.downloadUrl || ''
  },
  {
    name: 'tauri',
    version: tauri.value?.version || '0.1',
    size: '999 MB',
    icon: 'C',
    tagColor: 'linear-gradient(135deg, #ffc131, #24c8db)',
    desc: '基于 Tauri 的轻量桌面版，体积更小、启动更快，原生系统集成更紧密。',
    features: ['超小体积', '启动飞快', '原生系统 API', '低内存占用'],
    videoIframe: '',
    downloadUrl: tauri.value?.downloadUrl || ''
  },
  {
    name: 'PyCapsule速记胶囊',
    version: '1.0',
    size: '2 MB',
    icon: '💊',
    tagColor: 'linear-gradient(135deg, #5ee7df, #b490ca)',
    desc: 'PyIsland 的衍生项目，主打高效记录+文件中转，极低占用+离线语音',
    features: ['衍生项目', '胶囊设计', '文件中转', '离线语音'],
    videoIframe: '',
    downloadUrl: ''
  },
  {
    name: 'PyBall悬浮球',
    version: '1.0',
    size: '2 MB',
    icon: '🟣',
    tagColor: 'linear-gradient(135deg, #f093fb, #f5576c)',
    desc: 'PyIsland 的衍生项目，专为大屏幕，无键鼠，远程桌面设计，提供快捷的按钮操作。',
    features: ['衍生项目', '悬浮球体', '自动隐藏', '展开设计'],
    videoIframe: '',
    downloadUrl: ''
  },
  {
    name: 'Macisland',
    version: '1.1',
    size: '52 MB',
    icon: '🍎',
    tagColor: 'linear-gradient(135deg, #ff9966, #ff5e62)',
    desc: 'MacOS 专用版本，提供更优化的性能和用户体验。',
    features: ['MacOS专用', '全新赛道', '优秀动画', '持续开发'],
    videoIframe: '',
    downloadUrl: ''
  }
])

// 弹窗逻辑不变
const modalOpen = ref(false)
const activeItem = ref(null)
function openModal(item) {
  activeItem.value = item
  modalOpen.value = true
}
function closeModal() {
  modalOpen.value = false
  activeItem.value = null
}
const tipDeveloping = () => {
  alert('功能正在开发中，敬请期待~')
}

// 渐变不变
const gradients = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
]
const currentGradient = gradients[Math.floor(Math.random() * gradients.length)]

// 只保留一个onMounted，删掉你原来第二个重复请求下载链接的onMounted
onMounted(getVersionData)
</script>

<template>
  <div class="download-container" :style="{ background: currentGradient }">
    <!-- 背景装饰层（与其他页面保持一致） -->
    <div class="background-decoration">
      <div class="floating-shape shape-1"></div>
      <div class="floating-shape shape-2"></div>
      <div class="floating-shape shape-3"></div>
      <div class="floating-shape shape-4"></div>
    </div>

    <!-- 内容区域 -->
    <div class="download-content">
      <!-- 标题区 -->
      <div :class="['header-section', playAnimations ? 'magictime swashIn' : '']">
        <h1 class="download-title">下载中心</h1>
        <p class="download-subtitle">选择适合你的 PyIsland 版本</p>
      </div>

      <!-- 卡片网格 -->
      <div class="cards-grid" :class="playAnimations ? 'magictime swashIn' : ''">
        <div
          v-for="(item, index) in downloads"
          :key="index"
          class="download-card"
          @click="openModal(item)"
          :style="{ animationDelay: (0.1 * index) + 's' }"
        >
          <div class="card-icon" :style="{ background: item.tagColor }">
            <span>{{ item.icon }}</span>
          </div>
          <h3 class="card-name">{{ item.name }}</h3>
          <div class="card-meta">
            <span>v{{ item.version }}</span>
<!--            <span class="dot">·</span>-->
<!--            <span>{{ item.size }}</span>-->
          </div>
          <p class="card-desc">{{ item.desc }}</p>
          <div class="card-action">
            <span>查看详情</span>
            <span class="arrow">→</span>
          </div>
        </div>
      </div>
    </div>

    <!-- ============ 详情弹窗 ============ -->
    <Transition name="modal-fade">
      <div v-if="modalOpen" class="modal-mask" @click.self="closeModal">
        <Transition name="modal-scale" appear>
          <div v-if="modalOpen" class="modal-content" :key="activeItem?.name" @click.stop>
            <!-- 关闭按钮 -->
            <button class="modal-close" @click="closeModal" aria-label="关闭">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <!-- 左侧：介绍 -->
            <div class="modal-left">
              <div class="modal-icon" :style="{ background: activeItem?.tagColor }">
                <span>{{ activeItem?.icon }}</span>
              </div>
              <h2 class="modal-title">{{ activeItem?.name }}</h2>
              <div class="modal-meta">
                <span>版本 v{{ activeItem?.version }}</span>
                <!-- <span class="dot">·</span> -->
                <!-- <span>大小 {{ activeItem?.size }}</span> -->
              </div>
              <p class="modal-desc">{{ activeItem?.desc }}</p>

              <div class="modal-features-title">主要特性</div>
              <ul class="modal-features">
                <li v-for="(f, i) in activeItem?.features" :key="i">
                  <span class="check">✓</span>{{ f }}
                </li>
              </ul>

              <a
                v-if="activeItem?.name !== 'Macisland'"
                class="modal-download-btn"
                :href="activeItem?.downloadUrl"
                target="_blank"
                rel="noopener noreferrer"
              >
                立即下载
              </a>
              <a 
                v-else
                class="modal-download-btn"
                :href="activeItem?.downloadUrl"
                target="_blank"
                rel="noopener noreferrer"
                @click.prevent="tipDeveloping"
              >
                正在开发
              </a>
            </div>

            <!-- 右侧：视频 -->
            <div class="modal-right">
              <div class="video-wrapper">
                <!-- PyIsland -->
                <iframe
                  v-if="activeItem?.name === 'pyisland'"
                  class="video-player"
                  width="720" height="1280" frameborder="0" src="https://open.douyin.com/player/video?vid=7625625564702887187&amp;autoplay=0"
                  referrerpolicy="unsafe-url"
                  allowfullscreen>
                </iframe>

                <!-- Eisland -->
                <iframe
                  v-else-if="activeItem?.name === 'eisland'"
                  class="video-player"
                  width="720" height="1280" frameborder="0" src="https://open.douyin.com/player/video?vid=7649399438473022758&amp;autoplay=0"
                  referrerpolicy="unsafe-url"
                  allowfullscreen>
                </iframe>

                <!-- Cisland -->
                <iframe
                  v-else-if="activeItem?.name === 'tauri'"
                  class="video-player"
                  width="720" height="1280" frameborder="0" src="https://open.douyin.com/player/video?vid=7636440278383004970&amp;autoplay=0"
                  referrerpolicy="unsafe-url"
                  allowfullscreen>
                </iframe>

                <!-- PyCapsule -->
                <iframe
                  v-else-if="activeItem?.name === 'PyCapsule速记胶囊'"
                  class="video-player"
                  width="720" height="1280" frameborder="0" src="https://open.douyin.com/player/video?vid=7630483374364200244&amp;autoplay=0"
                  referrerpolicy="unsafe-url"
                  allowfullscreen>
                </iframe>

                <!-- PyBall -->
                <iframe
                  v-else-if="activeItem?.name === 'PyBall悬浮球'"
                  class="video-player"
                  width="720" height="1280" frameborder="0" src="https://open.douyin.com/player/video?vid=7627043738216385801&amp;autoplay=0"
                  referrerpolicy="unsafe-url"
                  allowfullscreen>
                </iframe>

                <!-- Macisland -->
                <iframe
                  v-else-if="activeItem?.name === 'Macisland'"
                  class="video-player"
                  width="720" height="1280" frameborder="0" src="https://open.douyin.com/player/video?vid=7623324521977695515&amp;autoplay=0"
                  referrerpolicy="unsafe-url"
                  allowfullscreen>
                </iframe>

                <!-- 没有匹配时的占位 -->
<!--                <div v-else class="video-placeholder">-->
<!--                  <div class="placeholder-icon">🎬</div>-->
<!--                  <div class="placeholder-text">视频介绍</div>-->
<!--                  <div class="placeholder-sub">请在上面的 iframe 标签中填入你的抖音嵌入链接</div>-->
<!--                </div>-->
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
/* ============================================================
   容器与布局（与其他页面保持一致的风格）
   ============================================================ */
.download-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 1rem;
  box-sizing: border-box;
  color: white;
}

.background-decoration {
  position: absolute;
  width: 100%;
  height: 100%;
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
  width: 220px; height: 220px;
  background: #ff6b6b;
  top: -110px; left: -110px;
  animation-delay: 0s;
}
.shape-2 {
  width: 160px; height: 160px;
  background: #4ecdc4;
  bottom: -80px; right: -80px;
  animation-delay: 5s;
}
.shape-3 {
  width: 130px; height: 130px;
  background: #ffe66d;
  top: 20%; right: 10%;
  animation-delay: 10s;
}
.shape-4 {
  width: 180px; height: 180px;
  background: #a084e8;
  bottom: 15%; left: 8%;
  animation-delay: 15s;
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  33% { transform: translateY(-20px) rotate(90deg); }
  66% { transform: translateY(10px) rotate(180deg); }
}

/* ============================================================
   内容区
   ============================================================ */
.download-content {
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

.header-section {
  text-align: center;
  flex-shrink: 0;
  animation-duration: 1s;
}

.download-title {
  font-size: clamp(1.8rem, 4.5vw, 2.6rem);
  font-weight: 700;
  margin: 0;
  letter-spacing: 0.05em;
  text-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
}

.download-subtitle {
  font-size: clamp(0.85rem, 1.6vw, 1rem);
  font-weight: 300;
  opacity: 0.9;
  margin-top: 0.3rem;
}

/* ============================================================
   卡片网格
   ============================================================ */
.cards-grid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  animation-duration: 1.2s;
}

/* 单个卡片 */
.download-card {
  background: linear-gradient(
    160deg,
    rgba(255, 255, 255, 0.2) 0%,
    rgba(255, 255, 255, 0.08) 100%
  );
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 18px;
  padding: 20px;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.18);
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
  overflow: hidden;
}

.download-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 14px 36px rgba(0, 0, 0, 0.3);
}

.card-icon {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.2);
}

.card-name {
  font-size: 1.1rem;
  font-weight: 700;
  margin: 4px 0 0;
  letter-spacing: 0.01em;
}

.card-meta {
  font-size: 0.8rem;
  opacity: 0.8;
  display: flex;
  align-items: center;
  gap: 6px;
}

.card-meta .dot {
  opacity: 0.5;
}

.card-desc {
  font-size: 0.85rem;
  line-height: 1.55;
  opacity: 0.9;
  margin: 0;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-action {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 4px;
  font-size: 0.85rem;
  font-weight: 600;
}

.card-action .arrow {
  transition: transform 0.25s ease;
}

.download-card:hover .card-action .arrow {
  transform: translateX(4px);
}

/* ============================================================
   详情弹窗
   ============================================================ */
.modal-mask {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
}

.modal-content {
  position: relative;
  width: 100%;
  max-width: 820px;
  height: 90vh;
  max-height: 720px;
  display: flex;
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 24px;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.45);
  color: white;
  overflow: hidden;
}

/* 关闭按钮 */
.modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 10;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.15);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease, transform 0.2s ease;
}

.modal-close:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: rotate(90deg);
}

/* ---- 左侧介绍 ---- */
.modal-left {
  width: 42%;
  padding: 36px 28px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  box-sizing: border-box;
}

.modal-icon {
  width: 64px;
  height: 64px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
}

.modal-title {
  font-size: 1.6rem;
  font-weight: 700;
  margin: 14px 0 4px;
  letter-spacing: 0.02em;
}

.modal-meta {
  font-size: 0.88rem;
  opacity: 0.82;
  display: flex;
  align-items: center;
  gap: 6px;
}

.modal-meta .dot {
  opacity: 0.5;
}

.modal-desc {
  font-size: 0.92rem;
  line-height: 1.65;
  opacity: 0.92;
  margin: 16px 0 0;
}

.modal-features-title {
  margin-top: 18px;
  font-size: 0.88rem;
  font-weight: 600;
  opacity: 0.85;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.modal-features {
  list-style: none;
  padding: 0;
  margin: 10px 0 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.modal-features li {
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 8px;
  opacity: 0.92;
}

.modal-features .check {
  color: #4ade80;
  font-weight: 700;
}

.modal-download-btn {
  margin-top: auto;
  margin-top: 24px;
  padding: 12px 24px;
  border-radius: 999px;
  background: white;
  color: #333;
  text-decoration: none;
  text-align: center;
  font-weight: 600;
  font-size: 0.95rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.modal-download-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 26px rgba(0, 0, 0, 0.3);
}

/* ---- 右侧视频 ---- */
.modal-right {
  width: 58%;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.25);
}

.video-wrapper {
  width: 100%;
  max-width: 360px;
  aspect-ratio: 9 / 16;
  border-radius: 18px;
  overflow: hidden;
  background: black;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5);
}

.video-player {
  width: 100%;
  height: 100%;
  border: none;
  background: black;
}

.video-placeholder {
  text-align: center;
  padding: 30px;
  color: rgba(255, 255, 255, 0.85);
}

.placeholder-icon {
  font-size: 3rem;
  margin-bottom: 10px;
}

.placeholder-text {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 6px;
}

.placeholder-sub {
  font-size: 0.82rem;
  opacity: 0.6;
}

/* ============================================================
   弹窗过渡动画
   ============================================================ */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.25s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-scale-enter-active,
.modal-scale-leave-active {
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.25s ease;
}
.modal-scale-enter-from,
.modal-scale-leave-to {
  transform: scale(0.9);
  opacity: 0;
}

/* ============================================================
   响应式
   ============================================================ */
@media (max-width: 900px) {
  .cards-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .modal-content {
    flex-direction: column;
    height: auto;
    max-height: 90vh;
  }

  .modal-left,
  .modal-right {
    width: 100%;
  }

  .modal-left {
    padding: 24px 20px;
  }

  .modal-right {
    padding: 0 20px 20px;
    min-height: 260px;
  }
}

@media (max-width: 560px) {
  .cards-grid {
    grid-template-columns: 1fr;
  }

  .download-card {
    padding: 16px;
  }
}
</style>
