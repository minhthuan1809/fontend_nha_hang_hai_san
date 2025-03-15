"use client";
import { confirmOrder, getAllOrder } from "@/app/_service/admin/order";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Chip,
  Button,
  Pagination,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Input,
  Card,
  CardBody,
  Tooltip,
  Spinner,
} from "@nextui-org/react";
import { SearchIcon, FilterIcon, EyeIcon } from "lucide-react";
import ModalViewOder from "./ModalViewOder";
import Loading from "@/app/_shared/components/Loading";
import { enqueueSnackbar } from "notistack";

interface User {
  fullName: string;
  email: string;
  avatar: string;
}

interface Product {
  id: number;
  img: string;
  name: string;
  price: number;
  quantity: number;
}

type OrderStatus = "pending" | "completed" | "cancelled";

interface Order {
  id: string;
  user_id: string;
  user: User;
  name: string;
  phone: string;
  address: string;
  discount_code: string;
  discount_percent: string;
  final_total: string;
  free_of_charge: string;
  payment_method: string;
  status: OrderStatus;
  products: Product[];
  created_at: string;
  updated_at: string;
}

export default function OrderPage() {
  const token = getCookie("token");
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isOpen, setIsOpen] = useState(false);
  const [dataView, setDataView] = useState<Order | null>(null);
  const rowsPerPage = 5;
  const [refresh, setRefresh] = useState(false);
  const [status, setStatus] = useState<{ status: string; id: string }[]>([]);

  useEffect(() => {
    setLoading(true);
    getAllOrder(token as string).then((res) => {
      if (res.ok) {
        setOrders(res.data);
        console.log(res.data);

        setFilteredOrders(res.data);
        setStatus(
          res.data.map((item: Order) => ({
            status: item.status,
            id: item.id,
          }))
        );
      }
      setLoading(false);
    });
  }, [token, refresh]);

  useEffect(() => {
    const filtered = orders.filter((order) => {
      const matchesSearch =
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.phone.includes(searchTerm);

      const matchesStatus =
        statusFilter === "all" || order.status === statusFilter;

      return matchesSearch && matchesStatus;
    });

    setFilteredOrders(filtered);
    setPage(1);
  }, [searchTerm, statusFilter, orders]);

  const pages = Math.ceil(filteredOrders.length / rowsPerPage);
  const items = filteredOrders.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

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

  const handleConfirmOrder = async (id: any, number: any) => {
    let _status;
    if (number === 1) _status = status.find((item) => item.id === id)?.status;
    else _status = "canceled";

    if (_status) {
      const res = await confirmOrder(
        token as string,
        id,
        _status === "canceled"
          ? "canceled"
          : _status === "pending"
          ? "processing"
          : "completed"
      );
      if (res.ok) {
        setRefresh((prev) => !prev);
        enqueueSnackbar(res.message, { variant: "success" });
      } else {
        enqueueSnackbar(res.message, { variant: "error" });
      }
    }
  };

  if (loading) {
    return <Loading />;
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
                startContent={<SearchIcon className="w-5 h-5 text-gray-400" />}
                className="w-full sm:w-80"
                size="lg"
              />
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    variant="flat"
                    endContent={<FilterIcon className="w-5 h-5" />}
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

          <Table
            aria-label="Bảng đơn hàng"
            bottomContent={
              pages > 1 ? (
                <div className="flex justify-center py-4">
                  <Pagination
                    total={pages}
                    page={page}
                    onChange={(newPage) => setPage(newPage)}
                    showControls
                    classNames={{
                      cursor: "bg-amber-500",
                    }}
                  />
                </div>
              ) : null
            }
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
              <TableColumn align="center">Thao tác</TableColumn>
            </TableHeader>
            <TableBody emptyContent={"Không tìm thấy đơn hàng nào"}>
              {items.map((order) => (
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
                        {new Date(order.created_at).toLocaleDateString("vi-VN")}
                      </span>
                    </Tooltip>
                  </TableCell>
                  <TableCell className="flex items-center gap-2">
                    <Button
                      color="primary"
                      variant="flat"
                      className="w-full font-medium"
                      size="md"
                      onPress={() => handleConfirmOrder(order.id, 1)}
                    >
                      {status
                        .find((item) => item.id === order.id)
                        ?.status.replace("pending", "Xác nhận")
                        .replace("processing", "Đang xử lý")
                        .replace("completed", "Hoàn thành")}
                    </Button>
                    {status.find((item) => item.id === order.id)?.status ===
                      "pending" && (
                      <Button
                        color="danger"
                        variant="flat"
                        className="w-full font-medium"
                        size="md"
                        onPress={() => handleConfirmOrder(order.id, 0)}
                      >
                        Hủy
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      {/* Modal view order */}
      <ModalViewOder isOpen={isOpen} onOpenChange={setIsOpen} data={dataView} />
    </div>
  );
}
