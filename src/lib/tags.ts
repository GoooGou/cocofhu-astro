import { categories } from './blog';
type Entry = { data: { category: keyof typeof categories; tags: string[] } };
export const entryTags = (entry: Entry) => [...new Set([categories[entry.data.category], ...entry.data.tags.map(tag => tag.trim()).filter(Boolean)])];
export const tagHref = (section: 'blog' | 'portfolio', tag: string) => `/${section}/tags/${encodeURIComponent(tag)}/`;
export const tagIndex = (entries: Entry[]) => [...new Set(entries.flatMap(entryTags))].map(tag => ({ tag, count: entries.filter(entry => entryTags(entry).includes(tag)).length }));
