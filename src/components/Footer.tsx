"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import InstagramIcon from "@/assets/svg/InstagramIcon";
import TikTok from "@/assets/svg/TikTok";
import Telegram from "@/assets/svg/Telegram";
import WhatsApp from "@/assets/svg/WhatsApp";
import FacebookIcon from "@/assets/svg/FacebookIcon";
import EnvelopIcon from "@/assets/svg/EnvelopIcon";
import PhoneIcon from "@/assets/svg/PhoneIcon";
import styles from "./Footer.module.scss";

const socialLinks = [
  {
    Icon: InstagramIcon,
    href: "https://www.instagram.com/baloon_party00",
    label: "Instagram",
  },
  {
    Icon: TikTok,
    href: "https://www.tiktok.com/@baloon.party00",
    label: "TikTok",
  },
  { Icon: Telegram, href: "https://t.me/valeriiamukhina", label: "Telegram" },
  { Icon: WhatsApp, href: "https://wa.me/421950266320", label: "WhatsApp" },
  {
    Icon: FacebookIcon,
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
            <EnvelopIcon width={28} height={28} />
            <span>baloon-party00@gmail.com</span>
          </a>
          <a href="tel:+421950266320" className={styles.contactLink}>
            <PhoneIcon width={28} height={28} />
            <span>+421 (95) 026-63-20</span>
          </a>
        </div>

        {/* Social icons */}
        <div className={styles.socialRow}>
          {socialLinks.map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label={label}
            >
              <Icon width={40} height={40} />
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
