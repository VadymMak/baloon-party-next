import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cenník — Balón Party | Balónové dekorácie v Trenčíne",
  description:
    "Cenník balónových dekorácií. Girlandy od 100€, heliové balóniky 5€/kus.",
};

export default function PriceListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
