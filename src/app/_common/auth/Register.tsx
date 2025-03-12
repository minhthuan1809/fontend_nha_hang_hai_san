"use client";
import Icon from "@/app/_shared/utils/Icon";
import { Button, Input, InputOtp } from "@nextui-org/react";
// thư viện
import React, { useEffect } from "react";
import { enqueueSnackbar } from "notistack";
// import component
import InputPassword from "../../_shared/components/ui/InputPassword";
import {
  OverlayRegisterStore,
  OverlayLoginStore,
} from "@/app/store/ZustandSStore";
import {
  authRegister,
  authResendEmailCode,
  authVerifyEmailCode,
} from "@/app/_service/client/auth";

// code xử lý
export default function Register() {
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const { dataOverlayRegister, setOverlayRegister } = OverlayRegisterStore();
  const { setOverlayLogin } = OverlayLoginStore();
  const [loading, setLoading] = React.useState(false);
  const [isError, setIsError] = React.useState<any>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [emailOTP, setEmailOTP] = React.useState("");
  const [isOTP, setIsOTP] = React.useState(false);
  const [code, setCode] = React.useState("138642");
  const [timeRemaining, setTimeRemaining] = React.useState(300); // 5 phút = 300 giây

  // reset form register
  const setFormRegister = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setIsError({ name: "", email: "", password: "", confirmPassword: "" });
  };

  useEffect(() => {
    setFormRegister();
  }, [dataOverlayRegister]);

  // Đếm ngược thời gian
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOTP && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
    }

    if (timeRemaining === 0) {
      setIsOTP(false);
      setOverlayRegister(false);
      setOverlayLogin(true);
      enqueueSnackbar("Hết thời gian xác thực, vui lòng thử lại", {
        variant: "error",
      });
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isOTP, timeRemaining, setOverlayLogin, setOverlayRegister]);

  // validate form register
  const checkValidate = () => {
    let errors = { name: "", email: "", password: "", confirmPassword: "" };
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

  // xử lý đăng ký
  const handleRegister = async () => {
    if (checkValidate()) {
      try {
        setLoading(true);
        const res = await authRegister({
          fullname: name,
          email: email,
          password: password,
        });

        if (res.ok) {
          setEmailOTP(email);
          enqueueSnackbar(res.message, {
            variant: "success",
          });
          setCode("");
          setIsOTP(true);
          setTimeRemaining(300); // Reset thời gian đếm ngược
          setLoading(false);
        } else {
          enqueueSnackbar(res.message, {
            variant: "error",
          });
        }
      } catch (error) {
        enqueueSnackbar("Đã xảy ra lỗi khi đăng ký", {
          variant: "error",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  // xử lý xác thực email
  const handleVerifyEmail = async () => {
    try {
      const res = await authVerifyEmailCode({
        code: +code,
        email: emailOTP,
      });

      if (res.ok) {
        enqueueSnackbar(res.message, {
          variant: "success",
        });
        setIsOTP(false);
        setOverlayRegister(false);
        setCode("");
        setOverlayLogin(true);
      } else {
        if (res.message === "Phiên xác thực đã hết hạn") {
          enqueueSnackbar("Phiên xác thực đã hết hạn, vui lòng thử lại", {
            variant: "error",
          });
          setOverlayRegister(false);
          setOverlayLogin(true);
        } else {
          enqueueSnackbar(res.message, {
            variant: "error",
          });
        }
      }
    } catch (error) {
      enqueueSnackbar("Đã xảy ra lỗi khi xác thực email", {
        variant: "error",
      });
    }
  };

  // xử lý gửi lại mã xác thực
  const handleResendEmail = async () => {
    if (timeRemaining >= 0) return;
    try {
      const res = await authResendEmailCode({
        email: emailOTP,
      });

      if (res.ok) {
        enqueueSnackbar(res.message, {
          variant: "success",
        });
        setCode("");
        setIsOTP(true);
        setTimeRemaining(300);
      } else {
        enqueueSnackbar(res.message, {
          variant: "error",
        });
      }
    } catch (error) {
      enqueueSnackbar("Đã xảy ra lỗi khi gửi lại mã xác thực", {
        variant: "error",
      });
    }
  };
  // đóng overlay
  const handleCloseOverlay = () => {
    setIsOTP(false);
    setOverlayRegister(false);
    setCode("");
  };

  const formRegister = () => {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 md:w-[30rem]">
        <h1 className="text-4xl font-bold text-center mb-8">
          {isOTP ? "Xác thực email" : "Đăng ký"}
        </h1>
        {isOTP ? (
          <>
            <div>
              <div className="flex justify-center">
                <InputOtp
                  length={6}
                  size="lg"
                  value={code}
                  onValueChange={setCode}
                />
              </div>
              <div className="flex justify-center">
                <span
                  className="text-gray-500 text-sm hover:underline cursor-pointer"
                  onClick={handleResendEmail}
                >
                  Gửi lại mã xác thực sau: {timeRemaining} giây
                </span>
              </div>
              <div className="flex gap-4 justify-around mt-4">
                <Button color="warning" size="lg" onPress={handleVerifyEmail}>
                  Gửi mã xác thực
                </Button>
              </div>
            </div>
          </>
        ) : (
          <>
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
                  if (isError.name) setIsError({ ...isError, name: "" });
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
                  if (isError.email) setIsError({ ...isError, email: "" });
                }}
              />

              <InputPassword
                password={password}
                placeholder="Nhập mật khẩu"
                setPassword={(value) => {
                  setPassword(value);
                  if (isError.password)
                    setIsError({ ...isError, password: "" });
                }}
                isInvalid={isError.password !== ""}
                errorMessage={isError.password}
              />

              <InputPassword
                password={confirmPassword}
                setPassword={(value) => {
                  setConfirmPassword(value);
                  if (isError.confirmPassword)
                    setIsError({ ...isError, confirmPassword: "" });
                }}
                isInvalid={isError.confirmPassword !== ""}
                errorMessage={isError.confirmPassword}
                placeholder="Xác nhận mật khẩu"
              />
            </div>

            <Button
              className="w-full mt-8 bg-amber-600 text-white text-lg font-medium py-6"
              onPress={handleRegister}
              isLoading={loading}
              isDisabled={loading}
            >
              Đăng ký
            </Button>
          </>
        )}

        <div className="text-center mt-6 text-gray-600">
          Đã có tài khoản?{" "}
          <span
            className="text-amber-600 hover:text-amber-700 cursor-pointer font-medium transition-colors"
            onClick={() => {
              setOverlayRegister(false);
              setOverlayLogin(true);
            }}
          >
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
        <div className="fixed top-[6rem] right-[16vh] z-40">
          {formRegister()}
        </div>
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
