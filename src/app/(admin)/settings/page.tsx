"use client";
import React, { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { enqueueSnackbar } from "notistack";
import { getCookie } from "cookies-next";
import InputPassword from "@/app/_shared/components/ui/InputPassword";
import { changePassword } from "@/app/_service/admin/account";

export default function page() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const token = getCookie("token");

  // Validate form
  const [errors, setErrors] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    };

    // Kiểm tra mật khẩu cũ
    if (!oldPassword.trim()) {
      newErrors.oldPassword = "Vui lòng nhập mật khẩu cũ";
      isValid = false;
    } else if (oldPassword.length < 6) {
      newErrors.oldPassword = "Mật khẩu phải có ít nhất 6 ký tự";
      isValid = false;
    }

    // Kiểm tra mật khẩu mới
    if (!newPassword.trim()) {
      newErrors.newPassword = "Vui lòng nhập mật khẩu mới";
      isValid = false;
    } else if (newPassword.length < 6) {
      newErrors.newPassword = "Mật khẩu mới phải có ít nhất 6 ký tự";
      isValid = false;
    } else if (newPassword === oldPassword) {
      newErrors.newPassword = "Mật khẩu mới không được trùng với mật khẩu cũ";
      isValid = false;
    }

    // Kiểm tra xác nhận mật khẩu
    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu mới";
      isValid = false;
    } else if (confirmPassword !== newPassword) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChangePassword = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      const res = await changePassword(
        { old_password: oldPassword, new_password: newPassword },
        token as string
      );
      if (res.ok) {
        enqueueSnackbar("Đổi mật khẩu thành công", {
          variant: "success",
        });

        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setErrors({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        enqueueSnackbar(res.message, {
          variant: "error",
        });
      }
    } catch (error) {
      enqueueSnackbar("Đã xảy ra lỗi khi đổi mật khẩu", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full md:w-1/2 mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Đổi Mật Khẩu</h2>

      <div className="space-y-4">
        <InputPassword
          password={oldPassword}
          setPassword={setOldPassword}
          isInvalid={!!errors.oldPassword}
          errorMessage={errors.oldPassword}
          placeholder="Nhập mật khẩu cũ"
        />

        <InputPassword
          password={newPassword}
          setPassword={setNewPassword}
          isInvalid={!!errors.newPassword}
          errorMessage={errors.newPassword}
          placeholder="Nhập mật khẩu mới"
        />

        <InputPassword
          password={confirmPassword}
          setPassword={setConfirmPassword}
          isInvalid={!!errors.confirmPassword}
          errorMessage={errors.confirmPassword}
          placeholder="Nhập lại mật khẩu mới"
        />

        <Button
          color="primary"
          className="w-full"
          onPress={handleChangePassword}
          isLoading={loading}
        >
          Đổi Mật Khẩu
        </Button>
      </div>
    </div>
  );
}
