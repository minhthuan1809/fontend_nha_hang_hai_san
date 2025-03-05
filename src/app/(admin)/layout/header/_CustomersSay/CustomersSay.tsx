"use client";

import React, { useState } from "react";

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
import { uploadImageToCloudinary } from "@/app/_service/admin/upload_img_cloudinary";
import Modal_detail_img_banner from "../modal/Modal_detail_img_banner";
import InputChangerImg from "@/app/_shared/components/ui/InputChangerImg";
import {
  deleteCustomerSection,
  editCustomerSection,
  newCustomerSection,
} from "@/app/_service/admin/home";
import ModalAddImg from "../modal/Modal_Add_Img";

export default function CustomersSay({
  data,
  setRefresh,
}: {
  data: any[];
  setRefresh: (value: any) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [_img_url, setImgUrl] = useState("");
  const [formData, setFormData] = useState(data);
  const [imageUrls, setImageUrls] = useState(
    data.map((item) => item.image_url || "")
  );
  const [isOpenModalAddImg, setIsOpenModalAddImg] = useState(false);
  const [newData, setNewData] = useState({
    title: "",
    description: "",
    image_url: "",
  });

  const handleChange = (index: number, field: string, value: string) => {
    const updatedData = [...formData];
    updatedData[index] = { ...updatedData[index], [field]: value };
    setFormData(updatedData);
  };

  const handleImageChange = (index: number, value: any) => {
    const updatedImageUrls = [...imageUrls];
    updatedImageUrls[index] = value;
    setImageUrls(updatedImageUrls);
  };
  // xóa customer section
  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa banner này không?")) return;
    const response = await deleteCustomerSection(id);
    enqueueSnackbar(response.message, {
      variant: response.ok ? "success" : "error",
    });
    if (response.ok) setRefresh((prev: any) => !prev);
  };

  // edit customer section
  const handleEdit = async (id: string, index: number) => {
    // api edit customer section
    const callApiEditCustomerSection = async (id: string, data: any) => {
      const response = await editCustomerSection(id, data);
      enqueueSnackbar(response.message, {
        variant: response.ok ? "success" : "error",
      });
      if (response.ok) setRefresh((prev: any) => !prev);
    };

    // nếu hình ảnh không thay đổi thì chỉ cần update name và description
    if (imageUrls[index] === data[index].image_url) {
      callApiEditCustomerSection(id, {
        name: formData[index].name,
        description: formData[index].description,
      });
    } else {
      try {
        setIsLoading(true);
        const image_url = await uploadImageToCloudinary(imageUrls[index]);
        if (image_url.secure_url) {
          callApiEditCustomerSection(id, {
            name: formData[index].name,
            description: formData[index].description,
            image_url: image_url.secure_url,
          });
        }
      } catch {
        enqueueSnackbar("Có lỗi xảy ra khi cập nhật", { variant: "error" });
      } finally {
        setIsLoading(false);
      }
    }
  };

  // thêm mới customer section
  const handleAddNew = async () => {
    setIsLoading(true);
    const image_url = await uploadImageToCloudinary(newData.image_url);

    if (image_url.secure_url) {
      const response = await newCustomerSection({
        name: newData.title,
        description: newData.description,
        image_url: image_url.secure_url,
      });
      enqueueSnackbar(response.message, {
        variant: response.ok ? "success" : "error",
      });
      if (response.ok) {
        setRefresh((prev: any) => !prev);
        setIsOpenModalAddImg((prev: any) => !prev);
        setNewData({
          title: "",
          description: "",
          image_url: "",
        });
      }
    } else {
      enqueueSnackbar("Có lỗi xảy ra khi tải ảnh", { variant: "error" });
    }
    setIsLoading(false);
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 md:p-8 border-2 rounded-lg shadow-lg mt-4 ư">
      <div className="w-full mx-auto">
        <div className="flex items-center justify-between my-[2rem] mx-[1rem] ">
          <h1 className="text-2xl font-bold text-center text-gray-800">
            Khách hàng nói
          </h1>
          <Button
            color="primary"
            variant="shadow"
            startContent={<Icon icon="Plus" className="w-5 h-5" />}
            onPress={() => setIsOpenModalAddImg(true)}
          >
            Thêm mới
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {formData.map((item, index) => (
            <Card
              key={index}
              className="border-none shadow-lg hover:shadow-xl transition-shadow"
            >
              <CardBody className="p-6">
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="relative w-full lg:w-1/3 aspect-video rounded-xl overflow-hidden">
                    <img
                      src={imageUrls[index] || "/placeholder.jpg"}
                      alt={item.title || "Hình ảnh banner"}
                      className="object-cover transition-transform hover:scale-105 w-full h-full object-center "
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
                      <InputChangerImg
                        selectedImage={item.image_url || ""}
                        isLoading={isLoading}
                        onChange={(value) => handleImageChange(index, value)}
                        dataInput={imageUrls[index] || ""}
                      />
                      <Input
                        type="text"
                        label="Tên khách hàng"
                        value={item.name || ""}
                        onChange={(e) =>
                          handleChange(index, "name", e.target.value)
                        }
                        placeholder="Nhập tên khách hàng"
                        variant="bordered"
                        className="w-full"
                      />
                      <Textarea
                        label="Nội dung đánh giá"
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
                        isLoading={isLoading}
                        onClick={() => handleEdit(item.id, index)}
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

      {/* modal thêm hình ảnh */}
      <ModalAddImg
        isOpen={isOpenModalAddImg}
        onClose={() => setIsOpenModalAddImg(false)}
        setData={setNewData}
        data={newData}
        table="Tên khách hàng"
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
