"use client";
import { updateAccount } from "@/app/_service/admin/account";
import InputChangerImg from "@/app/_shared/components/ui/InputChangerImg";
import { useStore } from "@/app/store/ZustandSStore";
import { getCookie } from "cookies-next";
import { Button, Input, Tooltip, user } from "@nextui-org/react";
import React, { useState } from "react";
import { enqueueSnackbar } from "notistack";
import { uploadImageToCloudinaryAvatar } from "@/app/_service/admin/upload_img_cloudinary";

export default function page() {
  const { dataUsers } = useStore() as { dataUsers: any };
  const [img, setImg] = useState<any>(null);
  const token = getCookie("token");
  const [loading, setLoading] = useState(false);

  const callApi = async (data: any) => {
    try {
      setLoading(true);
      const res = await updateAccount(data, token);
      if (res.ok) {
        enqueueSnackbar("Cập nhật thông tin tài khoản thành công", {
          variant: "success",
        });
      } else {
        enqueueSnackbar(res.message, {
          variant: "error",
        });
      }
    } catch (error) {
      enqueueSnackbar("Đã xảy ra lỗi khi cập nhật thông tin", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };
  const handleUpdateAccount = async () => {
    if (!img) {
      callApi({
        avatar: dataUsers.avatar,
        name: dataUsers.name,
      });
      return;
    }
    const res = await uploadImageToCloudinaryAvatar(img);

    if (res.secure_url) {
      callApi({
        avatar: res.secure_url,
        name: dataUsers.name,
      });
    } else {
      enqueueSnackbar("Lỗi khi đẩy ảnh lên ", {
        variant: "error",
      });
    }
  };
  return (
    <div className="space-y-4">
      <div className="flex flex-col justify-center items-center gap-y-4">
        <div className="flex justify-center items-center  h-60 w-60">
          <img
            src={img || dataUsers.avatar}
            alt=""
            className="w-full h-full rounded-full"
          />
        </div>
        <span className="text-lg font-bold">Ảnh đại diện</span>
      </div>
      <div className="flex flex-col justify-center items-center gap-y-4 ">
        <div className="w-full">
          <InputChangerImg
            selectedImage={img || dataUsers.avatar}
            isLoading={false}
            onChange={setImg}
            dataInput={img || dataUsers.avatar}
          />
        </div>
        <Input
          label="Email"
          value={dataUsers.email}
          variant="bordered"
          disabled
          endContent={
            <Tooltip
              content="Đã xác thực"
              placement="top-start"
              color="success"
              classNames={{
                base: "text-md text-green-500",
              }}
            >
              <span className="text-md text-green-500 cursor-pointer">
                &#10004;
              </span>
            </Tooltip>
          }
        />
        <Input label="Họ tên" value={dataUsers.name} variant="bordered" />
      </div>
      <div className="flex justify-end items-center mt-4">
        <Button
          color="warning"
          isLoading={loading}
          onPress={handleUpdateAccount}
          disabled={loading}
        >
          Cập nhật
        </Button>
      </div>
    </div>
  );
}
