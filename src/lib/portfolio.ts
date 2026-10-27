import { getCollection } from 'astro:content';
export async function publishedProjects() {
  const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Shanghai' });
  return (await getCollection('projects', ({ data }) => !data.draft && data.publishedAt.toISOString().slice(0, 10) <= today))
    .sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf() || a.id.localeCompare(b.id));
}
