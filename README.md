# PyIsland 2

> PyIsland 的 Vue 3 + Vite 版本，一个拥有精美渐变背景、滚动翻页和丰富动画的项目展示站点。

## ✨ 项目亮点

- 🎨 **精美视觉** — 随机渐变背景 + 浮动装饰元素，每页都拥有独特的视觉体验
- 🌊 **滚动翻页** — 通过鼠标滚轮平滑切换页面，`transform` + `opacity` 过渡实现
- 🎭 **丰富动画** — 使用 `magic.css` 动画库，页面进入时卡片依次浮现
- 📱 **响应式布局** — 自动适配桌面与移动设备
- 🎪 **Swiper 轮播** — 团队介绍页使用 coverflow 3D 翻转效果
- 🪟 **弹窗详情** — 下载页点击卡片弹出「左介绍 + 右视频」的模态窗口

## 📄 页面结构

| 页面 | 组件 | 说明 |
| --- | --- | --- |
| 欢迎页 | `Welcome.vue` | Logo + 欢迎文字 + 随机渐变背景 |
| 介绍页 | `Introduction.vue` | 四宫格特色功能卡片 |
| 团队页 | `team.vue` + `group.vue` | Swiper coverflow 展示贡献者 |
| 下载页 | `download.vue` | 6 个下载卡片 + 详情弹窗 |

翻页顺序：`欢迎页 → 介绍页 → 团队页 → 下载页`

## 🛠️ 技术栈

| 类别 | 技术 |
| --- | --- |
| 框架 | [Vue 3](https://vuejs.org/) |
| 构建 | [Vite](https://vitejs.dev/) |
| 样式 | `magic.css` + 原生 CSS (scoped) |
| 轮播 | [Swiper](https://swiperjs.com/) v12 |
| 语言 | JavaScript (ESM) |

## 📦 目录结构

```
pyisland2/
├── public/              # 静态资源（不经过构建）
│   ├── avatar/          # 团队成员头像
│   └── favicon.ico
├── src/
│   ├── components/      # 页面与组件
│   │   ├── Welcome.vue      # 欢迎页
│   │   ├── Introduction.vue # 介绍页
│   │   ├── team.vue         # 团队页
│   │   ├── group.vue        # 团队卡片（Swiper）
│   │   ├── download.vue     # 下载页 + 详情弹窗
│   │   ├── pyislandLOGO.vue # Logo 组件
│   │   └── mobile_alert.vue # 移动端提示
│   ├── App.vue          # 根组件（管理翻页逻辑）
│   └── main.js          # 应用入口
├── index.html           # HTML 模板
├── vite.config.js       # Vite 配置
└── package.json         # 项目依赖
```

## 🚀 快速开始

### 环境要求

- **Node.js**: `^20.19.0 || >=22.12.0`
- **包管理器**: npm / pnpm / yarn

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

启动后访问终端输出的本地地址（默认 `http://localhost:5173`）。

### 生产构建

```bash
npm run build
```

构建产物输出到 `dist/` 目录。

### 本地预览构建结果

```bash
npm run preview
```

## 🧩 核心实现说明

### 1. 翻页逻辑（`App.vue`）

- 所有页面通过 `.page-wrapper` 绝对定位在同一容器内
- 只有 `.page-active` 页面 `opacity: 1` + `transform: translateY(0)`
- 其他页面 `opacity: 0` 并偏移到视图外
- 监听 `wheel` 事件，`800ms` 的节流防止误翻

```
pageOrder = ['welcome', 'introduction', 'team', 'download']
```

### 2. 进入动画控制（`isActive` prop）

为避免页面在**后台静默播放动画**导致进入时动画已结束，子组件通过 `isActive` prop 动态添加动画类：

```vue
<Team :is-active="currentPage === 'team'" />
```

内部通过 `watch(isActive)` 在页面激活时才添加 `magictime slideUp` 等动画类。

### 3. 团队页 Swiper（`group.vue`）

使用 Swiper v12 `coverflow` 效果：

```js
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules'
// 模板中通过 :modules="[...]" 传入
```

成员数据存储在组件内的 `teamMembers` 数组，可直接编辑增删。

### 4. 下载页模态窗（`download.vue`）

- 6 个卡片采用 3 列 CSS Grid 布局
- 点击卡片 → `modalOpen = true` 弹出详情
- 弹窗内部：左侧 45%（介绍 + 特性 + 下载按钮），右侧 55%（视频播放器）
- 下载数据存储在 `downloads` 数组，`video` 字段填入地址即可播放

## 📝 自定义指南

### 修改团队成员

编辑 `src/components/group.vue` 中的 `teamMembers` 数组：

```js
{
  name: '成员名',
  role: '身份描述',
  desc: '简介文案',
  avatar: 'public/avatar/xxx.jpg',
  state: 'active'   // active: 在贡献 / inactive: 已离开
}
```

### 修改下载卡片

编辑 `src/components/download.vue` 中的 `downloads` 数组：

```js
{
  name: '产品名',
  version: '2.0',
  size: '142 MB',
  icon: '🟩',
  tagColor: 'linear-gradient(135deg, #42b883, #35495e)',
  desc: '简短介绍',
  features: ['特性1', '特性2', '特性3', '特性4'],
  video: 'https://your-video-url.mp4'   // 可选
}
```

### 修改背景渐变

在各页面组件里找到 `gradients` 数组，自行增减渐变色方案即可，例如：

```js
const gradients = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  // ...
]
```

### 新增页面

1. 在 `src/components/` 下创建 `.vue` 文件，参考 `team.vue` 或 `download.vue` 的结构
2. 在 `App.vue` 顶部 `import` 新组件
3. 将页面 ID 追加到 `pageOrder` 数组
4. 在模板中添加新的 `.page-wrapper` 块

## 📜 License

PyIsland 项目组
