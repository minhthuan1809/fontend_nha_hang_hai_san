import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
} from "@nextui-org/react";
import Icon from "@/app/_shared/utils/Icon";
import InputChangerImg from "@/app/_shared/components/ui/InputChangerImg";

interface ModalAddImgProps {
  isOpen: boolean;
  onClose: () => void;
  table: string;
  data: any;
  setData: (data: any) => void;
  addNew: () => void;
  isLoading: boolean;
}

export default function ModalAddImg({
  isOpen,
  onClose,
  table,
  data,
  setData,
  addNew,
  isLoading,
}: ModalAddImgProps) {
  const setDataNew = (data: any) => {
    setData({
      title: data.title,
      description: data.description,
      image_url: data.image_url,
    });
  };

  const handleClose = async () => {
    setData({
      title: "",
      description: "",
      image_url: "",
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="2xl">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Thêm hình ảnh mới
        </ModalHeader>
        <ModalBody>
          <div className="space-y-4">
            <div className="relative w-full aspect-video bg-gray-100 rounded-lg overflow-hidden">
              {data?.image_url ? (
                <img
                  src={data?.image_url || ""}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <Icon icon="Image" className="w-12 h-12 text-gray-400" />
                </div>
              )}
            </div>

            <InputChangerImg
              selectedImage={data?.image_url || ""}
              isLoading={isLoading}
              onChange={(value) => setDataNew({ ...data, image_url: value })}
              dataInput={data?.image_url || ""}
            />

            <Input
              name="title"
              label={`${table}`}
              placeholder={`Nhập ${table}`}
              value={data?.title || ""}
              onChange={(e) => setDataNew({ ...data, title: e.target.value })}
              variant="bordered"
            />

            <Textarea
              name="description"
              label="Mô tả"
              placeholder="Nhập mô tả"
              value={data?.description || ""}
              onChange={(e) =>
                setDataNew({ ...data, description: e.target.value })
              }
              variant="bordered"
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Hủy
          </Button>
          <Button
            color="primary"
            isLoading={isLoading}
            onPress={addNew}
            disabled={isLoading}
          >
            Thêm mới
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
