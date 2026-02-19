import type { Metadata } from "next";
import Script from "next/script";
import LayoutClient from "@/components/LayoutClient";
import "@/styles/globals.scss";

export const metadata: Metadata = {
  title: "Balón Party — Balónové dekorácie a party služby v Trenčíne",
  description:
    "Sme profesionálna dekoratérska služba v Trenčíne, ktorá vytvára nezabudnuteľné fotosteny a dekorácie pre svadby, narodeninové oslavy, firemné akcie a špeciálne udalosti.",
  keywords:
    "Trenčín, dekorácie, balóny, fotosteny, svadby, narodeniny, firemné akcie, oslavy, party dekorácie",
  authors: [{ name: "Balón Party" }],
  openGraph: {
    title: "Balón Party — Balónové dekorácie v Trenčíne",
    description:
      "Vytvárame jedinečné dekorácie a fotosteny pre nezabudnuteľné chvíle a oslavy po celom Slovensku.",
    url: "https://baloon-party00.sk",
    siteName: "Balón Party",
    images: [
      {
        url: "https://baloon-party00.sk/images/my-photo-wall.webp",
        width: 1200,
        height: 800,
        alt: "Balón Party dekorácie",
      },
    ],
    locale: "sk_SK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Balón Party — Balónové dekorácie v Trenčíne",
    description:
      "Vytvárame jedinečné dekorácie a fotosteny pre nezabudnuteľné chvíle a oslavy.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sk">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-NQD51SRKL0"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-NQD51SRKL0');
          `}
        </Script>
      </head>
      <body>
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
