import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { getServerLanguage } from "@/lib/language";
import type { Metadata } from "next";
import styles from "./BlogPost.module.scss";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts("sk");
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const lang = await getServerLanguage();
  const post = getPostBySlug(slug, lang);
  if (!post) return { title: "Post nenájdený" };

  return {
    title: `${post.title} — Balón Party Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: [{ url: post.cover, width: 1200, height: 630 }],
      type: "article",
      publishedTime: post.date,
    },
    alternates: {
      canonical: `https://baloonparty.sk/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const lang = await getServerLanguage();
  const post = getPostBySlug(slug, lang);

  if (!post) notFound();

  const backLabel =
    lang === "ua"
      ? "← Назад до блогу"
      : lang === "en"
        ? "← Back to blog"
        : "← Späť na blog";
  const ctaTitle =
    lang === "ua"
      ? "Зацікавились оздобленням кулями?"
      : lang === "en"
        ? "Interested in balloon decorations?"
        : "Máte záujem o balónovú výzdobu?";
  const ctaText =
    lang === "ua"
      ? "Зв'яжіться з нами і ми підготуємо безкоштовну цінову пропозицію."
      : lang === "en"
        ? "Contact us and we'll prepare a free quote for you."
        : "Kontaktujte nás a pripravíme vám nezáväznú cenovú ponuku.";
  const ctaWhatsapp =
    lang === "ua"
      ? "Написати у WhatsApp"
      : lang === "en"
        ? "Message on WhatsApp"
        : "Napísať na WhatsApp";
  const ctaContacts =
    lang === "ua"
      ? "Усі контакти"
      : lang === "en"
        ? "All contacts"
        : "Všetky kontakty";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: `https://baloonparty.sk${post.cover}`,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: "Balón Party",
      url: "https://baloonparty.sk",
    },
  };

  return (
    <article className={styles.article}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className={styles.header}>
        <Link href="/blog" className={styles.backLink}>
          {backLabel}
        </Link>
        <div className={styles.meta}>
          <time>
            {new Date(post.date).toLocaleDateString(
              lang === "ua" ? "uk-UA" : lang === "en" ? "en-US" : "sk-SK",
            )}
          </time>
          <span>·</span>
          <span>{post.readingTime}</span>
        </div>
        <div className={styles.tags}>
          {post.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      </header>

      {post.cover && (
        <div className={styles.coverWrapper}>
          <Image
            src={post.cover}
            alt={post.title}
            width={1200}
            height={630}
            className={styles.cover}
            priority
          />
        </div>
      )}

      <div className={styles.content}>
        <ReactMarkdown
          components={{
            img: ({ src, alt }) => {
              if (!src || typeof src !== "string") return null;
              return (
                <figure className={styles.figure}>
                  <Image
                    src={src}
                    alt={alt || ""}
                    width={800}
                    height={500}
                    className={styles.contentImage}
                  />
                  {alt && <figcaption>{alt}</figcaption>}
                </figure>
              );
            },
            a: ({ href, children }) => {
              if (href?.startsWith("/")) {
                return (
                  <Link href={href} className={styles.internalLink}>
                    {children}
                  </Link>
                );
              }
              return (
                <a href={href} target="_blank" rel="noopener noreferrer">
                  {children}
                </a>
              );
            },
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>

      <footer className={styles.cta}>
        <h3>{ctaTitle}</h3>
        <p>{ctaText}</p>
        <div className={styles.ctaButtons}>
          <a href="https://wa.me/421950266320" className={styles.ctaPrimary}>
            {ctaWhatsapp}
          </a>
          <Link href="/contact" className={styles.ctaSecondary}>
            {ctaContacts}
          </Link>
        </div>
      </footer>
    </article>
  );
}
