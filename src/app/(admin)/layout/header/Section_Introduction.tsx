"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Textarea,
} from "@nextui-org/react";
import { enqueueSnackbar } from "notistack";
import Icon from "@/app/_shared/utils/Icon";
import InputChangerImg from "@/app/_shared/components/ui/InputChangerImg";
import { uploadImageToCloudinary } from "@/app/_service/admin/upload_img_cloudinary";
import Modal_detail_img_banner from "./modal/Modal_detail_img_banner";
import { getIntroduction } from "@/app/_service/client/layout";
import Loading from "@/app/_shared/components/Loading";
import { updateIntroduction } from "@/app/_service/admin/home";
import { getCookie } from "cookies-next";

export default function Section_Introduction() {
  const token = getCookie("token");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [imageUrl, setImageUrl] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getIntroduction();
        setFormData(data.data[0]);
      } catch (error) {
        enqueueSnackbar("Lỗi khi tải dữ liệu", { variant: "error" });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (field: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  // call api update introduction
  const callapi = async (data: any) => {
    try {
      const res = await updateIntroduction(data, token as unknown as string);

      if (res.ok) {
        enqueueSnackbar(res.message, { variant: "success" });
      } else {
        enqueueSnackbar(res.message, { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar("Lỗi khi cập nhật", { variant: "error" });
    }
  };

  const handleSave = async () => {
    if (!imageUrl) {
      callapi({
        image_url: formData.image_url,
        title: formData.title,
        description: formData.description,
        content: formData.content,
      });
      return;
    }

    try {
      setIsLoading(true);
      const data = await uploadImageToCloudinary(imageUrl);
      if (data.secure_url) {
        callapi({
          image_url: data.secure_url,
          title: formData.title,
          description: formData.description,
          content: formData.content,
        });
      }
    } catch (error) {
      enqueueSnackbar("Lỗi khi cập nhật", { variant: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  // loading
  if (isLoading && !formData.title) {
    return <Loading />;
  }

  return (
    <>
      <Card
        className="mx-auto shadow-lg"
        isBlurred
        shadow="lg"
        isHoverable
        radius="lg"
      >
        <CardHeader className="flex justify-center items-center md:justify-start md:items-start ">
          <h1 className="text-2xl font-bold ">Chỉnh sửa giới thiệu</h1>
        </CardHeader>
        <div className="w-[5rem] bg-primary h-[2px] mx-auto md:hidden"></div>

        <CardBody className="overflow-hidden">
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 w-full">
            {/* Image Section */}
            <div
              className=" relative group cursor-pointer overflow-hidden rounded-xl"
              onClick={() => setIsOpen(true)}
            >
              <img
                src={imageUrl || formData.image_url || "/placeholder.jpg"}
                alt="Giới thiệu"
                className="object-cover w-full h-[450px] transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
                <Icon icon="ZoomIn" className="text-white" size={40} />
              </div>
            </div>

            {/* Form Section */}
            <div className="flex flex-col gap-4 w-full col-span-1">
              <InputChangerImg
                selectedImage={imageUrl || formData.image_url || ""}
                isLoading={isLoading}
                onChange={setImageUrl}
                dataInput={imageUrl || ""}
              />
              <Input
                label="Tiêu đề"
                placeholder="Nhập tiêu đề"
                value={formData.title || ""}
                onChange={(e) => handleChange("title", e.target.value)}
                variant="bordered"
                radius="sm"
                classNames={{
                  inputWrapper:
                    "border-2 border-neutral-200 focus-within:border-primary",
                }}
              />

              <Textarea
                label="Mô tả"
                placeholder="Nhập mô tả"
                value={formData.description || ""}
                onChange={(e) => handleChange("description", e.target.value)}
                variant="bordered"
                radius="sm"
                minRows={3}
                maxRows={5}
                classNames={{
                  inputWrapper:
                    "border-2 border-neutral-200 focus-within:border-primary",
                }}
              />

              <Textarea
                label="Nội dung"
                placeholder="Nhập nội dung"
                value={formData.content || ""}
                onChange={(e) => handleChange("content", e.target.value)}
                variant="bordered"
                radius="sm"
                minRows={4}
                maxRows={6}
                classNames={{
                  inputWrapper:
                    "border-2 border-neutral-200 focus-within:border-primary",
                }}
              />

              <Button
                color="primary"
                variant="shadow"
                startContent={<Icon icon="Save" className="w-4 h-4" />}
                isLoading={isLoading}
                fullWidth
                radius="sm"
                className="font-medium mt-2"
                onClick={handleSave}
              >
                Lưu thay đổi
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>

      <Modal_detail_img_banner
        img_url={imageUrl || formData.image_url}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
      />
    </>
  );
}
