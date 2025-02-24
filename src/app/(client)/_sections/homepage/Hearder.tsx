"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import Icon from "@/app/_shared/utils/Icon";
import { getSectionHeaderHero } from "@/app/_service/client/layout";
import Loading from "@/app/_shared/components/Loading";

export default function SectionHearderHomepage() {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [sliderData, setSliderData] = React.useState<any[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 10000);

    return () => clearInterval(timer);
  }, [sliderData]);

  useEffect(() => {
    const fetchHeroData = async () => {
      const response = await getSectionHeaderHero();
      if (response.ok) {
        setSliderData(response.data);
      }
      console.log(response);
    };
    fetchHeroData();
  }, []);

  if (sliderData.length === 0) {
    return <Loading />;
  }

  return (
    <>
      <div className="min-h-screen w-full bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />

        {/* Image Slider */}
        <div className="absolute inset-0">
          {sliderData.map((slide: any, index: number) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                currentSlide === index ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={slide.image_url}
                alt={`slide-${index}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="relative z-20 flex flex-col justify-center px-8 md:px-16 lg:px-24 w-full h-[calc(100vh-64px)]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white w-full ">
              {sliderData[currentSlide]?.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8">
              {sliderData[currentSlide]?.description}
            </p>
            <div className="flex gap-4">
              <Link
                href="/contact"
                className="px-6 py-3 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Liên hệ ngay
              </Link>
              <Link
                href="#food-sale"
                className="px-6 py-3 border border-white text-white rounded-lg font-medium hover:bg-white/10 transition-colors"
              >
                Xem thêm
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Slide Navigation */}
        <div className="absolute right-5 top-1/2 z-20 flex flex-col gap-3">
          {sliderData.map((_, i) => (
            <button
              key={i}
              className={`h-2 rounded-full transition-all ${
                currentSlide === i ? "w-3 h-3 bg-white" : "w-3 h-3 bg-white/50"
              }`}
              onClick={() => setCurrentSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Scroll Down */}
        <div className="absolute bottom-[6rem] left-[45%] lg:left-[50%] z-20 flex gap-3 border-4 border-white rounded-full p-2 animate-bounce">
          <Icon icon="ChevronDown" className="w-10 h-10 text-white" />
        </div>
      </div>
    </>
  );
}
