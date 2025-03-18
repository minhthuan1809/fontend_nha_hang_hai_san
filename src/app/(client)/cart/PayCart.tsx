import React, { useCallback, useEffect, useState } from "react";
import { Button, Input, RadioGroup, Radio, Textarea } from "@nextui-org/react";
import Link from "next/link";
import Icon from "@/app/_shared/utils/Icon";
import { RefreshCartStore, useStore } from "@/app/store/ZustandSStore";
import ModalViewAddress from "./ModalViewAddress";
import { getDiscountByCoupon } from "@/app/_service/admin/discount";
import { getCookie } from "cookies-next";
import { enqueueSnackbar } from "notistack";
import { createOrder } from "@/app/_service/client/card";
import { useRouter } from "next/navigation";
import ModalPayment from "./ModalPayment";

export default function PayCart({ data, totalPrice }: any) {
  const { dataUsers } = useStore() as any;
  const [address, setAddress] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);
  const [freeOfCharge, setFreeOfCharge] = useState(30000);
  const [discount, setDiscount] = useState(0);
  const [coupon, setCoupon] = useState(() => {
    const savedCoupon = sessionStorage.getItem("coupon");
    return savedCoupon || "";
  });
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [loading, setLoading] = useState(false);
  const token = getCookie("token");
  const router = useRouter();
  const [note, setNote] = useState("");
  const { dataRefreshCart, setRefreshCart } = RefreshCartStore() as {
    dataRefreshCart: boolean;
    setRefreshCart: (value: boolean) => void;
  };
  let isOpenSession =
    sessionStorage.getItem("setIsOpenModalPayment") === "true";
  const [isOpenModalPayment, setIsOpenModalPayment] = useState(isOpenSession);
  const [dataPayment, setDataPayment] = useState<any>(0);

  useEffect(() => {
    const savedPaymentMethod = localStorage.getItem("paymentMethod");
    if (savedPaymentMethod) {
      setPaymentMethod(savedPaymentMethod);
    }
  }, []);

  const fetchDiscount = useCallback(() => {
    if (token && coupon) {
      getDiscountByCoupon(token as string, coupon).then((res) => {
        if (res.ok) {
          if (res.data?.[0].status) {
            setDiscount(res.data[0].discount_percent);
            sessionStorage.setItem("coupon", coupon);

            enqueueSnackbar("Áp dụng mã giảm giá thành công!", {
              variant: "success",
            });
          } else {
            setDiscount(0);
            localStorage.removeItem("coupon");

            enqueueSnackbar("Mã giảm giá đã hết hạn!", { variant: "error" });
          }
        } else {
          setDiscount(0);
          sessionStorage.removeItem("coupon");

          enqueueSnackbar("Mã giảm giá không hợp lệ!", { variant: "error" });
        }
      });
    }
  }, [coupon]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchDiscount();
    }, 1000);
    return () => clearTimeout(timer);
  }, [fetchDiscount]);

  // Định dạng số tiền theo tiền Việt Nam
  const formattedTotalPrice = totalPrice?.toLocaleString("vi-VN") || "0";
  const formattedShipping =
    freeOfCharge === 0
      ? "Miễn phí"
      : `${freeOfCharge?.toLocaleString("vi-VN")} đ`;

  // Tính toán số tiền giảm giá và tổng tiền cuối cùng
  const discountAmount = totalPrice ? (totalPrice * discount) / 100 : 0;
  const finalTotalNumber = totalPrice
    ? totalPrice + freeOfCharge - discountAmount
    : 0;
  const finalTotal = finalTotalNumber.toLocaleString("vi-VN");

  // Xử lý khi thay đổi phương thức thanh toán
  const handlePaymentChange = (value: string) => {
    setPaymentMethod(value);
    localStorage.setItem("paymentMethod", value);
  };

  useEffect(() => {
    if (isOpenSession) {
      setDataPayment(finalTotalNumber);
    }
  }, [discount]);
  const handleCreateOrder = async () => {
    try {
      setLoading(true);
      const res = await createOrder(token as string, {
        user_id: dataUsers?.id,
        name: dataUsers?.addresses[address]?.name,
        phone: dataUsers?.addresses[address]?.phone,
        address: dataUsers?.addresses[address]?.address,
        discount_code: coupon,
        discount_percent: discount,
        final_total: finalTotalNumber,
        free_of_charge: freeOfCharge,
        payment_method: paymentMethod,
        note: note,
        products: data.map((item: any) => {
          return {
            product_id: item.product_id,
            quantity: item.quantity,
          };
        }),
      });

      if (res.ok) {
        setRefreshCart(!dataRefreshCart);
        router.push("/order-history");
        enqueueSnackbar(res.message, { variant: "success" });
        localStorage.removeItem("dataCart");
        sessionStorage.removeItem("coupon");

        return;
      } else {
        enqueueSnackbar(res.message, { variant: "error" });
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Có lỗi xảy ra khi tạo đơn hàng", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = () => {
    if (paymentMethod === "cod") {
      handleCreateOrder();
    }
    if (paymentMethod === "bank") {
      sessionStorage.setItem("setIsOpenModalPayment", "true");
      setIsOpenModalPayment(true);
      setDataPayment(finalTotalNumber);
      sessionStorage.removeItem("paymentDescription");
      sessionStorage.removeItem("paymentCountdown");
      sessionStorage.removeItem("paymentTimestamp");
    }
  };
  return (
    <div className="bg-gray-50 rounded-lg shadow p-4">
      <div className="space-y-6">
        {/* Phần địa chỉ giao hàng */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold">Địa chỉ giao hàng</span>
            <span
              className="text-amber-500 cursor-pointer hover:underline"
              onClick={() => setIsOpen(!isOpen)}
            >
              Thay đổi
            </span>
          </div>
          {dataUsers?.addresses?.length > 0 ? (
            <div className="space-y-4">
              <div className="border-l-4 border-amber-500 pl-3 py-2">
                <div className="grid grid-cols-1 gap-1">
                  <span className="font-medium">
                    Tên gợi nhớ: {dataUsers?.addresses[address]?.name}
                  </span>
                  <span>Địa chỉ: {dataUsers?.addresses[address]?.address}</span>
                  <span>
                    Số điện thoại: {dataUsers?.addresses[address]?.phone}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 flex justify-center items-center gap-2">
              <span>Bạn chưa thêm địa chỉ.</span>
              <Link
                href="/account/address"
                className="text-amber-500 hover:underline"
              >
                Thêm địa chỉ mới
              </Link>
            </div>
          )}
        </div>
        <div>
          <Textarea
            placeholder="Nhập Lời nhắn của bạn"
            label="Ghi chú"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full"
            variant="bordered"
            size="lg"
          />
        </div>
        {/* Phần mã giảm giá */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="mb-2 font-semibold">Mã giảm giá</div>
          <Input
            placeholder="Nhập mã giảm giá của bạn"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            startContent={
              <Icon
                icon="Ticket"
                className="text-amber-500 flex justify-center items-center"
              />
            }
            className="w-full"
          />
        </div>

        {/* Phần tóm tắt đơn hàng */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="font-semibold text-lg mb-4">Tóm tắt đơn hàng</h2>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span>Tạm tính ({data?.length || 0} sản phẩm)</span>
              <span className="font-medium">{formattedTotalPrice} đ</span>
            </div>

            <div className="flex justify-between items-center">
              <span>Phí vận chuyển</span>
              <span className="text-green-600">{formattedShipping}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between items-center">
                <span>Giảm giá {discount}%</span>
                <span className="text-green-600">
                  -{discountAmount.toLocaleString("vi-VN")} đ
                </span>
              </div>
            )}

            <div className="border-t border-gray-200 pt-3 mt-3">
              <div className="flex justify-between font-bold">
                <span>Tổng tiền thanh toán</span>
                <span className="text-red-500 text-lg">{finalTotal} đ</span>
              </div>
            </div>
          </div>

          {/* Phần phương thức thanh toán */}
          <div className="flex flex-col gap-2 mt-4">
            <RadioGroup
              value={paymentMethod}
              onValueChange={handlePaymentChange}
            >
              <Radio value="cod" className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  Thanh toán khi nhận hàng
                </div>
              </Radio>
              <Radio value="bank" className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  Thanh toán chuyển khoản
                </div>
              </Radio>
            </RadioGroup>
          </div>

          {/* Phần nút thanh toán */}
          <div className="mt-6 space-y-3">
            <Button
              isLoading={loading}
              isDisabled={loading}
              onPress={() => handleCheckout()}
              className="w-full bg-amber-500 text-white py-3 rounded-lg font-medium text-center block hover:bg-amber-600 transition-colors flex items-center justify-center"
            >
              <span>Tiến hành thanh toán</span>
              <Icon icon="ArrowRight" className="ml-2" />
            </Button>

            <Link
              href="/products"
              className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-medium text-center block hover:bg-gray-100 transition-colors flex items-center justify-center"
            >
              <Icon icon="ShoppingBag" className="mr-2" />
              <span>Tiếp tục mua sắm</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Modal địa chỉ */}
      {isOpen && (
        <ModalViewAddress
          isOpen={isOpen}
          onOpenChange={() => setIsOpen(!isOpen)}
          data={dataUsers?.addresses}
          setAddress={setAddress}
          address={address}
        />
      )}

      {/* Modal payment */}
      {isOpenModalPayment && (
        <ModalPayment
          isOpen={isOpenModalPayment}
          onOpenChange={() => setIsOpenModalPayment(!isOpenModalPayment)}
          data={dataPayment}
          PaymentSuccess={handleCreateOrder}
        />
      )}
    </div>
  );
}
