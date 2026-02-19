"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./PriceList.module.scss";

export default function PriceListPage() {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  return (
    <div className={styles.priceList}>
      <button className={styles.closeButton} onClick={handleClose}>
        ×
      </button>

      <div className={styles.card}>
        <h1 className={styles.title}>Cenník</h1>

        <div className={styles.items}>
          <div className={styles.item}>
            <span className={styles.name}>Mini girlanda (1,5 m)</span>
            <span className={styles.dots}></span>
            <span className={styles.price}>100 €</span>
          </div>
          <div className={styles.item}>
            <span className={styles.name}>Stredná girlanda (2 m)</span>
            <span className={styles.dots}></span>
            <span className={styles.price}>120 €</span>
          </div>
          <div className={styles.item}>
            <span className={styles.name}>Veľká girlanda (2,5 m)</span>
            <span className={styles.dots}></span>
            <span className={styles.price}>150 €</span>
          </div>
          <div className={styles.item}>
            <span className={styles.name}>Balónik s héliom (kus)</span>
            <span className={styles.dots}></span>
            <span className={styles.price}>5 €</span>
          </div>
        </div>

        <div className={styles.divider}></div>

        <p className={styles.note}>
          Ponúkame tiež špeciálne pozadia pre tematické oslavy, ostatné
          dekorácie a ďalšie individuálne prvky na mieru podľa vašich predstáv.
        </p>

        <p className={styles.cta}>Vypočítať cenu individuálnej výzdoby</p>

        <div className={styles.contact}>
          <a href="tel:+421950266320" className={styles.contactLink}>
            ☎ +421 (95) 026-63-20
          </a>
          <a
            href="https://www.instagram.com/baloon_party00"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contactLink}
          >
            <Image
              src="/images/icons/instagram.webp"
              alt="Instagram"
              width={28}
              height={28}
              className={styles.icon}
            />
            Balón Party00
          </a>
        </div>

        <div className={styles.qr}>
          <Image
            src="/images/icons/frame-removebg-preview.webp"
            alt="QR Code — Instagram"
            width={130}
            height={130}
          />
          <span>Naskenujte pre Instagram</span>
        </div>
      </div>
    </div>
  );
}
