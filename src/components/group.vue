<script setup>
/**
 * group.vue - 团队介绍组件
 * 使用 Swiper 的 coverflow（3D 翻转）效果展示团队成员卡片
 */

// Swiper 12 导入方式
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules'

/**
 * 团队成员数据
 * 保留已有数据结构：name / role / desc / avatar / state
 */
const teamMembers = [
  {
    name: 'kernel',
    role: 'Pyisland初始开发者',
    desc: 'pyisland 中最早的开发者，负责 pyisland 1.0-1.7、PyCapsule、pyball 项目的开发',
    avatar: 'public/avatar/kernel.png',
    state: '不写屎山'
  },
  {
    name: '长风',
    role: '早期纯QT分支开发者',
    desc: 'pyisland 早期纯 QT 分支开发者，同时为 pyisland 贡献蓝牙库、通知库',
    avatar: 'public/avatar/star.jpg',
    state: '不造轮子'
  },
  {
    name: '鸡哥',
    role: 'Pyisland / Eisland 开发者',
    desc: 'pyisland / Eisland 项目开发者，同时负责 pyisland 文档站和介绍页',
    avatar: 'public/avatar/JNTMTMTM.jpg',
    state: '不会全栈'
  },
  {
    name: 'cxp1r',
    role: 'pyisland / tauri 开发者',
    desc: 'pyisland / tauri 项目开发者，负责文档站与 tauri 版本的维护',
    avatar: 'public/avatar/cxp1r.jpg',
    state: '喜欢上学'
  },
  {
    name: 'code',
    role: 'tauri 开发者',
    desc: 'tauri 项目开发者，负责 tauri 分支灵动岛的开发与维护',
    avatar: 'public/avatar/code.jpg',
    state: '古法编程'
  },
  {
    name: 'gemini',
    role: 'pyisland 开发者',
    desc: '负责 pyisland 项目结构重构与维护',
    avatar: 'public/avatar/gemini.jpg',
    state: '万兆出装'
  },
  {
    name: 'wanku',
    role: 'wanku 分支开发者',
    desc: '早期 wanku 分支开发者，负责 wanku 分支的维护与开发',
    avatar: 'public/avatar/wanku.jpg',
    state: '经常更新'
  }
]


</script>

<template>
  <div class="group">
    <Swiper
      :modules="[EffectCoverflow, Pagination, Autoplay]"
      effect="coverflow"
      :grabCursor="true"
      :centeredSlides="true"
      :slidesPerView="'auto'"
      :coverflowEffect="{
        rotate: 40,
        stretch: 0,
        depth: 150,
        modifier: 1,
        slideShadows: true
      }"
      :pagination="{ clickable: true }"
      :autoplay="{ delay: 3500, disableOnInteraction: false }"
      :loop="true"
      class="team-swiper"
    >
      <SwiperSlide v-for="(member, index) in teamMembers" :key="index">
        <div class="team-card" :class="member.state">
          <!-- 头像 -->
          <div class="avatar-box">
            <img class="avatar" :src="member.avatar" :alt="member.name" />
            <span class="state-badge">{{ member.state }}</span>
          </div>

          <!-- 姓名 -->
          <h3 class="name">{{ member.name }}</h3>

          <!-- 角色标签 -->
          <div class="role">{{ member.role }}</div>

          <!-- 描述 -->
          <p class="desc">{{ member.desc }}</p>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style scoped>
.group {
  width: 100%;
  color: white;
}

/* ===== Swiper 容器 ===== */
.team-swiper {
  width: 100%;
  padding: 40px 0 60px;
}

/* coverflow 效果要求 slide 有明确的宽高 */
.team-swiper :deep(.swiper-slide) {
  width: 280px;
  height: 380px;
  background-position: center;
  background-size: cover;
}

/* 分页器点 */
.team-swiper :deep(.swiper-pagination-bullet) {
  background: rgba(255, 255, 255, 0.4);
  width: 10px;
  height: 10px;
}

.team-swiper :deep(.swiper-pagination-bullet-active) {
  background: white;
  width: 28px;
  border-radius: 6px;
  transition: width 0.3s ease;
}

/* ===== 卡片本体 ===== */
.team-card {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 28px 22px;
  border-radius: 20px;
  background: linear-gradient(
    160deg,
    rgba(255, 255, 255, 0.2) 0%,
    rgba(255, 255, 255, 0.08) 100%
  );
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.25);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.team-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.35);
}

/* 头像区 */
.avatar-box {
  position: relative;
  margin-bottom: 14px;
}

.avatar {
  width: 88px;
  height: 88px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid rgba(255, 255, 255, 0.6);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
}

/* 状态徽章（跟随头像右下角） */
.state-badge {
  position: absolute;
  right: -4px;
  bottom: 2px;
  font-size: 0.75rem;
  padding: 3px 10px;
  border-radius: 999px;
  background: linear-gradient(135deg, #4caf50, #66bb6a);
  color: white;
  white-space: nowrap;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
}

/* 姓名 */
.name {
  font-size: 1.3rem;
  font-weight: 700;
  margin: 4px 0 6px;
  letter-spacing: 0.02em;
}

/* 角色标签 */
.role {
  font-size: 0.85rem;
  padding: 4px 12px;
  margin-bottom: 14px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.18);
  color: rgba(255, 255, 255, 0.95);
  line-height: 1.4;
  text-align: center;
}

/* 描述文本 */
.desc {
  font-size: 0.88rem;
  line-height: 1.6;
  opacity: 0.88;
  text-align: center;
  margin: 0;
  padding: 0 4px;
}

/* ===== 响应式：小屏时缩小卡片 ===== */
@media (max-width: 640px) {
  .team-swiper :deep(.swiper-slide) {
    width: 240px;
    height: 340px;
  }

  .team-card {
    padding: 20px 16px;
  }

  .avatar {
    width: 72px;
    height: 72px;
  }

  .name {
    font-size: 1.1rem;
  }

  .desc {
    font-size: 0.82rem;
  }
}
</style>
