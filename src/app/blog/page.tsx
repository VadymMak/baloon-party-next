import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/blog";
import { getServerLanguage } from "@/lib/language";
import styles from "./Blog.module.scss";

export const metadata = {
  title: "Blog — Balón Party",
  description: "Články o balónových dekoráciách, cenách a trendoch.",
};

export default async function BlogPage() {
  const lang = await getServerLanguage();
  const posts = getAllPosts(lang);

  return (
    <section className={styles.blog}>
      <h1 className={styles.title}>Blog</h1>
      <p className={styles.subtitle}>
        {lang === "ua"
          ? "Поради, натхнення та новини зі світу оздоблення кулями"
          : lang === "en"
            ? "Tips, inspiration and news from balloon decorations"
            : "Tipy, inšpirácia a novinky zo sveta balónových dekorácií"}
      </p>
      <div className={styles.grid}>
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className={styles.card}
          >
            <div className={styles.imageWrapper}>
              <Image
                src={post.cover}
                alt={post.title}
                width={600}
                height={400}
                className={styles.image}
              />
            </div>
            <div className={styles.cardContent}>
              <div className={styles.meta}>
                <time>
                  {new Date(post.date).toLocaleDateString(
                    lang === "ua" ? "uk-UA" : lang === "en" ? "en-US" : "sk-SK",
                  )}
                </time>
                <span>·</span>
                <span>{post.readingTime}</span>
              </div>
              <h2>{post.title}</h2>
              <p>{post.description}</p>
              <div className={styles.tags}>
                {post.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
