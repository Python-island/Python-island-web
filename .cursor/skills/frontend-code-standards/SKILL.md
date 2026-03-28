---
name: frontend-code-standards
description: 前端编码规范速查手册，覆盖 HTML / CSS / JavaScript / TypeScript / React / Next.js 的所有规范细则。适用于编写、审查、重构前端代码，或回答相关规范问题时使用。
---

# 前端编码规范速查

> 作者：**JNTMTMTM**
>
> 本规范基于 [老魏的工作笔记](https://weihongyu12.github.io/web/docs/specification/code/) 整理，是 AI Agent 的前端编码标准参考手册。

## 快速索引

| 章节 | 规范文件 | 触发场景 |
|------|----------|----------|
| HTML 规范 | [STANDARDS.md - HTML 规范](#) | 编写/审查 HTML 模板 |
| CSS 规范 | [STANDARDS.md - CSS 规范](#) | 编写/审查 CSS/SCSS |
| JS/TS 规范 | [STANDARDS.md - JavaScript/TypeScript 规范](#) | 编写/审查 JS/TS 代码 |
| React 规范 | [STANDARDS.md - React 规范](#) | 编写/审查 React 组件 |
| Next.js 规范 | [STANDARDS.md - Next.js 规范](#) | Next.js 项目开发 |

## 核心原则

1. **优先使用 TypeScript**：利用强类型系统减少运行时错误
2. **区分服务端与客户端组件**：默认服务端，仅在必要时使用客户端
3. **性能导向**：关注 Core Web Vitals，避免阻塞渲染和布局偏移
4. **可访问性优先**：ARIA 属性、语义化标签、表单关联
5. **安全编码**：防止 XSS、禁止 `eval()`、外部链接加 `rel`

## 审查清单（Code Review）

编写或审查代码时，逐项检查：

### HTML
- [ ] `<!doctype html>` 小写声明
- [ ] `<html lang="zh-CN">` 声明语言
- [ ] `<meta charset="utf-8">` 声明字符编码
- [ ] 所有属性值使用双引号
- [ ] 自闭合元素不加尾部斜杠 (`<br>` 而非 `<br />`)
- [ ] 图片有 `alt` 属性（装饰图用 `alt=""`）
- [ ] 无重复 `id`
- [ ] 无内联事件处理器 (`onclick`)

### CSS
- [ ] 使用 2 空格缩进
- [ ] 颜色值小写（如 `#fff` 而非 `#FFF`）
- [ ] `0` 值不加单位（如 `margin: 0` 而非 `margin: 0px`）
- [ ] 小数值省略前导 `0`（如 `opacity: .5` 而非 `opacity: 0.5`）
- [ ] 无 `!important`（除非明确必要）
- [ ] 无未使用的选择器
- [ ] Tailwind：classes 有组织顺序（布局 → 盒模型 → 排版 → 视觉）

### JavaScript / TypeScript
- [ ] 使用 `const` / `let`，禁止 `var`
- [ ] 每个 `const` / `let` 声明一个变量
- [ ] 使用 `===` / `!==` 而非 `==` / `!=`
- [ ] 禁止使用 `any`
- [ ] 字符串优先单引号 `''`
- [ ] 优先使用模板字符串拼接
- [ ] 函数声明或表达式，禁止 `new Function`
- [ ] 优先使用 `async/await` 处理异步
- [ ] Promise reject 使用 `Error` 对象
- [ ] 禁止 `eval()` 和 `javascript:` URL
- [ ] 正则表达式使用字面量
- [ ] 优先使用高阶函数（`map`/`filter`/`reduce`）替代 `for` 循环

### React
- [ ] 使用函数组件
- [ ] Props 在参数中解构
- [ ] 禁止 Props 扩散 `...props`
- [ ] 列表渲染使用稳定 `key`（不用数组索引）
- [ ] Hooks 在顶层调用，不在条件/循环/嵌套函数中调用
- [ ] `useEffect` 包含所有外部依赖项
- [ ] 避免在渲染期间调用 `setState`
- [ ] 不直接修改 Props 或 State
- [ ] 避免在 Props 中创建新对象/数组/函数
- [ ] 组件命名使用 PascalCase

### Next.js
- [ ] 使用 `<Link>` 进行内部跳转（禁止 `<a>` 跳转内部页面）
- [ ] 外部链接加 `rel="noopener noreferrer"`
- [ ] 使用 `next/image` 优化图片
- [ ] 首屏图片添加 `priority` 属性
- [ ] 使用 `next/font` 引入字体
- [ ] 第三方脚本使用 `next/script` 并指定 `strategy`
- [ ] App Router 中使用 `next/navigation` 的 `useRouter`
- [ ] 使用 `Metadata` API 管理 SEO
- [ ] 客户端组件在顶部添加 `'use client'`

## 规范详情

详细规范请参阅同目录下的 [STANDARDS.md](STANDARDS.md)，包含：
- 每个规范条款的具体示例
- 推荐写法与错误写法的对比
- Tailwind CSS 专项规范
- SCSS/Sass 专项规范
- React Compiler 兼容规范
- TanStack Query 数据请求规范
