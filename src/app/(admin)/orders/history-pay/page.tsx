"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Input,
  Card,
  CardBody,
} from "@nextui-org/react";

interface PaymentHistory {
  gateway: string;
  transactionDate: string;
  accountNumber: string;
  subAccount: number;
  code: string;
  content: string;
  transferType: string;
  description: string;
  transferAmount: number;
  referenceCode: string;
  accumulated: number;
  id: number;
}

export default function HistoryPayPage() {
  const [data, setData] = useState<PaymentHistory[]>([]);
  const [searchAccount, setSearchAccount] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_SEPAY_URL}`);
      const data = await res.json();
      setData(data);
    };
    fetchData();
  }, []);

  const filteredData = data.filter((item) => {
    return item.subAccount.toString().includes(searchAccount);
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("vi-VN") + "đ";
  };

  return (
    <div className="p-4">
      <div className="flex gap-4 items-center mb-4">
        <h1 className="text-2xl font-bold">Lịch sử thanh toán</h1>
        <Input
          placeholder="Tìm theo số tài khoản"
          value={searchAccount}
          onChange={(e) => setSearchAccount(e.target.value)}
        />
      </div>

      <Card>
        <CardBody>
          {/* Bảng cho desktop */}
          <div className="hidden md:block">
            <Table aria-label="Lịch sử thanh toán">
              <TableHeader>
                <TableColumn>THỜI GIAN</TableColumn>
                <TableColumn>CỔNG THANH TOÁN</TableColumn>
                <TableColumn>SỐ TÀI KHOẢN</TableColumn>
                <TableColumn>NỘI DUNG</TableColumn>
                <TableColumn>SỐ TIỀN</TableColumn>
                <TableColumn>MÃ THAM CHIẾU</TableColumn>
              </TableHeader>
              <TableBody>
                {filteredData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{formatDate(item.accountNumber)}</TableCell>
                    <TableCell>{item.transactionDate}</TableCell>
                    <TableCell>{item.subAccount}</TableCell>
                    <TableCell>{item.transferType}</TableCell>
                    <TableCell>{formatCurrency(item.transferAmount)}</TableCell>
                    <TableCell>{item.referenceCode}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Danh sách cho mobile */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {filteredData.map((item) => (
              <Card key={item.id} className="p-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Thời gian:</span>
                    <span>{formatDate(item.accountNumber)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Cổng thanh toán:</span>
                    <span>{item.transactionDate}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Số tài khoản:</span>
                    <span>{item.subAccount}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Nội dung:</span>
                    <span>{item.transferType}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Số tiền:</span>
                    <span className="font-semibold text-green-600">
                      {formatCurrency(item.transferAmount)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Mã tham chiếu:</span>
                    <span>{item.referenceCode}</span>
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
