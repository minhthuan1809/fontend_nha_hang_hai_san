"use client";

import React, { useEffect, useState, Suspense } from "react";
import { getCookie } from "cookies-next";
import {
  Card,
  CardBody,
  Chip,
  Divider,
  Avatar,
  Button,
  Tab,
  Tabs,
} from "@nextui-org/react";

import { motion } from "framer-motion";
import { getHistoryOrder } from "@/app/_service/client/layout";
import Loading from "@/app/_shared/components/Loading";
import Pagination from "@/app/_shared/components/ui/Pagination";
import ModalViewOder from "@/app/_shared/components/modals/ModalViewOder";
import Link from "next/link";
import Icon from "@/app/_shared/utils/Icon";
import ModalCancelOder from "./ModalCancelOder";

// Tạo component con để sử dụng useSearchParams
function OrderHistoryContent() {
  const { useSearchParams } = require("next/navigation");
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || 1;
  const [isOpenCancel, setIsOpenCancel] = useState(false);
  const token = getCookie("token");
  const [orders, setOrders] = useState<any>({
    orders: [],
    history_orders: [],
    history_pagination: {
      total_pages: 1,
    },
  });
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState("pending");
  const [isOpen, setIsOpen] = useState(false);
  const [dataViewOrder, setDataViewOrder] = useState<any>(null);
  const [idCancel, setIdCancel] = useState<any>(null);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const fetchOrders = async () => {
      const response = await getHistoryOrder(token as string, Number(page));
      if (response.ok && response.data) {
        setOrders(response.data);
        setLoading(false);
      } else {
        setOrders({
          orders: [],
          history_orders: [],
          history_pagination: {
            total_pages: 1,
          },
        });
        setLoading(false);
      }
      timeoutId = setTimeout(fetchOrders, 4000); // Gọi lại sau 2 giây
    };

    fetchOrders();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [page]);

  // Các hàm helper giữ nguyên
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "warning";
      case "processing":
        return "primary";
      case "completed":
        return "success";
      case "canceled":
        return "danger";
      default:
        return "default";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Icon icon="ShoppingBagIcon" className="w-4 h-4" />;
      case "processing":
        return <Icon icon="TruckIcon" className="w-4 h-4" />;
      case "completed":
        return <Icon icon="CheckCircleIcon" className="w-4 h-4" />;
      case "canceled":
        return <Icon icon="XCircleIcon" className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Chờ xác nhận";
      case "processing":
        return "Đang xử lý";
      case "completed":
        return "Hoàn thành";
      case "canceled":
        return "Đã hủy";
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  if (loading) {
    return <Loading />;
  }

  if (!orders || (!orders.orders?.length && !orders.history_orders?.length)) {
    return (
      <Card className="w-full min-h-[100vh]">
        <CardBody className="py-10 flex flex-col items-center justify-center">
          <Icon
            icon="ShoppingBagIcon"
            className="w-16 h-16 text-gray-400 mb-4"
          />
          <p className="text-xl text-center text-gray-600">
            Không có đơn hàng nào.
          </p>
          <Link
            href="/products"
            className="mt-6 bg-warning-500 p-2 rounded-md text-white"
          >
            Mua sắm ngay
          </Link>
        </CardBody>
      </Card>
    );
  }

  const renderOrderList = (orderList: any[]) => {
    if (!orderList?.length) {
      return (
        <Card className="w-full">
          <CardBody className="py-10 flex flex-col items-center justify-center">
            <Icon
              icon="ShoppingBagIcon"
              className="w-16 h-16 text-gray-400 mb-4"
            />
            <p className="text-xl text-center text-gray-600">
              Không có đơn hàng nào.
            </p>
            <Link
              href="/products"
              className="mt-6 bg-warning-500 p-2 rounded-sm text-white"
            >
              Mua sắm ngay
            </Link>
          </CardBody>
        </Card>
      );
    }

    return (
      <div className="space-y-6">
        {orderList.map((order: any, index: any) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="w-full shadow-sm hover:shadow-md transition-shadow">
              <CardBody className="p-0">
                <div className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                    <div className="flex items-center mb-2 sm:mb-0">
                      <span className="text-lg font-semibold mr-2">
                        Đơn hàng #{order.id}
                      </span>
                      <Chip
                        startContent={getStatusIcon(order.status)}
                        color={getStatusColor(order.status)}
                        size="sm"
                        variant="flat"
                      >
                        {getStatusText(order.status)}
                      </Chip>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <span className="text-sm">
                        Ngày đặt: {formatDate(order.created_at)}
                      </span>
                    </div>
                  </div>

                  <Divider className="my-3" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">
                        Sản phẩm
                      </h3>
                      <div className="space-y-3">
                        {order.products?.map((item: any, index: number) => {
                          if (!item) return null;

                          if (index === 2 && order.products.length > 3) {
                            return (
                              <div
                                key={index}
                                className="text-sm text-amber-500"
                              >
                                + Còn {order.products.length - 2} sản phẩm khác
                              </div>
                            );
                          }

                          if (index > 2) return null;

                          return (
                            <div
                              key={item.id || index}
                              className="flex items-center"
                            >
                              <Avatar
                                src={item.image_url}
                                className="mr-3 rounded-md"
                                size="sm"
                                fallback={item?.name?.charAt(0) || "?"}
                              />
                              <div>
                                <p className="text-sm font-medium">
                                  {item.name || "Sản phẩm không xác định"}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {formatPrice(item.price || 0)} x{" "}
                                  {item.quantity || 1}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex flex-col justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-2">
                          Tổng thanh toán
                        </h3>
                        <p className="text-xl font-bold text-primary">
                          {formatPrice(order.final_total)}
                        </p>
                      </div>

                      <div className="flex justify-end mt-4 gap-2">
                        {order.status === "pending" && (
                          <Button
                            color="danger"
                            variant="light"
                            size="sm"
                            endContent={
                              <Icon icon="XCircleIcon" className="w-4 h-4" />
                            }
                            onPress={() => {
                              setIsOpenCancel(true);
                              setIdCancel(order.id);
                            }}
                          >
                            Hủy đơn
                          </Button>
                        )}
                        <Button
                          color="primary"
                          variant="light"
                          size="sm"
                          endContent={
                            <Icon icon="EyeIcon" className="w-4 h-4" />
                          }
                          onPress={() => {
                            setDataViewOrder(order);
                            setIsOpen(true);
                          }}
                        >
                          Xem chi tiết
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 min-h-[100vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Đơn hàng của tôi
            </h1>
            <p className="text-gray-600 mt-2">
              Theo dõi và quản lý các đơn hàng của bạn
            </p>
          </div>
        </div>

        <Tabs
          selectedKey={selectedTab}
          onSelectionChange={(key) => setSelectedTab(key as string)}
          className="mb-6"
        >
          <Tab
            key="pending"
            title={
              <div className="flex items-center gap-2">
                <Icon icon="ShoppingBagIcon" className="w-4 h-4" />
                <span>Đơn hàng đang chờ ({orders.orders?.length || 0})</span>
              </div>
            }
          >
            {renderOrderList(orders.orders || [])}
          </Tab>
          <Tab
            key="history"
            title={
              <div className="flex items-center gap-2">
                <Icon icon="CheckCircleIcon" className="w-4 h-4" />
                <span>
                  Lịch sử đơn hàng ({orders.history_orders?.length || 0})
                </span>
              </div>
            }
          >
            {renderOrderList(orders.history_orders || [])}
            <Pagination
              total={orders.history_pagination?.total_pages || 1}
              page={Number(page)}
            />
          </Tab>
        </Tabs>
      </motion.div>

      <ModalViewOder
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        data={dataViewOrder}
        _status={false}
        submitEditAddress={() => {}}
      />
      <ModalCancelOder
        isOpen={isOpenCancel}
        onOpenChange={setIsOpenCancel}
        id={idCancel}
      />
    </div>
  );
}

// Component chính bọc trong Suspense
export default function OrderHistory() {
  return (
    <Suspense fallback={<Loading />}>
      <OrderHistoryContent />
    </Suspense>
  );
}
