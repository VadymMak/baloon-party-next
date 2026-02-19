"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./Hero.module.scss";

const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className={styles.hero}>
      <Image
        src="/images/my-photo-wall.webp"
        alt="Balónové dekorácie"
        fill
        priority
        className={styles.bgImage}
        sizes="100vw"
      />
      <div className={styles.overlay} />
      <div className={styles.content}>
        <h1>{t("greeting")}</h1>
        <p className={styles.subtitle}>{t("partyPlace")}</p>
        <div className={styles.cta}>
          <Link href="/contact" className={styles.ctaPrimary}>
            {t("heroCta")}
          </Link>
          <Link href="/gallery" className={styles.ctaSecondary}>
            {t("heroCtaGallery")}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
