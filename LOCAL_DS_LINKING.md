# Local Design System Linking

本文档记录 linora（`:3001`）与 Liquid Glass Design System（`:5173`）之间的本地联动方案。

---

## 项目关系

| 项目 | 端口 | 路径 | 构建工具 |
|------|------|------|----------|
| Liquid Glass Design System（展示 app） | 5173 | `Wen's Project Liquid Glass Design System/` | Vite |
| Linora（消费方） | 3001 | `linora/` | Next.js 16 + Webpack |

**Source of truth**：`Wen's Project Liquid Glass Design System/packages/design-system/src/`

所有组件、token、样式的源码都在这个目录下。5173 的展示 app 和 3001 的 linora 都从这里读取。

---

## Symlink 机制

```
projects/
├── Wen's Project Liquid Glass Design System/   ← 源仓库
│   └── packages/design-system/src/             ← source of truth
├── wens-ds-link -> Wen's Project Liquid Glass Design System   ← symlink（绕过路径空格）
└── linora/
    └── package.json  →  "wens-liquid-glass-design-system": "file:../wens-ds-link/packages/design-system"
```

- `wens-ds-link` 是指向 `Wen's Project Liquid Glass Design System` 的 symlink，存在的原因是原目录名包含空格和特殊字符。
- linora 的 `package.json` 通过 `file:../wens-ds-link/packages/design-system` 引用 design system。
- 因为 `file:` 协议 + symlink，linora 直接读取 design system 的源文件（TypeScript + CSS），不走 npm 发布流程。

**为什么改 design system 会影响 linora**：两个项目读的是磁盘上同一份文件。改了 design system 的源码，linora 的 dev server 会自动检测到变化并热更新。

---

## 关键配置

### linora/next.config.ts

```ts
transpilePackages: ["wens-liquid-glass-design-system"],
```

Next.js 需要这行来编译 design system 的 TypeScript 源码（因为 `file:` 链接指向的是 `.ts` 文件，不是预编译的 `.js`）。

### linora/src/app/globals.css

```css
@import "tailwindcss";
@import "wens-liquid-glass-design-system/styles/tokens.css";

@source "../../../wens-ds-link/packages/design-system/src";

:root {
  /* Map design system tokens (used by Glass components) */
  --glass-bg-light: var(--lg-glass-bg-light);
  --glass-bg-medium: var(--lg-glass-bg-medium);
  --glass-bg-strong: var(--lg-glass-bg-strong);
  --glass-border: var(--lg-glass-border);
  --glass-shadow: var(--lg-glass-shadow);
  --status-success-light: var(--lg-status-success-light);
  --status-warning-light: var(--lg-status-warning-light);
  --status-error-light: var(--lg-status-error-light);
  --status-info-light: var(--lg-status-info-light);
}
```

---

## 修复过的三个关键问题

### 1. 含 hooks 的组件需要 `"use client"`

**问题**：`GlassSidebar.tsx` 和 `GlassToast.tsx` 使用了 `useState` 等 hooks，但没有标记 `"use client"`。Next.js 在 server component 中导入同一个包时会检测到 hooks 并报错。

**修复位置**：design system 源码
- `packages/design-system/src/components/ui/GlassSidebar.tsx` — 文件顶部加 `"use client";`
- `packages/design-system/src/components/ui/GlassToast.tsx` — 文件顶部加 `"use client";`

**规则**：design system 中任何使用 React hooks 的组件都必须在文件顶部声明 `"use client"`。

### 2. CSS token 前缀不匹配

**问题**：`tokens.css` 导出的变量使用 `--lg-` 前缀（如 `--lg-glass-border`），但组件源码中引用的是不带前缀的变量名（如 `--glass-border`）。

**修复位置**：`linora/src/app/globals.css` 中加了一组别名映射（见上方配置）。

**注意**：这是 design system 自身的命名不一致。长期应该统一 `tokens.css` 和组件中的变量名。

### 3. Tailwind v4 不扫描外部包源码

**问题**：Tailwind v4 默认只扫描项目自身的文件。design system 组件中的 Tailwind class（如 `bg-[var(--status-warning-light)]`）不会被生成到最终 CSS 中。

**修复位置**：`linora/src/app/globals.css` 中加了：

```css
@source "../../../wens-ds-link/packages/design-system/src";
```

这告诉 Tailwind 也扫描 design system 源码目录中的 class。

---

## 本地验证步骤

### 启动

```bash
# 终端 1 — design system 展示 app
cd "Wen's Project Liquid Glass Design System"
npm run dev
# → http://localhost:5173

# 终端 2 — linora
cd linora
npm run dev
# → http://localhost:3001
```

### 验证联动

1. 在 design system 中修改一个组件的样式（例如改 `GlassBadge.tsx` 的 `rounded-full` 为 `rounded-md`）
2. 保存文件
3. 观察 5173 和 3001 是否都自动更新
4. 确认后还原修改

### 验证 token 生效

打开浏览器 DevTools → Elements → 选中 badge 元素 → Computed Styles，检查 `background-color` 是否有值（不是 transparent）。

---

## 故障排查

| 现象 | 原因 | 解决 |
|------|------|------|
| `useState` 只能在 Client Component 中使用 | design system 中有组件用了 hooks 但没标 `"use client"` | 在对应组件文件顶部加 `"use client";` |
| 组件渲染了但没有颜色/样式 | CSS 变量未定义或 Tailwind 未扫描到 class | 检查 `globals.css` 中的 `@import tokens.css`、变量映射、`@source` 是否完整 |
| 改了 design system 但 linora 没更新 | dev server 缓存或 symlink 断了 | 重启 linora dev server；运行 `ls -la ../wens-ds-link` 确认 symlink 指向正确 |
| `Module not found: wens-liquid-glass-design-system` | `file:` 依赖没装好或 symlink 缺失 | 在 linora 目录运行 `npm install`；确认 `wens-ds-link` symlink 存在 |
| Tailwind class 不生效（组件在外部包中） | `@source` 路径不对 | 确认 `globals.css` 中 `@source` 指向 design system 的 `src/` 目录 |

### 重启命令

```bash
# 重启 linora（清缓存）
cd linora
rm -rf .next
npm run dev

# 重建 symlink（如果断了）
cd ~/Desktop/projects
ln -sf "Wen's Project Liquid Glass Design System" wens-ds-link

# 重装依赖
cd linora
rm -rf node_modules
npm install
```
