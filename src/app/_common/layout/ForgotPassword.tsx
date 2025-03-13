"use client";
import React, { useEffect, useState } from "react";
import {
  Input,
  Button,
  InputOtp,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import Icon from "@/app/_shared/utils/Icon";
import { OverlayForgotPasswordStore } from "@/app/store/ZustandSStore";
import {
  authChangePassword,
  authForgotPassword,
  authVerifyForgotPassword,
} from "@/app/_service/client/auth";
import { enqueueSnackbar } from "notistack";
import InputPassword from "@/app/_shared/components/ui/InputPassword";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [valueOtp, setValueOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const { dataOverlayForgotPassword, setOverlayForgotPassword } =
    OverlayForgotPasswordStore();

  // gửi mã OTP
  const handleEmailSubmit = async () => {
    if (email) {
      try {
        setLoading(true);
        const res = await authForgotPassword({ email });
        if (res.ok) {
          setShowOtp(true);
          enqueueSnackbar(res.message, {
            variant: "success",
          });
        } else {
          enqueueSnackbar(res.message, {
            variant: "error",
          });
        }
      } catch (error) {
        enqueueSnackbar("Đã xảy ra lỗi, vui lòng thử lại sau", {
          variant: "error",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleClose = () => {
    setOverlayForgotPassword(false);
  };

  useEffect(() => {
    setEmail("");
    setValueOtp("");
    setShowOtp(false);
    setShowChangePassword(false);
  }, [dataOverlayForgotPassword]);

  return (
    <Modal
      isOpen={dataOverlayForgotPassword}
      onClose={handleClose}
      size="md"
      placement="center"
      backdrop="blur"
    >
      <ModalContent>
        {(onClose) => (
          <>
            {!showOtp && !showChangePassword ? (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  <h2 className="text-2xl font-bold">Quên mật khẩu</h2>
                </ModalHeader>
                <ModalBody>
                  <p className="text-gray-600 mb-4">
                    Vui lòng nhập email của bạn để nhận mã xác thực OTP
                  </p>
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    size="lg"
                    startContent={
                      <Icon icon="Mail" className="text-2xl text-gray-400" />
                    }
                    onChange={(e) => setEmail(e.target.value)}
                    className="mb-2"
                  />
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="warning"
                    className="w-full"
                    onPress={handleEmailSubmit}
                    isLoading={loading}
                    isDisabled={loading}
                  >
                    Gửi mã xác thực
                  </Button>
                </ModalFooter>
              </>
            ) : showOtp ? (
              <OtpVerification
                setValueOtp={setValueOtp}
                valueOtp={valueOtp}
                setIsOTP={setShowOtp}
                setShowChangePassword={setShowChangePassword}
                email={email}
                onClose={onClose}
              />
            ) : (
              <ChangePassword
                email={email}
                onClose={onClose}
                valueOtp={valueOtp}
              />
            )}
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

interface OtpVerificationProps {
  setValueOtp: (value: string) => void;
  valueOtp: string;
  setIsOTP: (value: boolean) => void;
  setShowChangePassword: (value: boolean) => void;
  email: string;
  onClose: () => void;
}

function OtpVerification({
  setValueOtp,
  valueOtp,
  setIsOTP,
  setShowChangePassword,
  email,
}: OtpVerificationProps) {
  // xác thực mã OTP
  const handleVerifyOtp = async () => {
    if (valueOtp.length === 6) {
      const res = await authVerifyForgotPassword({ email, code: valueOtp });
      if (res.ok) {
        setIsOTP(false);
        setShowChangePassword(true);
        enqueueSnackbar(res.message, {
          variant: "success",
        });
      } else {
        enqueueSnackbar(res.message, {
          variant: "error",
        });
      }
    }
  };

  const handleBack = () => {
    setIsOTP(false);
    setShowChangePassword(false);
  };

  return (
    <>
      <ModalHeader className="flex flex-col gap-1">
        <div className="flex justify-between items-center w-full">
          <h2 className="text-2xl font-bold">Xác thực OTP</h2>
        </div>
      </ModalHeader>
      <ModalBody>
        <p className="text-gray-600 text-center mb-6">
          Vui lòng nhập mã OTP đã được gửi đến email {email}
        </p>
        <div className="flex flex-col items-center gap-4">
          <InputOtp
            autoFocus
            length={6}
            value={valueOtp}
            onValueChange={setValueOtp}
            classNames={{
              input: "w-12 h-12 text-2xl border-gray-300",
            }}
            errorMessage={
              valueOtp.length < 6 && valueOtp.length > 0
                ? "Mã OTP của bạn nhập chưa đủ 6 số"
                : ""
            }
          />
        </div>
      </ModalBody>
      <ModalFooter className="flex flex-col gap-2 w-full">
        <Button
          color="warning"
          className="w-full"
          onPress={handleVerifyOtp}
          isDisabled={valueOtp.length !== 6}
        >
          Xác nhận
        </Button>
        <Button variant="light" className="w-full" onPress={handleBack}>
          Quay lại
        </Button>
      </ModalFooter>
    </>
  );
}

interface ChangePasswordProps {
  email: string;
  onClose: () => void;
  valueOtp: string;
}

function ChangePassword({ email, onClose, valueOtp }: ChangePasswordProps) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleChangePassword = async () => {
    if (password !== confirmPassword) {
      setError("Mật khẩu không khớp");
      return;
    }
    setLoading(true);
    try {
      const res = await authChangePassword({
        email,
        new_password: password,
        code: valueOtp,
      });

      if (res.ok) {
        enqueueSnackbar(res.message, {
          variant: "success",
        });
        onClose();
      } else {
        enqueueSnackbar(res.message, {
          variant: "error",
        });
      }
    } catch (error) {
      enqueueSnackbar("Đã xảy ra lỗi khi thay đổi mật khẩu", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ModalHeader className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold">Thay đổi mật khẩu</h2>
      </ModalHeader>
      <ModalBody className="gap-4">
        <InputPassword
          password={password}
          setPassword={setPassword}
          placeholder="Mật khẩu mới"
          isInvalid={error !== ""}
          errorMessage={error}
        />
        <InputPassword
          password={confirmPassword}
          setPassword={setConfirmPassword}
          placeholder="Nhập lại mật khẩu mới"
          isInvalid={error !== ""}
          errorMessage={error}
        />
      </ModalBody>
      <ModalFooter>
        <Button
          color="warning"
          className="w-full"
          onPress={handleChangePassword}
          isLoading={loading}
          isDisabled={loading}
        >
          Xác nhận
        </Button>
      </ModalFooter>
    </>
  );
}
