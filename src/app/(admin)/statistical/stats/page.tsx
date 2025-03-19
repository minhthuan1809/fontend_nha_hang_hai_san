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
  DatePicker,
} from "@nextui-org/react";
import Icon from "@/app/_shared/utils/Icon";
import { getStats } from "@/app/_service/admin/stats";
import { getCookie } from "cookies-next";
import { exportToExcel } from "@/app/(admin)/statistical/stats/exportExcel";

export default function StatisticsPage() {
  const [timeRange, setTimeRange] = useState<"year" | "quarter" | "month">(
    "year"
  );
  const [date, setDate] = useState<any>();
  const [statsData, setStatsData] = useState<any>(null);
  const token = getCookie("token");

  // Format tiền VND
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  useEffect(() => {
    getStats(token as string, date).then((data) => {
      setStatsData(data.data);
    });
  }, [date, token]);

  const revenueData = {
    year: [
      {
        period: "Hôm nay",
        doanhThu: statsData?.revenueStats?.today?.revenue || 0,
        donHang: statsData?.revenueStats?.today?.orders || 0,
        trungBinh:
          statsData?.revenueStats?.today?.revenue /
          (statsData?.revenueStats?.today?.orders || 1),
      },
      {
        period: "Hôm qua",
        doanhThu: statsData?.revenueStats?.yesterday?.revenue || 0,
        donHang: statsData?.revenueStats?.yesterday?.orders || 0,
        trungBinh:
          statsData?.revenueStats?.yesterday?.revenue /
          (statsData?.revenueStats?.yesterday?.orders || 1),
      },
      {
        period: "2 ngày trước",
        doanhThu: statsData?.revenueStats?.twoDaysAgo?.revenue || 0,
        donHang: statsData?.revenueStats?.twoDaysAgo?.orders || 0,
        trungBinh:
          statsData?.revenueStats?.twoDaysAgo?.revenue /
          (statsData?.revenueStats?.twoDaysAgo?.orders || 1),
      },
    ],
    quarter: [],
    month: [],
  };

  return (
    <div className="min-h-screen bg-gray-50/30 md:p-6  ">
      <div className=" space-y-6 bg-white p-6 rounded-lg shadow-md border border-slate-100 min-h-screen">
        <h1 className="text-2xl font-bold text-slate-800">
          Thống kê doanh thu
        </h1>
        <Card className="w-full">
          <CardBody>
            {/* Biểu đồ */}
            <div className="h-[250px] ">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData[timeRange]}>
                  <defs>
                    <linearGradient
                      id="colorRevenue"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
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
          </CardBody>
        </Card>
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-between 
       items-end gap-4 mb-6"
        >
          <div className="bg-white rounded-lg shadow-md border border-slate-100 p-6 relative overflow-hidden w-full">
            <div className="absolute right-0 top-0 bg-indigo-500/10 p-4 rounded-bl-lg">
              <Icon icon="TrendingUp" className="w-6 h-6 text-indigo-500" />
            </div>
            <p className="text-sm font-medium text-slate-500">Tổng doanh thu</p>
            <h3 className="text-2xl font-bold mt-2 text-slate-800">
              {formatCurrency(statsData?.totalRevenue?.total_revenue || 0)}
            </h3>
            <div className="flex items-center mt-3 text-xs">
              <span className="flex items-center text-emerald-500 font-medium">
                <Icon icon="CalendarFold" className="w-4 h-4 " />
              </span>
              <span className="text-slate-400 ml-2">Tính theo ngày</span>
            </div>
          </div>

          {/* Tổng giảm giá */}
          <div className="bg-white rounded-lg shadow-md border border-slate-100 p-6 relative overflow-hidden w-full">
            <div className="absolute right-0 top-0 bg-indigo-500/10 p-4 rounded-bl-lg">
              <Icon icon="TrendingUp" className="w-6 h-6 text-indigo-500" />
            </div>
            <p className="text-sm font-medium text-slate-500">Tổng giảm giá</p>
            <h3 className="text-2xl font-bold mt-2 text-red-500">
              - {formatCurrency(statsData?.totalRevenue?.total_discount || 0)}
            </h3>
            <div className="flex items-center mt-3 text-xs">
              <span className="flex items-center text-emerald-500 font-medium">
                <Icon icon="CalendarFold" className="w-4 h-4 " />
              </span>
              <span className="text-slate-400 ml-2">Tính theo ngày</span>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full justify-end">
            <DatePicker
              className="max-w-[284px]"
              label="Thời gian"
              value={date}
              onChange={(value) => setDate(value)}
            />
            <Button
              color="primary"
              startContent={<Icon icon="FileText" />}
              size="lg"
              onPress={() => exportToExcel(statsData)}
            >
              Xuất Excel
            </Button>
          </div>
        </div>
        {/* Thống kê chi tiết */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardBody>
              <h3 className="text-lg font-semibold mb-4">
                Sản phẩm bán trong ngày
              </h3>
              <Table
                aria-label="Top sản phẩm"
                className="h-[300px] overflow-y-auto overflow-hidden"
              >
                <TableHeader>
                  <TableColumn>SẢN PHẨM</TableColumn>
                  <TableColumn>SỐ LƯỢNG</TableColumn>
                  <TableColumn>DOANH THU</TableColumn>
                </TableHeader>
                <TableBody emptyContent={"Không tìm thấy sản phẩm nào"}>
                  {statsData?.productStats.map((item: any, index: number) => (
                    <TableRow key={index}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.total_quantity}</TableCell>
                      <TableCell>
                        {formatCurrency(item.total_revenue)}
                      </TableCell>
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
              <Table
                aria-label="Phương thức thanh toán"
                className="h-[300px] overflow-y-auto overflow-hidden"
              >
                <TableHeader>
                  <TableColumn>PHƯƠNG THỨC</TableColumn>
                  <TableColumn>SỐ ĐƠN</TableColumn>
                  <TableColumn>DOANH THU</TableColumn>
                </TableHeader>
                <TableBody
                  emptyContent={"Không tìm thấy phương thức thanh toán nào"}
                >
                  {statsData?.paymentMethodStats?.map(
                    (item: any, index: number) => (
                      <TableRow key={index}>
                        <TableCell>{item.method}</TableCell>
                        <TableCell>{item.total_orders}</TableCell>
                        <TableCell>
                          {formatCurrency(item.total_revenue)}
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <h3 className="text-lg font-semibold mb-4">
                Mã giảm giá đã sử dụng
              </h3>
              <Table
                aria-label="Mã giảm giá"
                className="h-[300px] overflow-y-auto overflow-hidden"
              >
                <TableHeader>
                  <TableColumn>MÃ</TableColumn>
                  <TableColumn>SỐ LẦN DÙNG</TableColumn>
                  <TableColumn>GIẢM GIÁ</TableColumn>
                </TableHeader>
                <TableBody emptyContent={"Không tìm thấy mã giảm giá nào"}>
                  {statsData?.discountStats?.map((item: any, index: number) => (
                    <TableRow key={index}>
                      <TableCell>{item.discount_code}</TableCell>
                      <TableCell>{item.times_used}</TableCell>
                      <TableCell>
                        {formatCurrency(item.total_discount_amount)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
