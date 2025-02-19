"use client";

import { useEffect } from "react";

import { useCallback } from "react";

import { useState } from "react";
import {
  OverlayLoginStore,
  OverlayRegisterStore,
} from "../store/ZustandSStore";
import SectionHearderHomepage from "./_sections/homepage/Hearder";
import FoodSaleSection from "./_sections/FoodSaleSection";
import TestimonialsSection from "./_sections/TestimonialsSection";
import GeneralIntroduction from "./_sections/GeneralIntroduction";
import FixedProductComment from "../_shared/components/ui/FixedProductComment";
import SelectSection from "./_sections/SelectSection";
import NewSection from "./_sections/NewSection";
import BackToTop from "../_shared/components/ui/BackToTop";
import AdsHomePage from "../_shared/components/modals/AdsHomePage";
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
      {/* // Giới thiệu chung */}
      <GeneralIntroduction />
      {/* // Khách hàng nói gì về chúng tôi */}
      <TestimonialsSection />
      {/* // Lý do khách hàng chọn chúng tôi */}
      <SelectSection />
      {/* Tin tức */}
      <NewSection />
      <AdsHomePage />
    </div>
  );
}
