import { getSelectSection } from "@/app/_service/client/layout";
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, Input, Button } from "@nextui-org/react";
import Icon from "@/app/_shared/utils/Icon";
import Modal_detail_img_banner from "../modal/Modal_detail_img_banner";
import Loading from "@/app/_shared/components/Loading";
import InputChangerImg from "@/app/_shared/components/ui/InputChangerImg";
import { uploadImageToCloudinary } from "@/app/_service/admin/upload_img_cloudinary";
import { updateCustomerChooseSection } from "@/app/_service/admin/home";
import { enqueueSnackbar } from "notistack";
import CustomerChooseItem from "./CustomerChooseItem";

export default function CustomerChooseTitle() {
  const [refresh, setRefresh] = useState(false);
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [imageUrl, setImageUrl] = useState<any | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getSelectSection();
        if (response?.data?.img_title?.[0]) {
          setSelectedImage(response.data.img_title[0]);

          setData(response.data.item);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [refresh]);

  const handleTitleChange = (value: string) => {
    if (selectedImage) {
      setSelectedImage({
        ...selectedImage,
        title: value,
      });
    }
  };

  const callApi = async (data: any) => {
    setIsLoading(true);
    const response = await updateCustomerChooseSection(data);

    if (response.ok) {
      enqueueSnackbar(response.message, { variant: "success" });
      setRefresh(!refresh);
      setImageUrl(null);
    } else {
      enqueueSnackbar(response.message, { variant: "error" });
    }
    setIsLoading(false);
  };
  // Lưu dữ liệu
  const handleSave = async () => {
    if (!imageUrl) {
      callApi({
        image_url: selectedImage?.image_url,
        title: selectedImage?.title,
      });
      return;
    }
    const data = await uploadImageToCloudinary(imageUrl);

    if (data.secure_url) {
      callApi({
        image_url: data.secure_url,
        title: selectedImage?.title,
      });
    } else {
      enqueueSnackbar("Lỗi khi upload ảnh", { variant: "error" });
    }
  };

  // Loading
  if (!selectedImage) {
    return <Loading />;
  }

  return (
    <>
      <Card className="mx-auto shadow-lg rounded-lg transition-all duration-300 hover:shadow-xl  border-2">
        <CardHeader className=" p-6">
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
                    className="absolute inset-0 w-full z-40 h-full hover:bg-black/50 flex items-center justify-center group cursor-pointer  rounded-lg"
                    onClick={() => {
                      setIsOpen(true);
                      setImageUrl(imageUrl || selectedImage?.image_url);
                    }}
                  >
                    <Icon
                      icon="ZoomIn"
                      className=" text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      size={50}
                    />
                  </div>
                  <img
                    src={imageUrl || selectedImage?.image_url}
                    alt={selectedImage?.title || "Khách hàng đánh giá"}
                    className="object-cover rounded-lg shadow-md transition-transform duration-300 group-hover:scale-[1.02]"
                    height={300}
                    width={400}
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center h-[300px] bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg border-2 border-dashed border-gray-300">
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
      <CustomerChooseItem data={data} setRefresh={setRefresh} />
      <Modal_detail_img_banner
        img_url={imageUrl || selectedImage?.image_url}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
      />
    </>
  );
}
