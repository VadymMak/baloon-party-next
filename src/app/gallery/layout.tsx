import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Galéria — Balón Party | Balónové dekorácie v Trenčíne",
  description:
    "Pozrite si galériu našich balónových dekorácií pre svadby, narodeniny, firemné akcie a špeciálne udalosti v Trenčíne.",
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
