import { updateLogo } from "@/app/_service/admin/home";
import Icon from "@/app/_shared/utils/Icon";
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Button,
  Divider,
} from "@nextui-org/react";
import { getCookie } from "cookies-next";
import { useState } from "react";
import { enqueueSnackbar } from "notistack";
import { uploadImageToCloudinary } from "@/app/_service/admin/upload_img_cloudinary";
const AdminEditLogo = ({
  brand,
  setBrand,
  setRefresh,
}: {
  brand: any;
  setBrand: any;
  setRefresh: any;
}) => {
  const token = getCookie("token");
  const [isLoading, setIsLoading] = useState(false);

  const handleChoseImage = () => {
    // Mở hộp thoại chọn hình ảnh
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setBrand({ ...brand, logo_url: event.target?.result });
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleSaveBrand = async () => {
    setIsLoading(true);
    const response = await uploadImageToCloudinary(brand.logo_url);
    if (response.secure_url) {
      const responseUpdate = await updateLogo(
        {
          logo_url: response.secure_url,
          brand_name: brand.brand_name,
          alt_text: brand.alt_text,
        },
        token as unknown as string
      );
      if (responseUpdate.ok) {
        enqueueSnackbar(responseUpdate?.message, {
          variant: "success",
        });
        setRefresh((prev: any) => !prev);
      } else {
        enqueueSnackbar(responseUpdate?.message, {
          variant: "error",
        });
      }
    } else {
      enqueueSnackbar("Cập nhật thất bại", {
        variant: "error",
      });
    }

    setIsLoading(false);
  };

  return (
    <div>
      <Card className="w-full shadow-md md:shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="flex flex-col items-start gap-2 bg-gray-50 dark:bg-gray-900 p-4 md:p-6">
          <h2 className="text-xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">
            Thông tin thương hiệu
          </h2>
        </CardHeader>
        <Divider />
        <CardBody className="p-4 md:p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-auto flex justify-center items-center">
              <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-xl overflow-hidden shadow-md">
                <div className="w-full h-full overflow-hidden">
                  <img
                    src={brand?.logo_url || "/placeholder.png"}
                    alt={brand?.alt_text || "Logo thương hiệu"}
                    className="object-contain w-full h-full hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div
                  onClick={handleChoseImage}
                  className="absolute inset-0 bg-black/50 flex items-center justify-center z-10 cursor-pointer opacity-0 hover:opacity-100 transition-opacity duration-300"
                >
                  <Icon icon="Camera" className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
            <div className="space-y-4 flex-1">
              <Input
                label="Tên thương hiệu"
                value={brand?.brand_name || ""}
                variant="bordered"
                className=" transition-transform"
                onChange={(e) =>
                  setBrand({ ...brand, brand_name: e.target.value })
                }
                size="sm"
                fullWidth
              />
              <Input
                label="Alt text logo"
                value={brand?.alt_text || ""}
                variant="bordered"
                className=" transition-transform"
                onChange={(e) =>
                  setBrand({ ...brand, alt_text: e.target.value })
                }
                size="sm"
                fullWidth
              />
              <Input
                label="URL Logo"
                value={brand?.logo_url || ""}
                variant="bordered"
                className=" transition-transform"
                size="sm"
                disabled
                fullWidth
              />
              <Button
                color="primary"
                className="w-full py-2 font-semibold hover:opacity-90 transition-opacity"
                size="lg"
                onPress={handleSaveBrand}
                isLoading={isLoading}
                isDisabled={isLoading}
              >
                Cập nhật thương hiệu
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default AdminEditLogo;
