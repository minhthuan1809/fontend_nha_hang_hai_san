"use client";
import Icon from "@/app/_utils/Icon";
import {
  Button,
  Input,
} from "@nextui-org/react";
// thư viện
import React, { useEffect } from "react";
import { enqueueSnackbar } from "notistack";
// import component
import InputPassword from "../ui/InputPassword";
import { OverlayRegisterStore ,OverlayLoginStore } from "@/app/store";

// code xử lý
export default function Register() {
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const { dataOverlayRegister, setOverlayRegister } = OverlayRegisterStore();
  const {  setOverlayLogin } = OverlayLoginStore();
  const [loading, setLoading] = React.useState(false);
  const [isError, setIsError] = React.useState<any>({
    name: "",
    email: "", 
    password: "",
    confirmPassword: ""
  });


  useEffect(() => {
    setFormRegister();
  }, [dataOverlayRegister]);

  
  // validate form register
  const checkValidate = () => {
    let errors = {name: "", email: "", password: "", confirmPassword: ""};
    let isValid = true;

    if (name === "") {
      errors.name = "Vui lòng nhập tên";
      isValid = false;
    }

    if (email === "") {
      errors.email = "Vui lòng nhập email";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email không hợp lệ";
      isValid = false;
    }

    if (password === "") {
      errors.password = "Vui lòng nhập mật khẩu";
      isValid = false;
    } else if (password.length < 6) {
      errors.password = "Mật khẩu phải có ít nhất 6 ký tự";
      isValid = false;
    }

    if (confirmPassword === "") {
      errors.confirmPassword = "Vui lòng xác nhận mật khẩu";
      isValid = false;
    } else if (confirmPassword !== password) {
      errors.confirmPassword = "Mật khẩu xác nhận không khớp";
      isValid = false;
    }

    setIsError(errors);
    return isValid;
  };

 

  const handleRegister = () => {
    if (checkValidate()) {
      setLoading(true);
      // Xử lý đăng ký khi validation thành công
      enqueueSnackbar("Kiểm tra email để xác thực tài khoản", { variant: "success" });
      setOverlayRegister(false);
      setLoading(false);
    }
  };

  // đóng overlay
  const handleCloseOverlay = () => {
    setOverlayRegister(false);
  };

  // reset form register
  const setFormRegister = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setIsError({name: "", email: "", password: "", confirmPassword: ""});
  }

  const formRegister = () => {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 md:w-[30rem]">
        <h1 className="text-4xl font-bold text-center mb-8">Đăng ký</h1>

        <div className="space-y-6">
          <Input
            type="text"
            placeholder="Nhập tên của bạn"
            size="lg"
            startContent={
              <Icon icon="User" className="text-2xl text-gray-400" />
            }
            isInvalid={isError.name !== ""}
            errorMessage={isError.name}
            classNames={{
              input: "text-lg",
              inputWrapper: "shadow-sm",
            }}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (isError.name) setIsError({...isError, name: ""});
            }}
          />

          <Input
            type="email"
            placeholder="Nhập Gmail của bạn"
            size="lg"
            startContent={
              <Icon icon="Mail" className="text-2xl text-gray-400" />
            }
            isInvalid={isError.email !== ""}
            errorMessage={isError.email}
            classNames={{
              input: "text-lg",
              inputWrapper: "shadow-sm",
            }}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (isError.email) setIsError({...isError, email: ""});
            }}
          />

          <InputPassword 
            password={password} 
            placeholder="Nhập mật khẩu"
            setPassword={(value) => {
              setPassword(value);
              if (isError.password) setIsError({...isError, password: ""});
            }}
            isInvalid={isError.password !== ""}
            errorMessage={isError.password}
          />

          <InputPassword 
            password={confirmPassword}
            setPassword={(value) => {
              setConfirmPassword(value);
              if (isError.confirmPassword) setIsError({...isError, confirmPassword: ""});
            }}
            isInvalid={isError.confirmPassword !== ""}
            errorMessage={isError.confirmPassword}
            placeholder="Xác nhận mật khẩu"
          />
        </div>

        <Button
          className="w-full mt-8 bg-amber-600 text-white text-lg font-medium py-6"
          onClick={handleRegister}>
         {loading ? <Icon icon="Loader" className="animate-spin" /> : "Đăng ký"}
        </Button>

        <div className="text-center mt-6 text-gray-600">
          Đã có tài khoản?{" "}
          <span className="text-amber-600 hover:text-amber-700 cursor-pointer font-medium transition-colors" onClick={() => {
            setOverlayRegister(false);
            setOverlayLogin(true);
          }}>
            Đăng nhập
          </span>
        </div>
      </div>
    );
  };

  if (!dataOverlayRegister) return null;
  
  return (
    <>
      {/* Overlay cho desktop */}
      <div className="hidden lg:block">
        <div className="fixed inset-0 s z-40" onClick={handleCloseOverlay} />
        <div className="fixed top-[6rem] right-[16vh] z-40">{formRegister()}</div>
      </div>

      {/* Overlay cho mobile */}
      <div className="lg:hidden">
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={handleCloseOverlay}
        />
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-[30rem]">
          {formRegister()}
        </div>
      </div>
    </>
  );
}
