"use client";

import React, { useEffect, useState, useCallback } from "react";
import { getCustomerSection } from "@/app/_service/client/layout";
import { Button, Input, Card, CardBody, CardHeader } from "@nextui-org/react";
import Icon from "@/app/_shared/utils/Icon";
import InputChangerImg from "@/app/_shared/components/ui/InputChangerImg";
import { uploadImageToCloudinary } from "@/app/_service/admin/upload_img_cloudinary";
import { updateCustomerSection } from "@/app/_service/admin/home";
import { enqueueSnackbar } from "notistack";
import Loading from "@/app/_shared/components/Loading";
import CustomersSay from "./CustomersSay";
import Modal_detail_img_banner from "../modal/Modal_detail_img_banner";
import { getCookie } from "cookies-next";

interface CustomerImage {
  id: string;
  image_url: string;
  title: string;
}

interface CustomerSection {
  sections: Array<{
    id: string;
    name: string;
    image_url: string;
    description: string;
  }>;
  images: CustomerImage[];
}

export default function CustomersSayTitle() {
  const token = getCookie("token");
  const [data, setData] = useState<CustomerSection | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<CustomerImage | null>(
    null
  );
  const [imageUrl, setImageUrl] = useState<any | null>(null);
  const [refresh, setRefresh] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const fetchCustomerData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await getCustomerSection();

      if (response?.ok) {
        setData(response.data);
        if (response.data.images && response.data.images.length > 0) {
          setSelectedImage(response.data.images[0]);
          setImageUrl(response.data.images[0].image_url);
        }
      }
    } catch (error) {
      enqueueSnackbar("Không thể tải dữ liệu khách hàng", {
        variant: "error",
      });
      console.error("Lỗi khi tải dữ liệu khách hàng:", error);
    } finally {
      setIsLoading(false);
    }
  }, [refresh]);

  useEffect(() => {
    fetchCustomerData();
  }, [refresh, fetchCustomerData]);

  const handleTitleChange = (value: string) => {
    if (selectedImage) {
      setSelectedImage({
        ...selectedImage,
        title: value,
      });
    }
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);

      let finalImageUrl = selectedImage?.image_url || "";

      if (imageUrl && imageUrl !== selectedImage?.image_url) {
        const uploadResponse = await uploadImageToCloudinary(imageUrl);
        if (uploadResponse.secure_url) {
          finalImageUrl = uploadResponse.secure_url;
        }
      }

      const updateResponse = await updateCustomerSection(
        {
          image_url: finalImageUrl,
          title: selectedImage?.title || "",
        },
        token as unknown as string
      );

      if (updateResponse?.ok) {
        enqueueSnackbar(updateResponse.message, { variant: "success" });
        setRefresh((prev) => !prev);
        if (imageUrl !== selectedImage?.image_url) {
          setImageUrl(null);
        }
      } else {
        enqueueSnackbar(updateResponse.message, { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar("Lỗi khi cập nhật", { variant: "error" });
      console.error("Lỗi khi lưu:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Card className="mx-auto shadow-lg rounded-lg transition-all duration-300 hover:shadow-xl border-2">
        <CardHeader className="p-6">
          <h1 className="text-2xl font-bold text-center text-gray-800">
            Tiêu đề
          </h1>
        </CardHeader>
        <CardBody className="p-6">
          <div className="flex justify-center gap-8">
            <div className="w-a flex flex-col gap-4">
              {selectedImage?.image_url || imageUrl ? (
                <div className="relative group">
                  <div
                    className="absolute inset-0 w-full z-40 h-full hover:bg-black/50 flex items-center justify-center group cursor-pointer rounded-lg"
                    onClick={() => {
                      setIsOpen(true);
                      setImageUrl(imageUrl || selectedImage?.image_url);
                    }}
                  >
                    <Icon
                      icon="ZoomIn"
                      className="text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      size={50}
                    />
                  </div>
                  <img
                    src={imageUrl || selectedImage?.image_url}
                    alt={selectedImage?.title || "Khách hàng đánh giá"}
                    className="object-cover rounded-lg shadow-md transition-transform duration-300 group-hover:scale-[1.02] w-[300px] h-[300px]"
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center h-[300px] w-[300px] bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg border-2 border-dashed border-gray-300">
                  <Icon icon="Camera" className="w-12 h-12 text-gray-400" />
                </div>
              )}
            </div>

            <div className="w-full space-y-4">
              <Input
                placeholder="Nhập tiêu đề đánh giá"
                value={selectedImage?.title || ""}
                label="Tiêu đề đánh giá"
                variant="bordered"
                className="transition-all duration-300 hover:border-blue-400"
                onChange={(e) => handleTitleChange(e.target.value)}
              />
              <InputChangerImg
                selectedImage={selectedImage?.image_url || ""}
                isLoading={isLoading}
                onChange={setImageUrl}
                dataInput={imageUrl || ""}
              />

              <Button
                color="primary"
                variant="shadow"
                startContent={<Icon icon="Save" className="w-4 h-4" />}
                isLoading={isLoading}
                fullWidth
                onClick={handleSave}
                className="transition-transform duration-300 hover:scale-[1.02]"
              >
                Lưu thay đổi
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
      <CustomersSay data={data?.sections || []} setRefresh={setRefresh} />
      <Modal_detail_img_banner
        img_url={imageUrl || selectedImage?.image_url}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
      />
    </>
  );
}
