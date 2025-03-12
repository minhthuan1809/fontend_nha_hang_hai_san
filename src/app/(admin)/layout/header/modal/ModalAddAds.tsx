"use client";
import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import InputChangerImg from "@/app/_shared/components/ui/InputChangerImg";
import { addAd } from "@/app/_service/admin/ads";
import { getCookie } from "cookies-next";
import { enqueueSnackbar } from "notistack";
import { uploadImageToCloudinaryAddAds } from "@/app/_service/admin/upload_img_cloudinary";
const ModalAddAds = ({ isOpen, onClose, setRefresh }: any) => {
  const [selectedImage, setSelectedImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dataInput, setDataInput] = useState({
    title: "",
  });
  const token = getCookie("token");
  const handleAddAds = async () => {
    setIsLoading(true);
    const res = await uploadImageToCloudinaryAddAds(selectedImage);
    if (res.secure_url) {
      const data = {
        image_url: res.secure_url,
        title: dataInput.title,
        is_active: true,
      };
      const response = await addAd(data, token as string);

      if (response.ok) {
        setRefresh(true);
        onClose();
        enqueueSnackbar(response.message, {
          variant: "success",
        });
      } else {
        enqueueSnackbar(response.message, {
          variant: "error",
        });
      }
    } else {
      enqueueSnackbar("lỗi thêm hình ảnh", {
        variant: "error",
      });
    }
    setIsLoading(false);
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Thêm quảng cáo mới
              </ModalHeader>
              <ModalBody>
                <div className="w-full h-[30rem]">
                  <img
                    src={selectedImage}
                    className="w-full h-full object-cover"
                  />
                </div>
                <InputChangerImg
                  selectedImage={selectedImage}
                  isLoading={isLoading}
                  onChange={setSelectedImage}
                  dataInput={selectedImage}
                />

                <Input
                  label="Mô tả ( Nội dung này sẽ không được hiện thị )"
                  value={dataInput.title}
                  onChange={(e) =>
                    setDataInput({ ...dataInput, title: e.target.value })
                  }
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Hủy
                </Button>
                <Button color="primary" onPress={handleAddAds}>
                  Thêm
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalAddAds;
