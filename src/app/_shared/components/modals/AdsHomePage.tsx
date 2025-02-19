"use client";
import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalBody, Button, Link } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function AdsHomePage() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      size="5xl"
      placement="center"
      className="max-w-[90vw] md:max-w-[70vw]">
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
            onClick={() => setIsOpen(false)}>
            ✕
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
