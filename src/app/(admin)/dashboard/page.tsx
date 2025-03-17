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
  BarChart,
  Bar,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import Icon from "@/app/_shared/utils/Icon";
import { getDashboard } from "@/app/_service/client/dashboard";
import Link from "next/link";

const COLORS = ["#6366f1", "#10b981", "#f59e0b", "#ef4444"];

interface RevenueByMonth {
  month: number;
  revenue: number;
  total_orders: number;
}

interface OrderStatus {
  pending: number;
  processing: number;
  completed: number;
  canceled: number;
  total: number;
}

interface TopProduct {
  id: string;
  name: string;
  price: string;
  quantity_sold: string;
  category: string;
}

interface TopDiscount {
  code: string;
  name: string;
  discount_percent: string;
  usage_count: string;
}

interface DashboardData {
  revenue_by_month: RevenueByMonth[];
  revenue_by_day: number;
  top_products: TopProduct[];
  order_status: OrderStatus;
  accounts_today: number;
  completion_rate: number;
  top_discounts: TopDiscount[];
}

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    revenue_by_month: [],
    revenue_by_day: 0,
    top_products: [],
    order_status: {
      pending: 0,
      processing: 0,
      completed: 0,
      canceled: 0,
      total: 0,
    },
    accounts_today: 0,
    completion_rate: 0,
    top_discounts: [],
  });

  // Định dạng tiền tệ VND
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  useEffect(() => {
    const fetchDashboard = async () => {
      const res = await getDashboard();
      setDashboardData(res);
    };
    fetchDashboard();
  }, []);

  const revenueData = dashboardData.revenue_by_month.map((item) => ({
    month: `Tháng ${item.month}`,
    doanhThu: item.revenue,
    donHang: item.total_orders,
  }));

  const orderStatusData = [
    { name: "Đang xử lý", value: dashboardData.order_status.pending },
    { name: "Đang giao", value: dashboardData.order_status.processing },
    { name: "Hoàn thành", value: dashboardData.order_status.completed },
    { name: "Đã hủy", value: dashboardData.order_status.canceled },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b px-7 py-4">
        <div className=" py-4  mx-auto">
          <h1 className="text-2xl font-bold text-slate-800">Tổng quan</h1>
          <p className="text-slate-500 text-sm mt-1">
            Thông tin hoạt động kinh doanh của bạn
          </p>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <Icon icon="Calendar" className="w-4 h-4 text-slate-500" />
            <p className="text-slate-500 text-sm">
              Ngày hiện tại: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      <div className=" mx-auto p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-md border border-slate-100 p-6 relative overflow-hidden">
            <div className="absolute right-0 top-0 bg-indigo-500/10 p-4 rounded-bl-lg">
              <Icon icon="TrendingUp" className="w-6 h-6 text-indigo-500" />
            </div>
            <p className="text-sm font-medium text-slate-500">Tổng doanh thu</p>
            <h3 className="text-2xl font-bold mt-2 text-slate-800">
              {formatCurrency(dashboardData.revenue_by_day)}
            </h3>
            <div className="flex items-center mt-3 text-xs">
              <span className="flex items-center text-emerald-500 font-medium">
                <Icon icon="CalendarFold" className="w-4 h-4 " />
              </span>
              <span className="text-slate-400 ml-2">Tính theo ngày</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md border border-slate-100 p-6 relative overflow-hidden">
            <div className="absolute right-0 top-0 bg-emerald-500/10 p-4 rounded-bl-lg">
              <Icon icon="ShoppingBag" className="w-6 h-6 text-emerald-500" />
            </div>
            <p className="text-sm font-medium text-slate-500">Đơn hàng</p>
            <h3 className="text-2xl font-bold mt-2 text-slate-800">
              {dashboardData.order_status.total}
            </h3>
            <div className="flex items-center mt-3 text-xs">
              <span className="flex items-center text-emerald-500 font-medium">
                <Icon icon="CalendarFold" className="w-4 h-4 " />
              </span>
              <span className="text-slate-400 ml-2">Tính theo ngày</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md border border-slate-100 p-6 relative overflow-hidden">
            <div className="absolute right-0 top-0 bg-amber-500/10 p-4 rounded-bl-lg">
              <Icon icon="Users" className="w-6 h-6 text-amber-500" />
            </div>
            <p className="text-sm font-medium text-slate-500">Khách hàng mới</p>
            <h3 className="text-2xl font-bold mt-2 text-slate-800">
              {dashboardData.accounts_today}
            </h3>
            <div className="flex items-center mt-3 text-xs">
              <span className="flex items-center text-emerald-500 font-medium">
                <Icon icon="CalendarFold" className="w-4 h-4 " />
              </span>
              <span className="text-slate-400 ml-2">Tính theo ngày</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md border border-slate-100 p-6 relative overflow-hidden">
            <div className="absolute right-0 top-0 bg-rose-500/10 p-4 rounded-bl-lg">
              <Icon icon="BarChart2" className="w-6 h-6 text-rose-500" />
            </div>
            <p className="text-sm font-medium text-slate-500">
              Tỷ lệ hoàn thành đơn
            </p>
            <h3 className="text-2xl font-bold mt-2 text-slate-800">
              {dashboardData.completion_rate}%
            </h3>
            <div className="flex items-center mt-3 text-xs">
              <span className="flex items-center text-emerald-500 font-medium">
                <Icon icon="CalendarFold" className="w-4 h-4 " />
              </span>
              <span className="text-slate-400 ml-2">Tính theo ngày</span>
            </div>
          </div>
        </div>

        {/* Main Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Revenue Chart */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md border border-slate-100 overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-slate-800">Biểu đồ doanh thu</h3>
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-1 text-xs bg-indigo-50 text-indigo-600 rounded-md font-medium hover:bg-indigo-100 transition-colors">
                    Tháng
                  </button>
                </div>
              </div>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient
                        id="colorRevenue"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#818cf8"
                          stopOpacity={0.4}
                        />
                        <stop
                          offset="95%"
                          stopColor="#818cf8"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis
                      dataKey="month"
                      stroke="#94a3b8"
                      axisLine={false}
                      tickLine={false}
                      dy={10}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis
                      stroke="#94a3b8"
                      axisLine={false}
                      tickLine={false}
                      dx={-10}
                      tickFormatter={(value) => `${value / 1000000}M`}
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip
                      formatter={(value) => formatCurrency(value as number)}
                      contentStyle={{
                        backgroundColor: "white",
                        border: "none",
                        borderRadius: "0.5rem",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                        padding: "8px 12px",
                        fontSize: "12px",
                      }}
                      labelStyle={{ fontWeight: "bold", marginBottom: "4px" }}
                    />
                    <Area
                      type="monotone"
                      dataKey="doanhThu"
                      stroke="#818cf8"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorRevenue)"
                      dot={{
                        stroke: "#818cf8",
                        strokeWidth: 2,
                        fill: "white",
                        r: 4,
                      }}
                      activeDot={{
                        stroke: "#818cf8",
                        strokeWidth: 2,
                        fill: "white",
                        r: 6,
                      }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Order Status */}
          <div className="bg-white rounded-lg shadow-md border border-slate-100 overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-slate-800">
                  Trạng thái đơn hàng
                </h3>
                <Link
                  href="/orders/confirm"
                  className="text-xs text-indigo-600 flex items-center"
                >
                  <span>Chi tiết</span>
                  <Icon icon="ChevronRight" className="w-4 h-4 ml-1" />
                </Link>
              </div>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={orderStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {orderStatusData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                          stroke="none"
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        border: "none",
                        borderRadius: "0.5rem",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                {orderStatusData.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></div>
                    <div>
                      <p className="text-xs font-medium text-slate-600">
                        {item.name}
                      </p>
                      <p className="text-xs text-slate-400">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Top Products */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md border border-slate-100 overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-slate-800">Sản phẩm bán chạy</h3>
                <Link
                  href="/product"
                  className="text-xs text-indigo-600 flex items-center"
                >
                  <span>Xem tất cả</span>
                  <Icon icon="ChevronRight" className="w-4 h-4 ml-1" />
                </Link>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={dashboardData.top_products
                      .slice(0, 10)
                      .map((product) => ({
                        id: product.id,
                        sales: parseInt(product.quantity_sold),
                        name: product.name,
                      }))}
                    barGap={12}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#f1f5f9"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="id"
                      stroke="#94a3b8"
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis stroke="#94a3b8" axisLine={false} tickLine={false} />
                    <Tooltip
                      cursor={{ fill: "#f8fafc" }}
                      contentStyle={{
                        backgroundColor: "white",
                        border: "none",
                        borderRadius: "0.5rem",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      }}
                      formatter={(value, _, props) => {
                        return [`${value} sản phẩm`, props.payload.name];
                      }}
                    />
                    <Bar
                      dataKey="sales"
                      fill="#6366f1"
                      radius={[4, 4, 0, 0]}
                      name="Số lượng bán"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-lg shadow-md border border-slate-100 overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-slate-800">
                  Mã giảm giá được dùng nhiều
                </h3>
                <button className="text-xs text-indigo-600 ">
                  <Link
                    href="/discount/history"
                    className="flex items-center gap-2"
                  >
                    <span>Xem tất cả</span>
                    <Icon icon="ChevronRight" className="w-4 h-4 ml-1" />
                  </Link>
                </button>
              </div>
              <div className="space-y-4">
                {dashboardData.top_discounts.map((discount, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="bg-indigo-100 text-indigo-600 w-8 h-8 rounded-lg flex items-center justify-center">
                      <Icon icon="Ticket" className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-700">
                        {discount.code} - {discount.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        Giảm {discount.discount_percent}% - Đã dùng{" "}
                        {discount.usage_count} lần
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
