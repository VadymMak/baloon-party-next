"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { LanguageProvider } from "@/context/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SideMenu from "@/components/SideMenu";

const LayoutClient: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const pathname = usePathname();
  const isPriceListPage = pathname === "/price-list";

  const toggleNav = () => setIsNavOpen(!isNavOpen);

  // Lock scroll when menu is open
  useEffect(() => {
    if (isNavOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isNavOpen]);

  return (
    <LanguageProvider>
      <div className="site-wrapper">
        {!isPriceListPage && <Header />}
        {!isPriceListPage && (
          <SideMenu isOpen={isNavOpen} toggleMenu={toggleNav} />
        )}
        <main>{children}</main>
        {!isPriceListPage && <Footer />}
      </div>
    </LanguageProvider>
  );
};

export default LayoutClient;
