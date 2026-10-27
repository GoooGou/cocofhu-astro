import { collection, config, fields } from '@keystatic/core';

export default config({
  storage: { kind: 'local' },
  ui: { brand: { name: '小岛编辑室' }, navigation: { 内容: ['posts', 'projects'] } },
  collections: {
    projects: collection({
      label: '作品集', slugField: 'title', path: 'src/content/projects/*', format: { contentField: 'content' },
      columns: ['title', 'draft'],
      schema: {
        title: fields.slug({ name: { label: '作品名称', validation: { isRequired: true } }, slug: { label: '作品地址', validation: { pattern: { regex: /^[a-z0-9]+(?:-[a-z0-9]+)*$/, message: '请使用英文小写、数字和短横线。' } } } }),
        excerpt: fields.text({ label: '作品简介', multiline: true, validation: { isRequired: true } }),
        publishedAt: fields.date({ label: '发布日期', defaultValue: { kind: 'today' }, validation: { isRequired: true } }),
        draft: fields.checkbox({ label: '草稿', defaultValue: true }),
        category: fields.select({ label: '分类', options: [{ label: '设计', value: 'design' }, { label: '开发', value: 'dev' }, { label: '随记', value: 'notes' }], defaultValue: 'design' }),
        tags: fields.array(fields.text({ label: '标签', validation: { isRequired: true } }), { label: '标签分类', itemLabel: props => props.value }),
        cover: fields.image({ label: '作品封面', directory: 'public/images/work', publicPath: '/images/work/' }),
        coverAlt: fields.text({ label: '封面描述' }),
        liveUrl: fields.text({ label: '访问作品', description: '填写站内地址（如 /blog/）或完整的 https:// 网址。', validation: { pattern: { regex: /^(?:\/(?!\/)|https:\/\/|$)/, message: '请使用站内 / 路径或 https:// 网址。' } } }),
        content: fields.markdoc({ label: '作品详情', options: { image: { directory: 'public/images/work', publicPath: '/images/work/' } } }),
      },
    }),
    posts: collection({
      label: '博客文章',
      slugField: 'title',
      path: 'src/content/posts/*',
      format: { contentField: 'content' },
      columns: ['title', 'publishedAt', 'draft'],
      schema: {
        title: fields.slug({
          name: { label: '标题', validation: { isRequired: true } },
          slug: { label: '文章地址', description: '使用英文、小写字母、数字和短横线，例如 hello-island。发布后建议保持不变。', validation: { pattern: { regex: /^[a-z0-9]+(?:-[a-z0-9]+)*$/, message: '请使用英文小写、数字和短横线。' } } },
        }),
        excerpt: fields.text({ label: '摘要', multiline: true, validation: { isRequired: true, length: { max: 200 } } }),
        publishedAt: fields.date({ label: '发布日期', defaultValue: { kind: 'today' }, validation: { isRequired: true } }),
        draft: fields.checkbox({ label: '保存为草稿', defaultValue: true, description: '草稿不会出现在公开列表、文章页面或 RSS 中。未来日期的文章会在该日期之后的下一次构建时发布。' }),
        category: fields.select({ label: '分类', options: [{ label: '设计', value: 'design' }, { label: '开发', value: 'dev' }, { label: '随记', value: 'notes' }], defaultValue: 'notes' }),
        tags: fields.array(fields.text({ label: '标签', validation: { isRequired: true } }), { label: '标签', itemLabel: props => props.value }),
        cover: fields.image({ label: '封面（可选）', directory: 'public/images/blog', publicPath: '/images/blog/' }),
        coverAlt: fields.text({ label: '封面描述', description: '描述图片的主要内容，帮助使用屏幕阅读器的读者。' }),
        content: fields.markdoc({ label: '正文', options: { image: { directory: 'public/images/blog', publicPath: '/images/blog/' } } }),
      },
    }),
  },
});
