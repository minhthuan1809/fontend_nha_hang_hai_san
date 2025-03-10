"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import {
  OverlayLoginStore,
  OverlayRegisterStore,
} from "../store/ZustandSStore";
import SectionHearderHomepage from "./_sections/homepage/Hearder";
import FoodSaleSection from "./_sections/FoodSaleSection";
import TestimonialsSection from "./_sections/TestimonialsSection";
import GeneralIntroduction from "./_sections/GeneralIntroduction";
import SelectSection from "./_sections/SelectSection";
import NewSection from "./_sections/NewSection";
import AdsHomePage from "../_shared/components/modals/AdsHomePage";
import Loading from "../_shared/components/Loading";

export default function Page() {
  const { setOverlayLogin } = OverlayLoginStore();
  const { setOverlayRegister } = OverlayRegisterStore();
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

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
    setIsLoading(false);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Suspense fallback={<Loading />}>
      <div>
        <SectionHearderHomepage />
        {/* // menu */}
        <Suspense fallback={<Loading />}>
          <FoodSaleSection />
        </Suspense>
        {/* // Giới thiệu chung */}
        <Suspense fallback={<Loading />}>
          <GeneralIntroduction />
        </Suspense>
        {/* // Khách hàng nói gì về chúng tôi */}
        <TestimonialsSection />
        {/* // Lý do khách hàng chọn chúng tôi */}
        <SelectSection />
        {/* Tin tức */}
        <NewSection />
        {/* // quảng cáo */}
        <AdsHomePage />
      </div>
    </Suspense>
  );
}
