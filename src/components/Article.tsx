"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./Article.module.scss";

interface IArticle {
  titleKey: string;
  descriptionKey: string;
  imageSrc: string;
  imageAltKey: string;
  imageLeft: boolean;
  googleMapLink?: string;
  googleMapLabel?: string;
}

const articles: IArticle[] = [
  {
    titleKey: "christmas_celebration_title",
    descriptionKey: "christmas_celebration_description",
    imageSrc: "/images/article_1.webp",
    imageAltKey: "christmas_celebration_title",
    imageLeft: false,
  },
  {
    titleKey: "dia_de_los_muertos_celebration_title",
    descriptionKey: "dia_de_los_muertos_celebration_description",
    imageSrc: "/images/article_2.webp",
    imageAltKey: "dia_de_los_muertos_celebration_title",
    imageLeft: true,
    googleMapLink: "https://maps.app.goo.gl/ReNMpKffxdto3GGf9",
    googleMapLabel: "articleFindOnMap",
  },
  {
    titleKey: "halloween_party_celebration_title",
    descriptionKey: "halloween_party_celebration_description",
    imageSrc: "/images/article_3.webp",
    imageAltKey: "halloween_party_celebration_title",
    imageLeft: false,
  },
];

const Article: React.FC = () => {
  const { t } = useLanguage();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className={styles.articles}>
      <h2 className={styles.sectionTitle}>{t("ourArticlesTitle")}</h2>

      <div className={styles.grid}>
        {articles.map((article, index) => (
          <article key={index} className={styles.card}>
            <div className={styles.imageContainer}>
              <Image
                src={article.imageSrc}
                alt={t(article.imageAltKey)}
                width={400}
                height={533}
                className={styles.image}
                loading="lazy"
              />
            </div>
            <div className={styles.cardContent}>
              <h3>{t(article.titleKey)}</h3>
              <p
                className={
                  expandedIndex === index ? styles.expanded : styles.collapsed
                }
              >
                {t(article.descriptionKey)}
              </p>
              <button
                className={styles.readMore}
                onClick={() => toggleExpand(index)}
              >
                {expandedIndex === index
                  ? t("articleReadLess")
                  : t("articleReadMore")}
              </button>
              {article.googleMapLink && (
                <a
                  href={article.googleMapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.mapLink}
                >
                  📍 {t(article.googleMapLabel || "")}
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Article;
