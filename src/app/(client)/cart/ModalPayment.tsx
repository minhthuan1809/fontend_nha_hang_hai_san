import React, { useState, useEffect } from "react";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import Icon from "@/app/_shared/utils/Icon";
import { getPaymentHistory } from "@/app/_service/client/card";
import { useRouter } from "next/navigation";
interface ModalPaymentProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  data: number; // số tiền cần thanh toán
  PaymentSuccess: () => void;
}

export default function ModalPayment({
  isOpen,
  onOpenChange,
  data,
  PaymentSuccess,
}: ModalPaymentProps) {
  const router = useRouter();
  const [bank, setBank] = useState("9018092003");
  const [bankName, setBankName] = useState("MBBANK");
  const [content, setContent] = useState<any>(() => {
    const savedDescription = sessionStorage.getItem("paymentDescription");
    if (savedDescription) {
      return savedDescription;
    }
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let desc = "TT";
    for (let i = 0; i < 10; i++) {
      desc += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    sessionStorage.setItem("paymentDescription", desc);
    return desc;
  });
  const [countdown, setCountdown] = useState(() => {
    const savedCountdown = sessionStorage.getItem("paymentCountdown");
    const savedTimestamp = sessionStorage.getItem("paymentTimestamp");

    if (savedCountdown && savedTimestamp) {
      const elapsedTime = Math.floor(
        (Date.now() - parseInt(savedTimestamp)) / 1000
      );
      const remainingTime = Math.max(parseInt(savedCountdown) - elapsedTime, 0);
      return remainingTime;
    }
    return 900; // 15 phút = 900 giây
  });

  const [isPaymentSuccess, setIsPaymentSuccess] = useState<boolean>(false);
  const [isPaymentFailed, setIsPaymentFailed] = useState<boolean>(false);
  const [copied, setCopied] = useState<string | null>(null);

  // call để lấy data thanh toán
  const fetchData = async () => {
    const res = await getPaymentHistory();
    for (let index = 0; index < res.length; index++) {
      const element = res[index];
      if (
        element.transferType.trim().includes(content.trim()) &&
        data === element.transferAmount
      ) {
        setIsPaymentSuccess(true);
        sessionStorage.removeItem("paymentDescription");
        sessionStorage.removeItem("paymentCountdown");
        sessionStorage.removeItem("paymentTimestamp");
        sessionStorage.removeItem("setIsOpenModalPayment");
        localStorage.removeItem("dataCart");
      }
    }
  };
  useEffect(() => {
    if (isPaymentSuccess) {
      PaymentSuccess();
    }
  }, [isPaymentSuccess]);
  // Thiết lập đếm ngược
  useEffect(() => {
    if (countdown === 900) {
      sessionStorage.setItem("paymentCountdown", countdown.toString());
      sessionStorage.setItem("paymentTimestamp", Date.now().toString());
    }

    let timer: NodeJS.Timeout;
    if (!isPaymentSuccess) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 0) {
            clearInterval(timer);
            setIsPaymentFailed(true);
            return 0;
          }
          const newCountdown = prev - 1;
          fetchData();
          sessionStorage.setItem("paymentCountdown", newCountdown.toString());
          return newCountdown;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPaymentSuccess]);

  // Copy text to clipboard function
  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;
  const progress = (countdown / 900) * 100; // Calculate progress percentage

  // Get color based on remaining time
  const getTimerColor = () => {
    if (countdown > 300) return "text-orange-500 bg-orange-100"; // More than 5 minutes
    if (countdown > 120) return "text-yellow-500 bg-yellow-100"; // More than 2 minutes
    return "text-red-500 bg-red-100"; // Less than 2 minutes
  };

  // Format currency with commas
  const formatCurrency = (amount: number): string => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleClose = () => {
    if (isPaymentSuccess) {
      return;
    }
    onOpenChange(false);
    sessionStorage.removeItem("setIsOpenModalPayment");
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={handleClose}
      size="5xl"
      // hideCloseButton={isPaymentSuccess}
    >
      <ModalContent>
        {(onClose) => (
          <>
            {!isPaymentSuccess && !isPaymentFailed ? (
              <>
                <ModalHeader className="flex flex-col gap-1 border-b">
                  <h2 className="text-xl font-bold text-center">
                    Thông Tin Thanh Toán
                  </h2>
                </ModalHeader>
                <ModalBody className="py-6">
                  <div className="flex flex-col gap-6">
                    {/* Timer section */}
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-2">
                        Vui lòng hoàn tất thanh toán trong:
                      </p>
                      <div className="relative w-full flex items-center justify-center mb-4">
                        <div
                          className={`px-6 py-3 rounded-full ${getTimerColor()} flex items-center space-x-2`}
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                          </svg>
                          <div className="text-lg font-semibold">
                            {minutes.toString().padStart(2, "0")}:
                            {seconds.toString().padStart(2, "0")}
                          </div>
                        </div>
                      </div>
                      {/* Progress bar */}
                      <div className="w-full bg-gray-100 rounded-full h-1.5 mb-4">
                        <div
                          className="h-1.5 rounded-full transition-all duration-1000 ease-linear bg-gradient-to-r from-orange-400 to-orange-500"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* QR Code and payment info */}
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                      <div className="md:col-span-2 flex flex-col items-center">
                        <div className="border border-gray-200 rounded-lg p-2 bg-white shadow-sm">
                          <img
                            className="w-full h-auto"
                            src={`https://qr.sepay.vn/img?acc=${bank}&bank=${bankName}&amount=${data}&des=${content}`}
                            alt="QR Code"
                          />
                        </div>
                        <span className="text-xs text-gray-500 mt-2">
                          Quét mã QR để thanh toán
                        </span>
                      </div>

                      <div className="md:col-span-3 space-y-4">
                        <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
                          <h3 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                            Thông tin chuyển khoản
                          </h3>

                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">Người nhận:</span>
                              <span className="font-medium">
                                Nguyễn Minh Thuận
                              </span>
                            </div>

                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">
                                Số tài khoản:
                              </span>
                              <div className="flex items-center gap-1">
                                <span className="font-medium">{bank}</span>
                                <button
                                  onClick={() => copyToClipboard(bank, "bank")}
                                  className="text-orange-500 hover:text-orange-700"
                                >
                                  {copied === "bank" ? (
                                    <Icon
                                      icon="CheckCircle"
                                      className="w-4 h-4 text-green-500"
                                    />
                                  ) : (
                                    <Icon
                                      icon="Clipboard"
                                      className="w-4 h-4"
                                    />
                                  )}
                                </button>
                              </div>
                            </div>

                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">Ngân hàng:</span>
                              <span className="font-medium">{bankName}</span>
                            </div>

                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">Số tiền:</span>
                              <span className="font-medium text-red-500">
                                {formatCurrency(data)} VNĐ
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
                          <h3 className="font-medium text-orange-700 mb-2 flex items-center gap-2">
                            <Icon
                              icon="QrCode"
                              className="w-5 h-5 text-orange-500"
                            />
                            Nội dung chuyển khoản:
                          </h3>
                          <div className="flex items-center gap-2 bg-white rounded p-2 border border-orange-100">
                            <span className="font-medium text-gray-800 flex-1 break-all">
                              {content}
                            </span>
                            <button
                              onClick={() => copyToClipboard(content, "desc")}
                              className="text-orange-500 hover:text-orange-700 p-1"
                              title="Sao chép nội dung"
                            >
                              {copied === "desc" ? (
                                <Icon
                                  icon="CheckCircle"
                                  className="w-5 h-5 text-green-500"
                                />
                              ) : (
                                <Icon icon="Clipboard" className="w-5 h-5" />
                              )}
                            </button>
                          </div>
                          <p className="text-xs text-orange-700 mt-2">
                            Vui lòng nhập chính xác nội dung chuyển khoản
                          </p>
                        </div>
                        <div>
                          <h1 className="text-md font-medium">Lưu ý : </h1>
                          <p className="text-sm text-gray-500">
                            - Nhập đúng nội dung ở trên, nếu không đúng liên hệ
                            ngay với chúng tôi.
                          </p>
                          <p className="text-sm text-gray-500">
                            - Không tắt trang thanh toán, khi chưa hiện thành
                            công
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </ModalBody>
              </>
            ) : isPaymentSuccess ? (
              <>
                <ModalHeader className="flex flex-col gap-1 border-b">
                  <h2 className="text-xl font-bold text-center text-green-600">
                    Thanh toán thành công
                  </h2>
                </ModalHeader>
                <ModalBody className="py-8">
                  <div className="flex flex-col items-center gap-6">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                        <Icon
                          icon="CheckCircle"
                          className="w-12 h-12 text-green-500"
                        />
                      </div>
                      <p className="text-lg text-gray-600 text-center">
                        Cảm ơn bạn đã thanh toán. Đơn hàng của bạn sẽ được xử lý
                        ngay lập tức!
                      </p>
                    </div>
                  </div>
                </ModalBody>
              </>
            ) : (
              <>
                <ModalHeader className="flex flex-col gap-1 border-b">
                  <h2 className="text-xl font-bold text-center text-red-600">
                    Thanh toán thất bại
                  </h2>
                </ModalHeader>
                <ModalBody className="py-8">
                  <div className="flex flex-col items-center gap-6">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                        <Icon
                          icon="XCircle"
                          className="w-12 h-12 text-red-500"
                        />
                      </div>
                      <p className="text-lg text-gray-600 text-center">
                        Rất tiếc, thời gian thanh toán đã hết. Vui lòng thử lại!
                      </p>
                    </div>
                  </div>
                </ModalBody>
              </>
            )}
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
