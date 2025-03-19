"use client";
import { confirmOrder, getHistoryOrder } from "@/app/_service/admin/order";
import { getCookie } from "cookies-next";
import { useCallback, useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Input,
  Card,
  CardBody,
  Tooltip,
  Chip,
} from "@nextui-org/react";
import ModalViewOder from "../../../_shared/components/modals/ModalViewOder";
import { enqueueSnackbar } from "notistack";
import Icon from "@/app/_shared/utils/Icon";
import { Order, OrderStatus } from "../type";
import Pagination from "@/app/_shared/components/ui/Pagination";
import { useSearchParams } from "next/navigation";
import No_found from "../../No_found";

export default function OrderHistoryPage() {
  const token = getCookie("token");
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isOpen, setIsOpen] = useState(false);
  const [dataView, setDataView] = useState<Order | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const page = useSearchParams().get("page");
  const currentPage = page ? parseInt(page) : 1;
  const [role, setRole] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const res = await getHistoryOrder(
        token as string,
        currentPage,
        searchTerm
      );

      if (res.ok) {
        setRole(false);
        setFilteredOrders(res.data);
        setTotalPages(res.pagination.total_pages);
      } else {
        setRole(true);
        setFilteredOrders([]);
        setTotalPages(0);
      }
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu:", error);
      enqueueSnackbar("Có lỗi xảy ra khi tải dữ liệu", { variant: "error" });
      setRole(true);
    }
  }, [token, searchTerm, currentPage]);

  useEffect(() => {
    const time = setTimeout(() => {
      fetchData();
    }, 1000);
    return () => clearTimeout(time);
  }, [fetchData]);

  const dataOder = filteredOrders.filter((item) => {
    if (statusFilter === "all") return item;
    return item.status === statusFilter;
  });

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

  if (role) {
    return <No_found />;
  }

  return (
    <div className="p-6">
      <Card className="mb-6 shadow-lg">
        <CardBody className="overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Đơn hàng</h1>
              <p className="text-gray-500 mt-2">
                Quản lý và theo dõi tất cả đơn hàng của bạn
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                placeholder="Tìm kiếm theo mã đơn, tên khách hàng..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                startContent={
                  <Icon icon="SearchIcon" className="w-5 h-5 text-gray-400" />
                }
                className="w-full sm:w-80"
                size="lg"
              />
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    variant="flat"
                    endContent={<Icon icon="FilterIcon" className="w-5 h-5" />}
                    className="min-w-[140px]"
                    size="lg"
                  >
                    Lọc trạng thái
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Filter by status"
                  onAction={(key) =>
                    setStatusFilter(key.toString() as OrderStatus)
                  }
                  className="w-[200px]"
                >
                  <DropdownItem key="all" className="text-gray-700">
                    Tất cả
                  </DropdownItem>
                  <DropdownItem key="pending" className="text-yellow-600">
                    Đang xử lý
                  </DropdownItem>
                  <DropdownItem key="completed" className="text-green-600">
                    Hoàn thành
                  </DropdownItem>
                  <DropdownItem key="cancelled" className="text-red-600">
                    Đã hủy
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>

          {/* Bảng cho desktop */}
          <div className="hidden md:block">
            <Table
              aria-label="Bảng đơn hàng"
              classNames={{
                wrapper: "shadow-none",
                th: "bg-gray-50 text-gray-600",
                td: "py-4",
              }}
            >
              <TableHeader>
                <TableColumn>Mã đơn</TableColumn>
                <TableColumn>Khách hàng</TableColumn>
                <TableColumn>Sản phẩm</TableColumn>
                <TableColumn>Tổng tiền</TableColumn>
                <TableColumn>Thời gian</TableColumn>
                <TableColumn align="center">Trạng thái</TableColumn>
              </TableHeader>
              <TableBody emptyContent={"Không tìm thấy đơn hàng nào"}>
                {dataOder.map((order) => (
                  <TableRow
                    key={order.id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => {
                      setDataView(order);
                      setIsOpen(true);
                    }}
                  >
                    <TableCell className="font-medium text-amber-600">
                      #{order.id}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img
                          src={order.user.avatar}
                          alt={order.user.fullName}
                          className="w-12 h-12 rounded-full object-cover border-2 border-amber-200"
                        />
                        <div>
                          <p className="font-semibold text-gray-800">
                            {order.user.fullName}
                          </p>
                          <p className="text-sm text-gray-500">
                            {order.user.email}
                          </p>
                          <Tooltip content={order.address} className="max-w-xs">
                            <p className="text-sm text-gray-500 truncate max-w-[200px]">
                              {order.phone}
                            </p>
                          </Tooltip>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-h-32 overflow-auto">
                        <div className="flex items-center gap-3 mb-2">
                          <img
                            src={order.products[0].img}
                            alt={order.products[0].name}
                            className="w-12 h-12 object-cover rounded-lg border border-gray-200"
                          />
                          <div>
                            <p className="font-medium text-gray-800 line-clamp-1">
                              {order.products[0].name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {order.products[0].price.toLocaleString("vi-VN")}đ
                              x {order.products[0].quantity}
                            </p>
                            {order.products.length > 1 && (
                              <span className="text-sm text-amber-600 font-medium">
                                +{order.products.length - 1} sản phẩm khác
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="font-semibold text-green-600 text-lg">
                        {formatCurrency(order.final_total)}
                      </p>
                      {order.discount_code && (
                        <p className="text-sm text-green-500 flex items-center gap-1">
                          <span className="text-xs">🏷️</span>
                          Mã: {order.discount_code} (-{order.discount_percent}%)
                        </p>
                      )}
                      <p className="text-sm text-gray-500">
                        Ship: {formatCurrency(order.free_of_charge)}
                      </p>
                    </TableCell>

                    <TableCell>
                      <Tooltip content={formatDate(order.created_at)}>
                        <span className="text-gray-600">
                          {new Date(order.created_at).toLocaleDateString(
                            "vi-VN"
                          )}
                        </span>
                      </Tooltip>
                    </TableCell>
                    <TableCell className="flex items-center gap-2">
                      <Chip
                        color={`${
                          order.status === "pending"
                            ? "warning"
                            : order.status === "completed"
                            ? "success"
                            : "danger"
                        }`}
                      >
                        {order.status
                          .replace("pending", "Đang xử lý")
                          .replace("completed", "Hoàn tất")
                          .replace("canceled", "Đã hủy")}
                      </Chip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Danh sách cho mobile */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {dataOder.map((order) => (
              <Card
                key={order.id}
                className="p-4"
                isPressable
                onPress={() => {
                  setDataView(order);
                  setIsOpen(true);
                }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={order.user.avatar}
                      alt={order.user.fullName}
                      className="w-12 h-12 rounded-full object-cover border-2 border-amber-200"
                    />
                    <div>
                      <p className="font-semibold text-gray-800">
                        {order.user.fullName}
                      </p>
                      <p className="text-sm text-gray-500">
                        {order.user.email}
                      </p>
                      <p className="text-sm text-gray-500">{order.phone}</p>
                    </div>
                  </div>
                  <p className="font-medium text-amber-600">#{order.id}</p>
                </div>

                <div className="flex items-center gap-3 mb-4 bg-gray-50 p-3 rounded-lg">
                  <img
                    src={order.products[0].img}
                    alt={order.products[0].name}
                    className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                  />
                  <div>
                    <p className="font-medium text-gray-800 line-clamp-1">
                      {order.products[0].name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {order.products[0].price.toLocaleString("vi-VN")}đ x{" "}
                      {order.products[0].quantity}
                    </p>
                    {order.products.length > 1 && (
                      <span className="text-sm text-amber-600 font-medium">
                        +{order.products.length - 1} sản phẩm khác
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Tổng tiền:</span>
                    <span className="font-semibold text-green-600">
                      {formatCurrency(order.final_total)}
                    </span>
                  </div>

                  {order.discount_code && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Mã giảm giá:</span>
                      <span className="text-green-500">
                        {order.discount_code} (-{order.discount_percent}%)
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Phí ship:</span>
                    <span>{formatCurrency(order.free_of_charge)}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Thời gian:</span>
                    <span className="text-sm">
                      {new Date(order.created_at).toLocaleDateString("vi-VN")}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Trạng thái:</span>
                    <Chip
                      color={`${
                        order.status === "pending"
                          ? "warning"
                          : order.status === "completed"
                          ? "success"
                          : "danger"
                      }`}
                      size="sm"
                    >
                      {order.status
                        .replace("pending", "Đang xử lý")
                        .replace("completed", "Hoàn tất")
                        .replace("canceled", "Đã hủy")}
                    </Chip>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Pagination total={totalPages} page={currentPage} />
        </CardBody>
      </Card>

      {/* Modal view order */}
      <ModalViewOder
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        data={dataView}
        submitEditAddress={() => {}}
        _status={false}
      />
    </div>
  );
}
