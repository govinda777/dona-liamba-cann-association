import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Try to find the blog directory
// If running from apps/frontend, it should be just 'blog'
// If running from root (e.g. some scripts), it might be 'apps/frontend/blog'
let postsDirectory = path.join(process.cwd(), 'blog');
if (!fs.existsSync(postsDirectory)) {
  const altPath = path.join(process.cwd(), 'apps/frontend/blog');
  if (fs.existsSync(altPath)) {
    postsDirectory = altPath;
  }
}

export interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
  author?: string;
  image?: string;
  content: string;
}

export function getPostSlugs() {
  if (!fs.existsSync(postsDirectory)) {
    console.warn(`Blog directory not found at: ${postsDirectory}`);
    return [];
  }
  return fs.readdirSync(postsDirectory).filter(file => file.endsWith('.md'));
}

export function getPostBySlug(slug: string): Post {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = path.join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug: realSlug,
    title: data.title,
    date: data.date,
    description: data.description,
    author: data.author,
    image: data.image,
    content: content,
  };
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
