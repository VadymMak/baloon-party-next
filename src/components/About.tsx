"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./About.module.scss";

const About: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className={styles.about}>
      <h2 className={styles.title}>{t("aboutUs")}</h2>

      <div className={styles.grid}>
        <div className={styles.imageWrap}>
          <Image
            src="/images/about-us-upd.webp"
            alt="Balón Party dekorácie"
            width={600}
            height={400}
            className={styles.image}
            loading="lazy"
          />
        </div>

        <div className={styles.text}>
          <p>{t("aboutUsIntroduction")}</p>
          <p>{t("aboutUsGoal")}</p>
          <p>{t("aboutUsSpecialEvents")}</p>
          <p>{t("aboutUsProposition")}</p>
          <p className={styles.thanks}>{t("aboutUsThanks")}</p>
        </div>
      </div>
    </section>
  );
};

export default About;
