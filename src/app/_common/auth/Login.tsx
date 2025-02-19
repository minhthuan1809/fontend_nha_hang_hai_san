"use client";
import Icon from "@/app/_shared/utils/Icon";
import {
  Button,
  Checkbox,
  Input,
} from "@nextui-org/react";
// thư viện
import React, { useEffect } from "react";
import { setCookie, deleteCookie } from "cookies-next";
import { enqueueSnackbar, closeSnackbar } from "notistack";
// import component
import InputPassword from "../../_shared/components/ui/InputPassword";
import { OverlayForgotPasswordStore, OverlayLoginStore ,OverlayRegisterStore } from "@/app/store/ZustandSStore";

// code xử lý
export default function Login() {
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [remember, setRemember] = React.useState(false);
  const { dataOverlayLogin, setOverlayLogin } = OverlayLoginStore();
  const { setOverlayRegister } = OverlayRegisterStore();
  const [isError, setIsError] = React.useState<any>({email: "", password: ""});
  const [loading, setLoading] = React.useState(false);

  const { setOverlayForgotPassword } = OverlayForgotPasswordStore();

  useEffect(() => {
    setFormLogin();
  }, [dataOverlayLogin]);

  // reset form login
  const setFormLogin = () => {
    setEmail("");
    setPassword("");
    setRemember(false);
    setIsError({email: "", password: ""});
  }
  // validate form login
  const checkValidate = () => {
    let errors = {email: "", password: ""};
    let isValid = true;

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

    setIsError(errors);
    return isValid;
  };

  const handleLogin = () => {
    if (checkValidate()) {
      setLoading(true);
      // Xử lý đăng nhập khi validation thành công
      enqueueSnackbar("Đăng nhập thành công!", { variant: "success" });
      setLoading(false);
    }
  };

  // lưu email vào cookie
  useEffect(() => {
    if (remember) {
      setCookie("rememberEmail", email);
    } else {
      deleteCookie("rememberEmail");
    }
  }, [remember, email]);

  // đóng overlay
  const handleCloseOverlay = () => {
    setOverlayLogin(false);
  };

  const formLogin = () => {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 md:w-[30rem]">
        <h1 className="text-4xl font-bold text-center mb-8">Đăng nhập</h1>

        <div className="space-y-6">
          <Input
            type="email"
            placeholder="Nhập Gmail của bạn "
            size="lg"
            startContent={
              <Icon icon="User" className="text-2xl text-gray-400" />
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
        </div>

        <div className="flex justify-between items-center mt-4 gap-4 sm:gap-0">
          <Checkbox
            className="text-gray-600 text-sm sm:text-base"
            isSelected={remember}
            onChange={() => setRemember(!remember)}>
            Ghi nhớ tài khoản
          </Checkbox>
          <span className="text-amber-600 hover:text-amber-700 cursor-pointer font-medium transition-colors text-sm sm:text-base" onClick={() => {
            setOverlayLogin(false);
            setOverlayForgotPassword(true);
          }}>
                Quên mật khẩu?
          </span>
        </div>

        <Button
          className="w-full mt-8 bg-amber-600 text-white text-lg font-medium py-6"
          onClick={handleLogin}>
          {loading ? <Icon icon="Loader" className="animate-spin" /> : "Đăng nhập"}
        </Button>

        <div className="text-center mt-6 text-gray-600">
          Bạn chưa có tài khoản?{" "}
          <span className="text-amber-600 hover:text-amber-700 cursor-pointer font-medium transition-colors" onClick={() => {
            setOverlayLogin(false);
            setOverlayRegister(true);
          }}>
            Đăng ký
          </span>
        </div>
      </div>
    );
  };

  if (!dataOverlayLogin) return null;
  
  return (
    <>
      {/* Overlay cho desktop */}
      <div className="hidden lg:block">
        <div className="fixed inset-0 s z-40" onClick={handleCloseOverlay} />
        <div className="fixed top-[6rem] right-[16vh] z-40">{formLogin()}</div>
      </div>

      {/* Overlay cho mobile */}
      <div className="lg:hidden">
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={handleCloseOverlay}
        />
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-[30rem]">
          {formLogin()}
        </div>
      </div>
    </>
  );
}
