"use client";

import React from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./SideMenu.module.scss";

interface SideMenuProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ isOpen, toggleMenu }) => {
  const { t } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();

  const scrollToAbout = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleMenu();
    if (pathname !== "/") {
      router.push("/");
      setTimeout(() => {
        document
          .getElementById("about")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {isOpen && <div className={styles.backdrop} onClick={toggleMenu}></div>}
      <div className={`${styles.sideMenu} ${isOpen ? styles.open : ""}`}>
        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink} onClick={toggleMenu}>
            {t("navHome")}
          </Link>
          <a href="#about" className={styles.navLink} onClick={scrollToAbout}>
            {t("navAbout")}
          </a>
          <Link href="/gallery" className={styles.navLink} onClick={toggleMenu}>
            {t("navGallery")}
          </Link>
          <Link href="/contact" className={styles.navLink} onClick={toggleMenu}>
            {t("navContact")}
          </Link>
        </nav>
      </div>
    </>
  );
};

export default SideMenu;
