"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./VideoSection.module.scss";

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

interface VideoSectionProps {
  urls: string[];
}

const VideoSection: React.FC<VideoSectionProps> = ({ urls }) => {
  const { t } = useLanguage();
  const [loadedIndexes, setLoadedIndexes] = useState<Set<number>>(new Set());
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const loadScript = useCallback(() => {
    if (
      scriptLoaded ||
      document.querySelector('script[src*="instagram.com/embed"]')
    ) {
      if (window.instgrm?.Embeds) {
        window.instgrm.Embeds.process();
      }
      return;
    }

    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    script.onload = () => {
      setScriptLoaded(true);
      if (window.instgrm?.Embeds) {
        window.instgrm.Embeds.process();
      }
    };
    document.body.appendChild(script);
  }, [scriptLoaded]);

  useEffect(() => {
    if (loadedIndexes.size > 0 && window.instgrm?.Embeds) {
      setTimeout(() => {
        window.instgrm?.Embeds.process();
      }, 100);
    }
  }, [loadedIndexes]);

  const handleLoadEmbed = (index: number) => {
    setLoadedIndexes((prev) => new Set(prev).add(index));
    loadScript();
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setLoadedIndexes(new Set(urls.map((_, i) => i)));
            loadScript();
            observer.disconnect();
          }
        });
      },
      { rootMargin: "200px" },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [loadScript, urls]);

  return (
    <section className={styles.videoSection} ref={sectionRef}>
      <h2>{t("watchOurWork")}</h2>
      <div className={styles.videoGrid}>
        {urls.map((url, index) => (
          <div key={index} className={styles.videoItem}>
            {loadedIndexes.has(index) ? (
              <blockquote
                className="instagram-media"
                data-instgrm-permalink={url}
                data-instgrm-version="14"
                style={{
                  maxWidth: "100%",
                  width: "100%",
                  margin: "0 auto",
                  border: "none",
                  boxShadow: "none",
                  padding: "0",
                }}
              >
                <a href={url} target="_blank" rel="noopener noreferrer">
                  View on Instagram
                </a>
              </blockquote>
            ) : (
              <button
                className={styles.placeholder}
                onClick={() => handleLoadEmbed(index)}
                aria-label="Load Instagram video"
              >
                <div className={styles.playIcon}>
                  <svg viewBox="0 0 24 24" width="48" height="48" fill="#fff">
                    <polygon points="5,3 19,12 5,21" />
                  </svg>
                </div>
                <span className={styles.loadText}>
                  {t("loadVideo", "Načítať video")}
                </span>
                <span className={styles.igBadge}>Instagram</span>
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default VideoSection;
