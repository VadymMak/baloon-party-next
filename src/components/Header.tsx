"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import LanguageDropdown from "./LanguageDropdown";
import styles from "./Header.module.scss";

const Header: React.FC = () => {
  const pathname = usePathname();
  const { t } = useLanguage();
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const isPriceList = pathname === "/price-list";

  // Responsive check
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 800);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Hide on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          setHidden(
            currentScrollY > lastScrollY.current && currentScrollY > 100,
          );
          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  if (isPriceList) return null;

  const scrollToAbout = (e: React.MouseEvent) => {
    e.preventDefault();
    if (pathname !== "/") {
      window.location.href = "/#about";
    } else {
      document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div
        className={`${styles.headerOuter} ${hidden ? styles.headerHidden : ""}`}
      >
        <header className={styles.header}>
          <div className={styles.logoContainer}>
            <Link href="/">
              <Image
                src="/logo-new.svg"
                alt="Balón Party Logo"
                width={160}
                height={160}
                className={styles.logo}
                priority
              />
            </Link>
          </div>

          {!isMobile && (
            <nav className={styles.nav}>
              <Link href="/" className={styles.navLink}>
                {t("navHome")}
              </Link>
              <a
                href="#about"
                className={styles.navLink}
                onClick={scrollToAbout}
              >
                {t("navAbout")}
              </a>
              <Link href="/gallery" className={styles.navLink}>
                {t("navGallery")}
              </Link>
              <Link href="/contact" className={styles.navLink}>
                {t("navContact")}
              </Link>
            </nav>
          )}

          <LanguageDropdown />

          {isMobile && (
            <button
              className={styles.hamburger}
              onClick={() => setMenuOpen(true)}
            >
              ☰
            </button>
          )}
        </header>
      </div>
      {/* Mobile side menu */}
      {menuOpen && (
        <div className={styles.overlay} onClick={() => setMenuOpen(false)}>
          <nav className={styles.sideMenu} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.closeBtn}
              onClick={() => setMenuOpen(false)}
            >
              ×
            </button>
            <Link
              href="/"
              className={styles.sideLink}
              onClick={() => setMenuOpen(false)}
            >
              {t("navHome")}
            </Link>
            <a
              href="#about"
              className={styles.sideLink}
              onClick={(e) => {
                scrollToAbout(e);
                setMenuOpen(false);
              }}
            >
              {t("navAbout")}
            </a>
            <Link
              href="/gallery"
              className={styles.sideLink}
              onClick={() => setMenuOpen(false)}
            >
              {t("navGallery")}
            </Link>
            <Link
              href="/contact"
              className={styles.sideLink}
              onClick={() => setMenuOpen(false)}
            >
              {t("navContact")}
            </Link>
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;
