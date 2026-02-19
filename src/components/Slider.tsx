"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./Slider.module.scss";

const images = [
  { id: 1, src: "/images/gallery/slide_1.webp", labelKey: "sliderBirthday" },
  { id: 2, src: "/images/gallery/slide_2.webp", labelKey: "sliderDecorations" },
  { id: 3, src: "/images/gallery/slide_3.webp", labelKey: "sliderChristening" },
  { id: 4, src: "/images/gallery/slide_4.webp", labelKey: "sliderFloral" },
  { id: 5, src: "/images/gallery/slide_5.webp", labelKey: "sliderHolidays" },
  { id: 6, src: "/images/gallery/slide_6.webp", labelKey: "sliderGift" },
];

const Slider: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState("");
  const [isPaused, setIsPaused] = useState(false);
  const { t } = useLanguage();

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  }, []);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  }, []);

  useEffect(() => {
    if (isPaused || isModalOpen) return;
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [isPaused, isModalOpen, nextSlide]);

  const getVisibleImages = () => {
    return [0, 1, 2].map(
      (offset) => images[(activeIndex + offset) % images.length],
    );
  };

  const openModal = (src: string) => {
    setModalImageSrc(src);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section
      className={styles.slider}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <h2>{t("ourProducts")}</h2>

      <div className={styles.sliderContainer}>
        <button
          className={`${styles.arrowButton} ${styles.arrowLeft}`}
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          &#8249;
        </button>

        <div className={styles.slideRow}>
          {getVisibleImages().map((image) => (
            <div
              key={image.id}
              className={styles.imageWrapper}
              onClick={() => openModal(image.src)}
            >
              <Image
                src={image.src}
                alt={t(image.labelKey)}
                width={400}
                height={250}
                className={styles.slideImage}
                loading="lazy"
              />
              <div className={styles.caption}>{t(image.labelKey)}</div>
            </div>
          ))}
        </div>

        <button
          className={`${styles.arrowButton} ${styles.arrowRight}`}
          onClick={nextSlide}
          aria-label="Next slide"
        >
          &#8250;
        </button>
      </div>

      {/* Dots */}
      <div className={styles.dots}>
        {images.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === activeIndex ? styles.dotActive : ""}`}
            onClick={() => setActiveIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className={styles.modal} onClick={closeModal}>
          <button className={styles.modalClose} onClick={closeModal}>
            &times;
          </button>
          <Image
            src={modalImageSrc}
            alt="Full screen view"
            width={1200}
            height={800}
            className={styles.modalImage}
          />
        </div>
      )}
    </section>
  );
};

export default Slider;
