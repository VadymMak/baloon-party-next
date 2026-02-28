"use client";
import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./Footer.module.scss";

const socialLinks = [
  {
    icon: "/icons/instagram.webp",
    href: "https://www.instagram.com/baloon_party00",
    label: "Instagram",
  },
  {
    icon: "/icons/tiktok.webp",
    href: "https://www.tiktok.com/@baloon.party00",
    label: "TikTok",
  },
  {
    icon: "/icons/telegram.webp",
    href: "https://t.me/valeriiamukhina",
    label: "Telegram",
  },
  {
    icon: "/icons/whatsapp.webp",
    href: "https://wa.me/421950266320",
    label: "WhatsApp",
  },
  {
    icon: "/icons/facebook.webp",
    href: "https://www.facebook.com/share/15H6znYrTq/",
    label: "Facebook",
  },
];

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        {/* Contact info */}
        <div className={styles.contactRow}>
          <a
            href="mailto:baloon-party00@gmail.com"
            className={styles.contactLink}
          >
            <Image src="/icons/envelop.svg" alt="" width={28} height={28} />
            <span>baloon-party00@gmail.com</span>
          </a>
          <a href="tel:+421950266320" className={styles.contactLink}>
            <Image src="/icons/phone.webp" alt="" width={28} height={28} />
            <span>+421 (95) 026-63-20</span>
          </a>
        </div>

        {/* Social icons */}
        <div className={styles.socialRow}>
          {socialLinks.map(({ icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label={label}
            >
              <Image src={icon} alt={label} width={40} height={40} />
            </a>
          ))}
        </div>

        {/* Brand credit */}
        <p className={styles.brandCredit}>
          {t("footerDesignBy")}{" "}
          <a
            href="https://akillustrator.com"
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            Anastasiia Kolisnyk
          </a>
        </p>
        <p className={styles.copyright}>© 2024 Balónová párty</p>
      </div>
    </footer>
  );
};

export default Footer;
