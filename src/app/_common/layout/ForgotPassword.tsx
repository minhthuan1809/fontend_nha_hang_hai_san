"use client"
import React, { useEffect, useState } from 'react'
import { Input, Button, InputOtp, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react'
import Icon from '@/app/_utils/Icon';
import { OverlayForgotPasswordStore } from '@/app/store';

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [valueOtp, setValueOtp] = useState("");
  const { dataOverlayForgotPassword, setOverlayForgotPassword } = OverlayForgotPasswordStore();
  const handleEmailSubmit = () => {
    // Here you would typically send the email to the server and request OTP
    if (email) {
      setShowOtp(true);
    }
  };

  const handleClose = () => {
    setOverlayForgotPassword(false);
  };

useEffect(() => {
  setEmail("");
  setValueOtp("");
  setShowOtp(false);
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
            {!showOtp ? (
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
                    startContent={<Icon icon="Mail" className="text-2xl text-gray-400" />}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mb-2"
                  />
                </ModalBody>
                <ModalFooter>
                  <Button 
                    color="primary" 
                    className="w-full"
                    onClick={handleEmailSubmit}
                  >
                    Gửi mã xác thực
                  </Button>
                </ModalFooter>
              </>
            ) : (
              <OtpVerification 
                setValueOtp={setValueOtp}
                valueOtp={valueOtp}
                setIsOTP={setShowOtp}
                email={email}
                onClose={onClose}
              />
            )}
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

interface OtpVerificationProps {
  setValueOtp: (value: string) => void;
  valueOtp: string;
  setIsOTP: (value: boolean) => void;
  email: string;
  onClose: () => void;
}

function OtpVerification({
  setValueOtp,
  valueOtp,
  setIsOTP,
  email,
  onClose
}: OtpVerificationProps) {
  const handleVerifyOtp = () => {
    // Here you would validate the OTP with your backend
    if (valueOtp.length === 6) {
      // If successful, redirect to reset password page or show a success message
      alert("OTP verified successfully!");
      onClose();
    }
  };

  const handleBack = () => {
    setIsOTP(false);
    setValueOtp("");
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
            errorMessage={valueOtp.length < 6 && valueOtp.length > 0 ? "Mã OTP của bạn nhập chưa đủ 6 số" : ""}
          />
        </div>
      </ModalBody>
      <ModalFooter className="flex flex-col gap-2 w-full">
        <Button
          color="primary"
          className="w-full"
          onClick={handleVerifyOtp}
          disabled={valueOtp.length !== 6}
        >
          Xác nhận
        </Button>
        <Button
          variant="light"
          className="w-full"
          onClick={handleBack}
        >
          Quay lại
        </Button>
      </ModalFooter>
    </>
  );
}