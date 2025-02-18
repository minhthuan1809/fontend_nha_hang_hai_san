"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const images = [
  "http://dev.mypagevn.com/ganhhao/wp-content/uploads/2018/02/FOD0020_preview.jpeg",
  "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1",
  "https://images.unsplash.com/photo-1493246507139-91e8fad9978e",
  "https://images.unsplash.com/photo-1518623489648-a173ef7824f3"
];

export default function SectionHearderHomepage() {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>

<div className="min-h-screen w-full bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden">
  <div className="absolute inset-0 bg-black/40 z-10" />
  
  {/* Image Slider */}
  <div className="absolute inset-0">
    {images.map((image, index) => (
      <div
        key={index}
        className={`absolute inset-0 transition-opacity duration-1000 ${
          currentSlide === index ? "opacity-100" : "opacity-0"
        }`}
      >
        <Image
          src={image}
          alt={`slide-${index}`}
          fill
          className="object-cover"
          priority={index === 0}
        />
      </div>
    ))}
  </div>

  {/* Main Content */}
  <div className="relative z-20 flex flex-col justify-center px-8 md:px-16 lg:px-24 h-[calc(100vh-64px)]">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-2xl"
    >
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
        MINH THUẬN
      </h1>
      <p className="text-xl md:text-2xl text-gray-200 mb-8">
        Chào mừng bạn đến với nhà hàng của chúng tôi !
      </p>
      <div className="flex gap-4">
        <button className="px-6 py-3 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-colors">
          Liên hệ ngay
        </button>
        <button className="px-6 py-3 border border-white text-white rounded-lg font-medium hover:bg-white/10 transition-colors">
          Xem thêm
        </button>
      </div>
    </motion.div>
  </div>

  {/* Slide Navigation */}
  <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-3">
    {images.map((_, i) => (
      <button
        key={i}
        className={`h-2 rounded-full transition-all ${
          currentSlide === i ? "w-8 bg-white" : "w-2 bg-white/50"
        }`}
        onClick={() => setCurrentSlide(i)}
        aria-label={`Go to slide ${i + 1}`}
      />
    ))}
  </div>
</div>
</>
  );
}