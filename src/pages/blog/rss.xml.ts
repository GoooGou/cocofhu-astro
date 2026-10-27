import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { publishedPosts } from '../../lib/blog';
export async function GET(context: APIContext) {
  return rss({ title: '小岛手记', description: '关于设计、代码，以及做东西时留下的小小记录。', site: context.site!, items: (await publishedPosts()).map(post => ({ title: post.data.title, description: post.data.excerpt, pubDate: post.data.publishedAt, link: `/blog/${post.id}/` })), customData: '<language>zh-cn</language>' });
}
