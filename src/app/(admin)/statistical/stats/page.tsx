"use client";
import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Button,
  Card,
  CardBody,
  Select,
  SelectItem,
  Input,
} from "@nextui-org/react";
import Icon from "@/app/_shared/utils/Icon";

export default function StatisticsPage() {
  const [timeRange, setTimeRange] = useState<"year" | "quarter" | "month">(
    "year"
  );
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Format tiền VND
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Data mẫu - Thay thế bằng API thực tế
  const revenueData = {
    year: [
      { period: "2022", doanhThu: 380000000, donHang: 1200, trungBinh: 316666 },
      { period: "2023", doanhThu: 420000000, donHang: 1500, trungBinh: 280000 },
      { period: "2024", doanhThu: 150000000, donHang: 500, trungBinh: 300000 },
    ],
    quarter: [
      {
        period: "Q1/2024",
        doanhThu: 50000000,
        donHang: 180,
        trungBinh: 277777,
      },
      {
        period: "Q2/2024",
        doanhThu: 45000000,
        donHang: 150,
        trungBinh: 300000,
      },
      {
        period: "Q3/2024",
        doanhThu: 30000000,
        donHang: 100,
        trungBinh: 300000,
      },
      { period: "Q4/2024", doanhThu: 25000000, donHang: 70, trungBinh: 357142 },
    ],
    month: [
      { period: "T1", doanhThu: 15000000, donHang: 50, trungBinh: 300000 },
      { period: "T2", doanhThu: 18000000, donHang: 60, trungBinh: 300000 },
      { period: "T3", doanhThu: 17000000, donHang: 55, trungBinh: 309090 },
    ],
  };

  // Hàm xuất Excel
  const exportToExcel = () => {
    // Tạo dữ liệu để xuất
    const data = revenueData[timeRange].map((item) => ({
      "Thời gian": item.period,
      "Doanh thu": formatCurrency(item.doanhThu),
      "Số đơn hàng": item.donHang,
      "Trung bình/đơn": formatCurrency(item.trungBinh),
    }));

    // Hiển thị thông báo khi chức năng xuất Excel được gọi
    alert(
      "Chức năng xuất Excel đã được gọi. Vui lòng cài đặt thư viện xuất Excel để sử dụng."
    );
  };

  return (
    <div className="min-h-screen bg-gray-50/30 p-6 space-y-6">
      <Card className="w-full">
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Select
              label="Thời gian"
              value={timeRange}
              onChange={(e) =>
                setTimeRange(e.target.value as "year" | "quarter" | "month")
              }
            >
              <SelectItem key="year" value="year">
                Theo năm
              </SelectItem>
              <SelectItem key="quarter" value="quarter">
                Theo quý
              </SelectItem>
              <SelectItem key="month" value="month">
                Theo tháng
              </SelectItem>
            </Select>

            <Input
              type="date"
              label="Từ ngày"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />

            <Input
              type="date"
              label="Đến ngày"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />

            <Button
              color="primary"
              startContent={<Icon icon="FileText" />}
              onClick={exportToExcel}
            >
              Xuất Excel
            </Button>
          </div>

          {/* Biểu đồ */}
          <div className="h-[400px] mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData[timeRange]}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#f1f5f9"
                  vertical={false}
                />
                <XAxis dataKey="period" stroke="#94a3b8" />
                <YAxis
                  stroke="#94a3b8"
                  tickFormatter={(value) => `${value / 1000000}M`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    borderRadius: "0.5rem",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    border: "none",
                  }}
                  formatter={(value) => formatCurrency(value as number)}
                />
                <Area
                  type="monotone"
                  dataKey="doanhThu"
                  stroke="#f97316"
                  fill="url(#colorRevenue)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Bảng thống kê */}
          <Table aria-label="Bảng thống kê doanh thu">
            <TableHeader>
              <TableColumn>THỜI GIAN</TableColumn>
              <TableColumn>DOANH THU</TableColumn>
              <TableColumn>SỐ ĐƠN HÀNG</TableColumn>
              <TableColumn>TRUNG BÌNH/ĐƠN</TableColumn>
              <TableColumn>TĂNG TRƯỞNG</TableColumn>
            </TableHeader>
            <TableBody>
              {revenueData[timeRange].map((item, index) => {
                const prevItem = revenueData[timeRange][index - 1];
                const growth = prevItem
                  ? (
                      ((item.doanhThu - prevItem.doanhThu) /
                        prevItem.doanhThu) *
                      100
                    ).toFixed(1)
                  : "0";

                return (
                  <TableRow key={item.period}>
                    <TableCell>{item.period}</TableCell>
                    <TableCell className="text-primary font-medium">
                      {formatCurrency(item.doanhThu)}
                    </TableCell>
                    <TableCell>{item.donHang}</TableCell>
                    <TableCell>{formatCurrency(item.trungBinh)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Icon
                          icon={
                            Number(growth) >= 0 ? "TrendingUp" : "TrendingDown"
                          }
                          className={
                            Number(growth) >= 0
                              ? "text-green-500"
                              : "text-red-500"
                          }
                        />
                        <span
                          className={
                            Number(growth) >= 0
                              ? "text-green-500"
                              : "text-red-500"
                          }
                        >
                          {growth}%
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      {/* Thống kê chi tiết */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardBody>
            <h3 className="text-lg font-semibold mb-4">
              Top 5 Sản phẩm bán chạy
            </h3>
            <Table aria-label="Top sản phẩm">
              <TableHeader>
                <TableColumn>SẢN PHẨM</TableColumn>
                <TableColumn>SỐ LƯỢNG</TableColumn>
                <TableColumn>DOANH THU</TableColumn>
              </TableHeader>
              <TableBody>
                {[
                  { name: "Sản phẩm A", quantity: 100, revenue: 5000000 },
                  { name: "Sản phẩm B", quantity: 80, revenue: 4000000 },
                  { name: "Sản phẩm C", quantity: 60, revenue: 3000000 },
                  { name: "Sản phẩm D", quantity: 40, revenue: 2000000 },
                  { name: "Sản phẩm E", quantity: 20, revenue: 1000000 },
                ].map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{formatCurrency(item.revenue)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <h3 className="text-lg font-semibold mb-4">
              Phương thức thanh toán
            </h3>
            <Table aria-label="Phương thức thanh toán">
              <TableHeader>
                <TableColumn>PHƯƠNG THỨC</TableColumn>
                <TableColumn>SỐ ĐƠN</TableColumn>
                <TableColumn>DOANH THU</TableColumn>
              </TableHeader>
              <TableBody>
                {[
                  { method: "COD", orders: 800, revenue: 24000000 },
                  { method: "Banking", orders: 700, revenue: 21000000 },
                ].map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.method}</TableCell>
                    <TableCell>{item.orders}</TableCell>
                    <TableCell>{formatCurrency(item.revenue)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <h3 className="text-lg font-semibold mb-4">
              Mã giảm giá đã sử dụng
            </h3>
            <Table aria-label="Mã giảm giá">
              <TableHeader>
                <TableColumn>MÃ</TableColumn>
                <TableColumn>SỐ LẦN DÙNG</TableColumn>
                <TableColumn>GIẢM GIÁ</TableColumn>
              </TableHeader>
              <TableBody>
                {[
                  { code: "SALE10", uses: 50, discount: 500000 },
                  { code: "SALE20", uses: 30, discount: 400000 },
                  { code: "SALE30", uses: 20, discount: 300000 },
                ].map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.code}</TableCell>
                    <TableCell>{item.uses}</TableCell>
                    <TableCell>{formatCurrency(item.discount)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
