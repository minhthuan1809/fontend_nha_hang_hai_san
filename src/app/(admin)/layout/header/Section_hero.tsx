"use client";

import React, { useEffect, useState } from "react";

import { getSectionHeaderHero } from "@/app/_service/client/layout";
import Icon from "@/app/_shared/utils/Icon";
import {
  Card,
  CardBody,
  Button,
  Input,
  Textarea,
  Tooltip,
} from "@nextui-org/react";
import { enqueueSnackbar } from "notistack";
import Modal_detail_img_banner from "./modal/Modal_detail_img_banner";
import {
  deleteHeroSection,
  newHeroSection,
  updateHeroSection,
} from "@/app/_service/admin/home";
import { uploadImageToCloudinary } from "@/app/_service/admin/upload_img_cloudinary";
import ModalAddImg from "./modal/Modal_Add_Img";
import { getCookie } from "cookies-next";

export default function Section_hero() {
  const token = getCookie("token");
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [_img_url, setImgUrl] = useState("");
  const [isOpenModalAddImg, setIsOpenModalAddImg] = useState(false);
  const [newData, setNewData] = useState({
    title: "",
    description: "",
    image_url: "",
  });

  useEffect(() => {
    const fetchHeroData = async () => {
      const response = await getSectionHeaderHero();
      if (response && response.data) {
        setData(response.data);
      }
    };
    fetchHeroData();
  }, [refresh]);

  const handleChange = (index: number, field: string, value: string) => {
    const updatedData = [...data];
    updatedData[index] = { ...updatedData[index], [field]: value };
    setData(updatedData);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa banner này không?")) return;
    const response = await deleteHeroSection(id, token as string);
    if (response.ok) {
      enqueueSnackbar(response.message, {
        variant: "success",
      });
      setRefresh(!refresh);
    } else {
      enqueueSnackbar(response.message, {
        variant: "error",
      });
    }
  };

  const handleImageClick = (index: number) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const updatedData = [...data];
          updatedData[index].tempImageUrl = event.target?.result as string;
          setData(updatedData);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const CallApi = async (id: string, data: any) => {
    setIsLoading(true);

    const response = await updateHeroSection(
      id,
      data,
      token as unknown as string
    );
    if (response.ok) {
      enqueueSnackbar(response?.message, { variant: "success" });
      setRefresh(!refresh);
    } else {
      enqueueSnackbar(response?.message, { variant: "error" });
    }
    setIsLoading(false);
  };
  // lưu thay đổi
  const handleSaveChanges = async (id: string, index: number) => {
    if (!data[index].tempImageUrl) {
      CallApi(id, {
        image_url: data[index].image_url,
        title: data[index].title,
        description: data[index].description,
      });
      return;
    }
    try {
      const imageUrl = await uploadImageToCloudinary(data[index].tempImageUrl);
      if (imageUrl.secure_url) {
        CallApi(id, {
          image_url: imageUrl.secure_url,
          title: data[index].title,
          description: data[index].description,
        });
      }
    } catch (error) {
      enqueueSnackbar("Lưu thay đổi thất bại", { variant: "error" });
    } finally {
    }
  };

  // thêm mới
  const handleAddNew = async () => {
    setIsLoading(true);
    const imageUrl = await uploadImageToCloudinary(newData.image_url);
    if (imageUrl.secure_url) {
      const response = await newHeroSection(
        {
          image_url: imageUrl.secure_url,
          title: newData.title,
          description: newData.description,
        },
        token as unknown as string
      );
      if (response.ok) {
        enqueueSnackbar(response.message, { variant: "success" });
        setRefresh(!refresh);
        setIsOpenModalAddImg((prev) => !prev);
        setNewData({
          title: "",
          description: "",
          image_url: "",
        });
      } else {
        enqueueSnackbar(response.message, { variant: "error" });
      }
    } else {
      enqueueSnackbar("Lưu thay đổi thất bại", { variant: "error" });
    }
    setIsLoading(false);
  };

  return (
    <div className=" bg-gradient-to-b from-gray-50 to-gray-100 md:p-8">
      <div className="w-full mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl md:text-4xl font-bold">Quản lý Header</h1>
          <Button
            color="primary"
            variant="shadow"
            onClick={() => setIsOpenModalAddImg(true)}
            startContent={<Icon icon="Plus" className="w-5 h-5" />}
          >
            Thêm mới
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.map((item, index) => (
            <Card
              key={index}
              className="border-none shadow-md hover:shadow-xl transition-shadow"
            >
              <CardBody className="p-6">
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="relative w-full lg:w-1/3 aspect-video rounded-xl overflow-hidden">
                    <img
                      src={
                        item.tempImageUrl ||
                        item.image_url ||
                        "/placeholder.jpg"
                      }
                      alt={item.title || "Hình ảnh banner"}
                      className="object-cover transition-transform hover:scale-105 w-full h-full"
                    />
                    <div
                      className="absolute inset-0 w-full h-full hover:bg-black/50 flex items-center justify-center group cursor-pointer"
                      onClick={() => {
                        setIsOpen(true);
                        setImgUrl(item.image_url);
                      }}
                    >
                      <Icon
                        icon="ZoomIn"
                        className="z-40 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        size={50}
                      />
                    </div>
                  </div>

                  <div className="flex-1 space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold">
                        Hình ảnh {index + 1}
                      </h2>
                      <Tooltip content="Xóa" color="danger">
                        <Button
                          isIconOnly
                          color="danger"
                          variant="light"
                          onClick={() => handleDelete(item.id)}
                          className="min-w-unit-10"
                        >
                          <Icon icon="Trash2" className="w-5 h-5" />
                        </Button>
                      </Tooltip>
                    </div>

                    <div className="space-y-4">
                      <Input
                        type="text"
                        label="Link hình ảnh"
                        value={item.tempImageUrl || item.image_url || ""}
                        disabled={true}
                        placeholder="Nhập link hình ảnh"
                        variant="bordered"
                        className="w-full"
                        endContent={
                          <Button
                            isIconOnly
                            color="primary"
                            variant="light"
                            onClick={() => handleImageClick(index)}
                            isLoading={isLoading}
                          >
                            <Icon icon="Camera" className="w-5 h-5" />
                          </Button>
                        }
                      />

                      <Input
                        type="text"
                        label="Tiêu đề"
                        value={item.title || ""}
                        onChange={(e) =>
                          handleChange(index, "title", e.target.value)
                        }
                        placeholder="Nhập tiêu đề"
                        variant="bordered"
                        className="w-full"
                      />

                      <Textarea
                        label="Mô tả"
                        value={item.description || ""}
                        onChange={(e) =>
                          handleChange(index, "description", e.target.value)
                        }
                        placeholder="Nhập mô tả"
                        variant="bordered"
                        className="w-full"
                        minRows={3}
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                      <Button
                        color="primary"
                        variant="flat"
                        startContent={<Icon icon="Save" className="w-4 h-4" />}
                        onClick={() => handleSaveChanges(item.id, index)}
                        isLoading={isLoading}
                      >
                        Lưu thay đổi
                      </Button>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
      <ModalAddImg
        isOpen={isOpenModalAddImg}
        onClose={() => setIsOpenModalAddImg(false)}
        setData={setNewData}
        data={newData}
        table="Tiêu đề"
        addNew={handleAddNew}
        isLoading={isLoading}
      />
      {/* modal xem hình ảnh */}
      <Modal_detail_img_banner
        img_url={_img_url}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
      />
    </div>
  );
}
