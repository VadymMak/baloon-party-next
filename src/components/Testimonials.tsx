"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./Testimonials.module.scss";

const Testimonials: React.FC = () => {
  const { t } = useLanguage();

  const testimonials = [
    {
      id: 1,
      name: "Viktoriia Bieliaieva",
      feedback: t("testimonials.testimonial1"),
      picture: "/images/testempnials_nikolay.webp",
    },
    {
      id: 2,
      name: "Naděžda Javor",
      feedback: t("testimonials.testimonial2"),
      picture: "/images/testemonials_nadja.webp",
    },
    {
      id: 3,
      name: "Galina",
      feedback: t("testimonials.testimonial3"),
      picture: "/images/testemonials_market.webp",
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState<string>("");

  const openModal = (image: string) => {
    setModalImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage("");
  };

  return (
    <section className={styles.testimonials}>
      <h2>{t("testimonials.title")}</h2>
      <div className={styles.testimonialList}>
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className={styles.testimonialItem}>
            <Image
              src={testimonial.picture}
              alt={testimonial.name}
              width={90}
              height={90}
              onClick={() => openModal(testimonial.picture)}
            />
            <p className={styles.feedback}>
              &ldquo;{testimonial.feedback}&rdquo;
            </p>
            <p className={styles.name}>{testimonial.name}</p>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className={styles.modal} onClick={closeModal}>
          <div className={styles.modalContent}>
            <Image
              src={modalImage}
              alt="Full view"
              width={800}
              height={800}
              style={{
                width: "auto",
                height: "auto",
                maxHeight: "90vh",
                maxWidth: "90vw",
              }}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Testimonials;
