import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/blog";
import { getServerLanguage } from "@/lib/language";
import styles from "./BlogPreview.module.scss";

export default async function BlogPreview() {
  const lang = await getServerLanguage();
  const posts = getAllPosts(lang).slice(0, 3);

  if (posts.length === 0) return null;

  const sectionTitle = "Blog";
  const subtitle =
    lang === "ua"
      ? "Корисні поради та натхнення для вашого свята"
      : lang === "en"
        ? "Useful tips and inspiration for your celebration"
        : "Užitočné tipy a inšpirácia pre vašu oslavu";
  const viewAllText =
    lang === "ua"
      ? "Переглянути всі статті →"
      : lang === "en"
        ? "View all articles →"
        : "Zobraziť všetky články →";

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{sectionTitle}</h2>
      <p className={styles.subtitle}>{subtitle}</p>

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
                width={400}
                height={267}
                className={styles.image}
              />
            </div>
            <div className={styles.cardContent}>
              <time className={styles.date}>
                {new Date(post.date).toLocaleDateString(
                  lang === "ua" ? "uk-UA" : lang === "en" ? "en-US" : "sk-SK",
                )}
              </time>
              <h3>{post.title}</h3>
              <p>{post.description}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className={styles.viewAll}>
        <Link href="/blog" className={styles.viewAllLink}>
          {viewAllText}
        </Link>
      </div>
    </section>
  );
}
