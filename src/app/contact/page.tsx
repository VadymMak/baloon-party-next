"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./Contact.module.scss";

const ContactPage: React.FC = () => {
  const { t, language } = useLanguage();

  const locationValue =
    language === "en"
      ? "Trenčín, Slovakia"
      : language === "ua"
        ? "Тренчін, Словаччина"
        : "Trenčín, Slovensko";

  return (
    <div className={styles.contactPage}>
      <div className={styles.content}>
        <h1>{t("contact.title")}</h1>
        <p className={styles.subtitle}>{t("contact.description")}</p>

        {/* Contact cards */}
        <div className={styles.cards}>
          <a href="tel:+421950266320" className={styles.card}>
            <span className={styles.cardIcon}>☎</span>
            <span className={styles.cardLabel}>{t("contact.phone")}</span>
            <span className={styles.cardValue}>+421 (95) 026-63-20</span>
          </a>

          <a href="mailto:baloon-party00@gmail.com" className={styles.card}>
            <span className={styles.cardIcon}>✉</span>
            <span className={styles.cardLabel}>Email</span>
            <span className={styles.cardValue}>baloon-party00@gmail.com</span>
          </a>

          <div className={styles.card}>
            <span className={styles.cardIcon}>🕐</span>
            <span className={styles.cardLabel}>{t("contact.hours")}</span>
            <span className={styles.cardValue}>{t("contact.hoursValue")}</span>
          </div>

          <div className={styles.card}>
            <span className={styles.cardIcon}>📍</span>
            <span className={styles.cardLabel}>{t("contact.location")}</span>
            <span className={styles.cardValue}>{locationValue}</span>
          </div>
        </div>

        {/* Messengers */}
        <h2>{t("contact.writeUs")}</h2>
        <div className={styles.messengers}>
          <a
            href="https://www.instagram.com/baloon_party00"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.messengerBtn}
          >
            <Image
              src="/icons/instagram.webp"
              alt="Instagram"
              width={32}
              height={32}
            />
            <span>Instagram</span>
          </a>
          <a
            href="https://wa.me/421950266320"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.messengerBtn}
          >
            <Image
              src="/icons/whatsapp.webp"
              alt="WhatsApp"
              width={32}
              height={32}
            />
            <span>WhatsApp</span>
          </a>
          <a
            href="https://t.me/valeriiamukhina"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.messengerBtn}
          >
            <Image
              src="/icons/telegram.webp"
              alt="Telegram"
              width={32}
              height={32}
            />
            <span>Telegram</span>
          </a>
          <a
            href="https://www.facebook.com/share/15H6znYrTq/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.messengerBtn}
          >
            <Image
              src="/icons/facebook.webp"
              alt="Facebook"
              width={32}
              height={32}
            />
            <span>Facebook</span>
          </a>
        </div>

        {/* QR Code */}
        <div className={styles.qrSection}>
          <Image
            src="/icons/frame-removebg-preview.webp"
            alt="QR Code — Instagram Balón Party"
            width={160}
            height={160}
          />
          <span>{t("contact.scanQR")}</span>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
