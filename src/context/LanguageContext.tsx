"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string, fallback?: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "sk",
  setLanguage: () => {},
  t: (key: string) => key,
});

import sk from "@/i18n/sk.json";
import ua from "@/i18n/ua.json";
import en from "@/i18n/en.json";

const translations: Record<string, Record<string, unknown>> = { sk, ua, en };

function getNestedValue(obj: Record<string, unknown>, path: string): string {
  const keys = path.split(".");
  let current: unknown = obj;

  for (const key of keys) {
    if (
      current &&
      typeof current === "object" &&
      key in (current as Record<string, unknown>)
    ) {
      current = (current as Record<string, unknown>)[key];
    } else {
      return path;
    }
  }

  return typeof current === "string" ? current : path;
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();

  // Always start with "sk" — matches server render, prevents hydration mismatch
  const [language, setLanguageState] = useState("sk");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("baloon-party-language");
    if (saved && translations[saved]) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLanguageState(saved);
      document.documentElement.lang = saved === "ua" ? "uk" : saved;
    }
    setMounted(true);
  }, []);

  // Update html lang attribute when language changes (after mount)
  useEffect(() => {
    if (mounted) {
      document.documentElement.lang = language === "ua" ? "uk" : language;
    }
  }, [language, mounted]);

  const setLanguage = useCallback(
    (lang: string) => {
      setLanguageState(lang);
      localStorage.setItem("baloon-party-language", lang);
      document.cookie = `lang=${lang}; path=/; max-age=31536000`;
      document.documentElement.lang = lang === "ua" ? "uk" : lang;
      router.refresh();
    },
    [router],
  );

  const t = useCallback(
    (key: string, fallback?: string): string => {
      const dict = translations[language] || translations.sk;
      const value = getNestedValue(dict as Record<string, unknown>, key);
      return value !== key ? value : fallback || key;
    },
    [language],
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
