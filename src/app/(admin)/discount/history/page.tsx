"use client";
import { getDiscountHistory } from "@/app/_service/admin/discount";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Card,
  CardBody,
  Tooltip,
  Button,
} from "@nextui-org/react";
import { enqueueSnackbar } from "notistack";

export default function DiscountHistoryPage() {
  const token = getCookie("token");
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getDiscountHistory(token as string);
      if (res.ok) {
        setData(res.data);
      }
    };
    fetchData();
  }, [token]);

  const formatCurrency = (value: string) => {
    return parseInt(value).toLocaleString("vi-VN") + "đ";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="md:p-6">
      <Card className="mb-6 shadow-lg">
        <CardBody className="overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Lịch sử sử dụng mã giảm giá
              </h1>
              <p className="text-gray-500 mt-2">
                Quản lý và theo dõi lịch sử sử dụng mã giảm giá
              </p>
            </div>
          </div>

          <div className="hidden md:block">
            <Table aria-label="Bảng lịch sử sử dụng mã giảm giá">
              <TableHeader>
                <TableColumn>THÔNG TIN KHÁCH HÀNG</TableColumn>
                <TableColumn>MÃ ĐƠN HÀNG</TableColumn>
                <TableColumn>MÃ GIẢM GIÁ</TableColumn>
                <TableColumn>TỔNG TIỀN</TableColumn>
                <TableColumn>THỜI GIAN</TableColumn>
              </TableHeader>
              <TableBody>
                {data?.map((item: any) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img
                          src={item.avatar}
                          alt={item.user_name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <p className="font-medium">{item.user_name}</p>
                          <p className="text-sm text-gray-500">{item.phone}</p>
                          <p className="text-sm text-gray-500">
                            {item.address}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="light"
                        className="text-gray-600 font-medium"
                        onPress={() => {
                          navigator.clipboard.writeText(item.order_history_id);
                          enqueueSnackbar("Đã sao chép mã đơn hàng", {
                            variant: "success",
                          });
                        }}
                      >
                        #{item.order_history_id}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <p className="font-medium">{item.discount_code}</p>
                      <p className="text-sm text-gray-500">
                        {item.discount_name}
                      </p>
                      <p className="text-sm text-green-500">
                        -{item.discount_percent}%
                      </p>
                    </TableCell>
                    <TableCell>
                      <p className="font-semibold text-green-600">
                        {formatCurrency(item.final_total)}
                      </p>
                      <p className="text-sm text-gray-500">
                        Ship: {formatCurrency(item.free_of_charge)}
                      </p>
                    </TableCell>
                    <TableCell>
                      <Tooltip content={formatDate(item.created_at)}>
                        <span className="text-gray-600">
                          {new Date(item.created_at).toLocaleDateString(
                            "vi-VN"
                          )}
                        </span>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="grid grid-cols-1 gap-4 md:hidden">
            {data?.map((item: any) => (
              <Card key={item.id} className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={item.avatar}
                    alt={item.user_name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-medium">{item.user_name}</p>
                    <p className="text-sm text-gray-500">{item.phone}</p>
                    <p className="text-sm text-gray-500">{item.address}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div>
                    <span className="text-sm text-gray-500">Mã đơn hàng:</span>
                    <Button
                      variant="light"
                      className="text-gray-600 font-medium ml-2"
                      onPress={() => {
                        navigator.clipboard.writeText(item.order_history_id);
                        enqueueSnackbar("Đã sao chép mã đơn hàng", {
                          variant: "success",
                        });
                      }}
                    >
                      #{item.order_history_id}
                    </Button>
                  </div>

                  <div>
                    <span className="text-sm text-gray-500">Mã giảm giá:</span>
                    <p className="font-medium">{item.discount_code}</p>
                    <p className="text-sm text-gray-500">
                      {item.discount_name}
                    </p>
                    <p className="text-sm text-green-500">
                      -{item.discount_percent}%
                    </p>
                  </div>

                  <div>
                    <span className="text-sm text-gray-500">Tổng tiền:</span>
                    <p className="font-semibold text-green-600">
                      {formatCurrency(item.final_total)}
                    </p>
                    <p className="text-sm text-gray-500">
                      Ship: {formatCurrency(item.free_of_charge)}
                    </p>
                  </div>

                  <div>
                    <span className="text-sm text-gray-500">Thời gian:</span>
                    <p className="text-gray-600">
                      {formatDate(item.created_at)}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
