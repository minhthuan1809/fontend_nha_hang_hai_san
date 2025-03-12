"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  Button,
  Link,
} from "@nextui-org/react";
import { getAds } from "@/app/_service/client/layout";

interface Ad {
  id: string;
  title: string;
  image_url: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export default function AdsHomePage() {
  const [isOpen, setIsOpen] = useState(false);
  const [ads, setAds] = useState<Ad[]>([]);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await getAds();
        if (res.ok && res.data) {
          const activeAds = res.data.filter((ad: Ad) => ad.is_active);
          setAds(activeAds);
          // Chọn ngẫu nhiên một quảng cáo khi lấy dữ liệu
          const randomIndex = Math.floor(Math.random() * activeAds.length);
          setCurrentAdIndex(randomIndex);
        }
      } catch (error) {
        console.error("Lỗi khi tải quảng cáo:", error);
      }
    };

    fetchAds();
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (ads.length === 0) return;

    const lastShownTime = sessionStorage.getItem("adsLastShown");
    const currentTime = new Date().getTime();

    if (
      !lastShownTime ||
      currentTime - parseInt(lastShownTime) > 15 * 60 * 1000
    ) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem("adsLastShown", currentTime.toString());
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [ads]);

  // Hàm chuyển đổi quảng cáo tiếp theo
  const showNextAd = useCallback(() => {
    setCurrentAdIndex((prevIndex) => (prevIndex + 1) % ads.length);
  }, [ads.length]);

  // Tự động chuyển đổi quảng cáo mỗi 5 giây
  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(showNextAd, 5000);
    return () => clearInterval(interval);
  }, [isOpen, showNextAd]);

  if (!ads.length) return null;

  const currentAd = ads[currentAdIndex];
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size={isMobile ? "lg" : "5xl"}
      placement="center"
      hideCloseButton
      className="max-w-[95vw] md:max-w-[75vw]"
    >
      <ModalContent>
        <ModalBody className="p-0 relative">
          <Link href="/products" className="block w-full">
            <img
              src={currentAd.image_url}
              alt={currentAd.title}
              className="w-full object-contain md:object-cover"
              style={{
                height: isMobile ? "auto" : "80vh",
                maxHeight: isMobile ? "70vh" : "80vh",
              }}
              loading="eager"
            />
          </Link>

          <Button
            isIconOnly
            className="absolute top-2 right-2 md:top-4 md:right-4 bg-white/50 backdrop-blur-sm z-10"
            radius="full"
            size={isMobile ? "sm" : "md"}
            onClick={handleClose}
            aria-label="Đóng quảng cáo"
          >
            ✕
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
