# cocofhu Astro 复刻 + 小岛手记

Astro 7 + React 19 + `animal-island-ui`，以 cocofhu.com 为首页视觉与交互参考。新增静态博客和本地 Keystatic 内容管理。

## 启动

要求 Node.js >= 22.23.4（本项目使用 Node 24 验证）。在本目录执行：

```sh
npm install
npm run dev
```

- 首页：http://127.0.0.1:4321/
- 博客：http://127.0.0.1:4321/blog/
- 作品集：http://127.0.0.1:4321/portfolio/
- 内容管理：http://127.0.0.1:4321/keystatic
- RSS：http://127.0.0.1:4321/blog/rss.xml

Windows PowerShell 如果阻止 npm.ps1，请使用 `npm.cmd`。若 Astro 提示同项目服务已经运行，可直接打开上面的地址，或使用 `npm run dev -- --force` 重启。

## 写文章

1. 启动开发服务，在 `/keystatic` 进入「博客文章」。
2. 新建文章，填写标题、英文文章地址（如 `my-first-note`）、摘要、日期和正文。可选分类、标签、封面与图片描述。
3. 新文章默认勾选「保存为草稿」。草稿和未来日期文章不会出现在公开列表、文章路由和 RSS 中。
4. 取消草稿勾选并保存后，在本地博客查看。文件变更后的内容索引可能需要一两秒更新。
5. 执行 `npm run build` 并重新部署 `dist/`，线上才会更新。未来日期文章也需要在到期后重新构建，不是后台自动定时发布。

正文支持标题、列表、引用、代码块、表格、链接和图片。内容存储于 `src/content/posts/*.mdoc`；封面和正文图片存储于 `public/images/blog/`，可随源码一同版本管理。发布后的文章地址建议保持不变。

**管理模式：本地 Keystatic。** `npm run dev` 提供编辑器和文件写入 API；生产构建主动移除两者，只生成静态页面。线上 `/keystatic` 不提供编辑功能。若以后需要在线协作编辑，应另行配置 Keystatic GitHub storage、身份认证和支持服务端 API 的部署环境。

附带三篇明确标注的示例文章，演示排版与分类，可以从编辑器替换或删除。它们不是原站作者的真实博客内容。

## 作品集与标签分类

首页导航已加入「Blog」「作品集」，手机上也保留这两个入口。列表页、文章页和作品详情中的分类、标签均可点击，进入独立的分类地址，支持复制分享和无脚本访问：

- `/blog/tags/Astro/`：对应的博客文章。
- `/portfolio/tags/Astro/`：对应的作品。
- 中文标签同样支持，标签旁显示匹配数量，当前分类会高亮。

在 Keystatic 的「作品集」中管理作品名称、简介、分类、标签、封面、详情和访问地址。作品文件位于 `src/content/projects/`，图片位于 `public/images/work/`。现有两件作品为本次实际实现的首页复刻和博客系统，封面来自实际页面截图。博客与作品各自分类，互不混入。

## 构建和验证

```sh
npm run build
npm run preview
npm run test:browser
npm run test:blog
npm run test:navigation
```

浏览器测试需先启动开发服务，默认使用 Windows Chrome。其他系统设置 `CHROME_PATH` 为本机 Chrome 路径；可通过 `TEST_URL` 指向其他本地地址。博客测试会通过 Keystatic 创建、编辑、上传封面和删除唯一命名的临时文章，结束后清理自己的测试文件。

`scripts/astro.mjs` 统一关闭遥测，并在构建时排除本地管理功能。`astro.config.mjs` 的 `site` 用于 canonical 和 RSS；迁移域名时要同步修改。

## 项目结构

```text
src/components/        首页与真实 Animal Island UI 包装组件
src/styles/            复刻样式、可用性修正、博客样式
src/pages/blog/        博客列表、文章和 RSS
src/content/posts/     Keystatic 管理的 Markdoc 内容
src/content.config.ts Astro 内容校验
keystatic.config.ts    编辑器字段与本地存储设置
qa/                    浏览器测试结果、视觉对比、Hallmark 报告
```

`scripts/migrate-reference.mjs` 和 `scripts/polish-reference.mjs` 是最初迁移用的一次性脚本，正常开发不要重新执行，以免覆盖后续修正。

## 视觉与质检

首页保留原站的纸片字、波点背景、猫咪形态、胶带、注释、语言切换和预告函交互；补充键盘焦点、减少动画、无脚本内容和暂停动画支持。按后续要求，首页导航增加 Blog 与作品集入口；原首屏几何对比记录保留为添加导航之前的基线。

按用户确认，原站视觉优先。Hallmark 检查已经运行，但原站装饰标签、拼贴字体等与其严格风格规则冲突，**不是 Hallmark 零告警通过**。详见 [质检与取舍记录](qa/HALLMARK.md)、[参考站审计](qa/reference-audit.md) 和 [来源说明](THIRD_PARTY_NOTICES.md)。

当前托管配置位于 `.openai/hosting.json`，部署目录为 `dist`；默认保持站点仅本人可见。
