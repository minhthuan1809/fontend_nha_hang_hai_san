"use client";
import React, { useEffect, useState, useCallback } from "react";
import SectionHearderHomepage from "./_sections/homepage/Hearder";
import { OverlayLoginStore, OverlayRegisterStore } from "@/app/store";
import TestimonialsSection from "./_sections/TestimonialsSection";
import FoodSaleSection from "./_sections/FoodSaleSection";
import GeneralIntroduction from "./_sections/GeneralIntroduction";
import SelectSection from "./_sections/SelectSection";
import NewSection from "./_sections/NewSection";
export default function Page() {
  const { setOverlayLogin } = OverlayLoginStore();
  const { setOverlayRegister } = OverlayRegisterStore();
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 0) {
      setOverlayLogin(false);
      setOverlayRegister(false);
    }

    setLastScrollY(currentScrollY);
  }, [lastScrollY, setOverlayLogin, setOverlayRegister]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div>
      <SectionHearderHomepage />
      {/* // menu */}
      <FoodSaleSection />

      {/* // Khách hàng nói gì về chúng tôi */}
      <TestimonialsSection />
      {/* // Lý do khách hàng chọn chúng tôi */}
      <SelectSection />
      {/* // Món mới */}
      <NewSection />
    </div>
  );
}
