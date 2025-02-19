"use client";
import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  Button,
  Link,
} from "@nextui-org/react";

export default function AdsHomePage() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const lastShownTime = sessionStorage.getItem("adsLastShown");
    const currentTime = new Date().getTime();

    if (
      !lastShownTime ||
      currentTime - parseInt(lastShownTime) > 15 * 60 * 1000
    ) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem("adsLastShown", currentTime.toString());
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      size="5xl"
      placement="center"
      className="max-w-[90vw] md:max-w-[70vw]"
    >
      <ModalContent>
        <ModalBody className="p-0 relative">
          <Link href="/products" className="w-full h-[20vh] md:h-[80vh]">
            <img
              src="https://file.hstatic.net/1000030244/file/1320_b97e8e4923474f60821f792ee5a74bae_2048x2048.jpg"
              alt="Advertisement"
              className="w-full h-full object-contain md:object-cover"
            />
          </Link>

          <Button
            isIconOnly
            className="absolute top-2 right-2 md:top-4 md:right-4 bg-white/50 "
            radius="full"
            size="sm"
            onClick={handleClose}
          >
            ✕
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
