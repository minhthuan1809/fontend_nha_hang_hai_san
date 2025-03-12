import React, { useState } from "react";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Spinner,
} from "@nextui-org/react";

interface ModalProps {
  img_url: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const Modal_detail_img_banner: React.FC<ModalProps> = ({
  img_url,
  isOpen,
  onOpenChange,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
      <ModalContent>
        <ModalHeader className="flex justify-center">
          Chi tiết hình ảnh
        </ModalHeader>
        <ModalBody className="flex items-center justify-center p-8">
          <div className="relative w-full aspect-video">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Spinner color="primary" size="lg" />
              </div>
            )}
            <img
              src={img_url}
              alt="Chi tiết banner"
              className="object-contain w-full h-full"
              loading="lazy"
              onLoad={() => setIsLoading(false)}
            />
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Modal_detail_img_banner;
