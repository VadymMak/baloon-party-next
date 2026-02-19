import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakty — Balón Party | Balónové dekorácie v Trenčíne",
  description:
    "Kontaktujte nás pre balónové dekorácie v Trenčíne. Telefón, email, Instagram, WhatsApp, Telegram, TikTok, Facebook.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
