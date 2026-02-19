import fs from "fs";
import path from "path";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  cover: string;
  tags: string[];
  readingTime: string;
  content: string;
}

export interface BlogMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  cover: string;
  tags: string[];
  readingTime: string;
}

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

function parseFrontmatter(raw: string): {
  meta: Record<string, string>;
  content: string;
} {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { meta: {}, content: raw };

  const meta: Record<string, string> = {};
  match[1].split("\n").forEach((line) => {
    const idx = line.indexOf(":");
    if (idx > 0) {
      const key = line.slice(0, idx).trim();
      let value = line.slice(idx + 1).trim();
      // Remove quotes
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      meta[key] = value;
    }
  });

  return { meta, content: match[2].trim() };
}

function estimateReadingTime(text: string): string {
  const words = text.split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min`;
}

export function getPostBySlug(
  slug: string,
  lang: string = "sk",
): BlogPost | null {
  const filePath = path.join(BLOG_DIR, slug, `${lang}.md`);

  if (!fs.existsSync(filePath)) {
    // Fallback to Slovak
    const fallback = path.join(BLOG_DIR, slug, "sk.md");
    if (!fs.existsSync(fallback)) return null;
    return getPostBySlug(slug, "sk");
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  const { meta, content } = parseFrontmatter(raw);

  return {
    slug,
    title: meta.title || slug,
    description: meta.description || "",
    date: meta.date || "",
    cover: meta.cover || `/images/blog/${slug}/cover.webp`,
    tags: meta.tags ? meta.tags.split(",").map((t) => t.trim()) : [],
    readingTime: estimateReadingTime(content),
    content,
  };
}

export function getAllPosts(lang: string = "sk"): BlogMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const slugs = fs.readdirSync(BLOG_DIR).filter((name) => {
    const fullPath = path.join(BLOG_DIR, name);
    return fs.statSync(fullPath).isDirectory();
  });

  const posts = slugs
    .map((slug) => {
      const post = getPostBySlug(slug, lang);
      if (!post) return null;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { content: _, ...meta } = post;
      return meta;
    })
    .filter(Boolean) as BlogMeta[];

  // Sort by date, newest first
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}
