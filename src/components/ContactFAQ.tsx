"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./ContactFAQ.module.scss";

const ContactFAQ: React.FC = () => {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAnswer = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqItems = [
    { question: t("faqItems.0.question"), answer: t("faqItems.0.answer") },
    { question: t("faqItems.1.question"), answer: t("faqItems.1.answer") },
    { question: t("faqItems.2.question"), answer: t("faqItems.2.answer") },
    { question: t("faqItems.3.question"), answer: t("faqItems.3.answer") },
    { question: t("faqItems.4.question"), answer: t("faqItems.4.answer") },
    { question: t("faqItems.5.question"), answer: t("faqItems.5.answer") },
    { question: t("faqItems.6.question"), answer: t("faqItems.6.answer") },
    { question: t("faqItems.7.question"), answer: t("faqItems.7.answer") },
  ];

  return (
    <div className={styles.contactFaq}>
      <h2 className={styles.title}>{t("faqTitle")}</h2>
      <div className={styles.faqList}>
        {faqItems.map((item, index) => (
          <div key={index} className={styles.faqItem}>
            <div
              className={styles.faqQuestion}
              onClick={() => toggleAnswer(index)}
            >
              <h3>{item.question}</h3>
              <span
                className={
                  activeIndex === index
                    ? `${styles.arrow} ${styles.arrowUp}`
                    : `${styles.arrow} ${styles.arrowDown}`
                }
              ></span>
            </div>
            {activeIndex === index && (
              <div className={styles.faqAnswer}>
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactFAQ;
