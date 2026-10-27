import { getCollection } from 'astro:content';

export const categories = { design: '设计', dev: '开发', notes: '随记' } as const;
export const dateLabel = (date: Date) => new Intl.DateTimeFormat('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Shanghai' }).format(date);
export async function publishedPosts() {
  const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Shanghai' });
  return (await getCollection('posts', ({ data }) => !data.draft && data.publishedAt.toISOString().slice(0, 10) <= today))
    .sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf() || a.id.localeCompare(b.id));
}
