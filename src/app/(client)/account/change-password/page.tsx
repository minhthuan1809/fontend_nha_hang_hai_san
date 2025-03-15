"use client";
import React, { useState } from "react";
import {
  Button,
  Input,
  Card,
  CardBody,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import { enqueueSnackbar } from "notistack";
import Icon from "@/app/_shared/utils/Icon";
import InputPassword from "@/app/_shared/components/ui/InputPassword";
import { changePassword } from "@/app/_service/admin/account";
import { getCookie } from "cookies-next";

export default function ChangePasswordPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const token = getCookie("token");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      enqueueSnackbar("Mật khẩu mới không khớp!", {
        variant: "error",
      });
      return;
    }

    setLoading(true);
    try {
      const res = await changePassword(
        {
          old_password: formData.currentPassword,
          new_password: formData.newPassword,
        },
        token
      );
      if (res.ok) {
        enqueueSnackbar("Đổi mật khẩu thành công!", {
          variant: "success",
        });
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        enqueueSnackbar(res.message, {
          variant: "error",
        });
      }
    } catch (error) {
      enqueueSnackbar("Có lỗi xảy ra khi đổi mật khẩu!", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" w-full">
      <Card className="w-full border shadow-xl">
        <CardHeader className="p-6 flex flex-col gap-2  items-start">
          <h1 className="text-2xl font-bold  text-amber-600 flex gap-2 items-center">
            <Icon icon="Lock" className="text-amber-600" />
            Thay đổi mật khẩu
          </h1>
          <div className="text-sm text-gray-500 flex items-center gap-2">
            <Icon icon="Info" className="text-amber-600" />
            Vui lòng nhập mật khẩu hiện tại và mật khẩu mới của bạn
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Mật khẩu hiện tại
              </label>
              <InputPassword
                password={formData.currentPassword}
                setPassword={(password) =>
                  setFormData({ ...formData, currentPassword: password })
                }
                isInvalid={false}
                errorMessage={""}
                placeholder="Nhập mật khẩu hiện tại"
              />
            </div>

            <Divider className="my-4" />

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Mật khẩu mới
              </label>
              <InputPassword
                password={formData.newPassword}
                setPassword={(password) =>
                  setFormData({ ...formData, newPassword: password })
                }
                isInvalid={false}
                errorMessage={""}
                placeholder="Nhập mật khẩu mới"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Xác nhận mật khẩu mới
              </label>
              <InputPassword
                password={formData.confirmPassword}
                setPassword={(password) =>
                  setFormData({ ...formData, confirmPassword: password })
                }
                isInvalid={false}
                errorMessage={""}
                placeholder="Nhập lại mật khẩu mới"
              />
            </div>

            <Button
              type="submit"
              color="warning"
              className="w-full font-medium py-6"
              size="lg"
              isLoading={loading}
              variant="shadow"
            >
              {loading ? "Đang xử lý..." : "Đổi Mật Khẩu"}
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
