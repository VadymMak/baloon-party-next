"use client";

import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./LanguageDropdown.module.scss";

const languages = [
  { code: "sk", label: "Slovenský", flag: "/icons/sk.svg" },
  { code: "ua", label: "Українська", flag: "/icons/ua.svg" },
];

const LanguageDropdown: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = languages.find((l) => l.code === language) || languages[0];

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className={styles.dropdown} ref={ref}>
      <button className={styles.toggle} onClick={() => setOpen(!open)}>
        <img
          src={current.flag}
          alt={current.label}
          width={20}
          height={15}
          className={styles.flag}
        />
        <span className={styles.code}>{current.code}</span>
      </button>

      {open && (
        <div className={styles.menu}>
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`${styles.option} ${lang.code === language ? styles.active : ""}`}
              onClick={() => {
                setLanguage(lang.code);
                setOpen(false);
              }}
            >
              <img
                src={lang.flag}
                alt={lang.label}
                width={20}
                height={15}
                className={styles.flag}
              />
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageDropdown;
