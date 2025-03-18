"use client";
import { getProducts } from "@/app/_service/client/layout";
import { useEffect, useState, Suspense } from "react";
import {
  Button,
  Input,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableColumn,
  Chip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Card,
} from "@nextui-org/react";
import Loading from "@/app/_shared/components/Loading";
import Pagination from "@/app/_shared/components/ui/Pagination";
import { useSearchParams } from "next/navigation";
import Icon from "@/app/_shared/utils/Icon";
import { deleteProduct } from "@/app/_service/admin/products";
import { getCookie } from "cookies-next";
import { enqueueSnackbar } from "notistack";
import DetailProduct from "./DetailProduct";
import AddEditProduct from "./AddEditProduct";
import { getEnabledCategories } from "trace_events";
import { dataFilter } from "@/app/_shared/utils/dataFilter";

function ProductsContent() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [reload, setReload] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || 1;
  const token = getCookie("token");
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const [dataDetail, setDataDetail] = useState<any>(null);
  const [isOpenAddEdit, setIsOpenAddEdit] = useState(false);

  const fetchProducts = async () => {
    setIsLoading(true);
    const res = await getProducts(Number(page), searchTerm);
    if (res.ok) {
      const filteredData =
        categoryFilter === "all"
          ? res.data
          : res.data.filter(
              (product: any) => product.category === categoryFilter
            );
      setProducts(filteredData || []);

      setTotalPages(res.total_pages);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchProducts();
    }, 500);
    return () => clearTimeout(timeout);
  }, [page, searchTerm, reload, categoryFilter]);

  const getCategoryName = (key: string) => {
    const category = dataFilter.find((cat) => cat.key === key);
    return category ? category.value : key;
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) return;
    setLoading(true);
    try {
      const res = await deleteProduct(id, token as string);

      if (res.ok) {
        setReload(!reload);
        enqueueSnackbar(res.message, {
          variant: "success",
        });
      } else {
        enqueueSnackbar(res.message, {
          variant: "error",
        });
      }
    } catch (error) {
      enqueueSnackbar("Có lỗi xảy ra khi xóa sản phẩm", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  if (isOpenAddEdit || localStorage.getItem("OpenAddEdit") === "true")
    return (
      <AddEditProduct
        onClose={() => {
          setIsOpenAddEdit(false);
          localStorage.removeItem("OpenAddEdit");
        }}
        reloadProducts={fetchProducts}
      />
    );

  if (isLoading) return <Loading />;

  return (
    <div className="px-4 py-8 space-y-6 bg-white shadow-md rounded-lg">
      {/* Header Section with Card Style */}
      <div className=" overflow-hidden">
        <h1 className="text-2xl font-bold p-6">Danh Sách Sản Phẩm</h1>

        <div className="p-4">
          <div className="flex flex-col md:flex-row gap-4 w-full">
            <Input
              placeholder="Tìm kiếm sản phẩm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              startContent={<Icon icon="Search" className="text-gray-400" />}
              className="flex-grow"
              size="lg"
              radius="lg"
              variant="bordered"
            />

            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="flat"
                  color="primary"
                  size="lg"
                  className="min-w-[150px]"
                  startContent={<Icon icon="Filter" />}
                >
                  {getCategoryName(categoryFilter).replace("all", "Tất cả")}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Lọc theo danh mục"
                selectionMode="single"
                selectedKeys={[categoryFilter]}
                onSelectionChange={(keys) =>
                  setCategoryFilter(Array.from(keys)[0].toString())
                }
              >
                <DropdownItem key="all">Tất cả</DropdownItem>
                <>
                  {dataFilter.map((category) => (
                    <DropdownItem key={category.key}>
                      {category.value}
                    </DropdownItem>
                  ))}
                </>
              </DropdownMenu>
            </Dropdown>
          </div>

          <div className="mt-4 flex justify-between items-center">
            <p className="text-gray-600">
              Hiển thị <span className="font-medium">{products.length}</span>{" "}
              sản phẩm
            </p>
            <Button
              startContent={<Icon icon="Plus" />}
              size="md"
              variant="flat"
              className="bg-blue-500 text-white"
              onPress={() => {
                localStorage.setItem("OpenAddEdit", "true");
                setIsOpenAddEdit(true);
              }}
            >
              Thêm Mới
            </Button>
          </div>
        </div>
      </div>

      {/* Products Table - Ẩn trên mobile */}
      <div className="hidden md:block bg-white rounded-xl shadow-md overflow-hidden">
        <Table
          aria-label="Bảng danh sách sản phẩm"
          classNames={{
            table: "min-h-[400px]",
          }}
        >
          <TableHeader>
            <TableColumn className="text-base font-semibold bg-gray-50">
              Tên Sản Phẩm
            </TableColumn>
            <TableColumn className="text-base font-semibold bg-gray-50">
              Giá
            </TableColumn>
            <TableColumn className="text-base font-semibold bg-gray-50">
              Số Lượng
            </TableColumn>
            <TableColumn className="text-base font-semibold bg-gray-50">
              Trạng Thái
            </TableColumn>
            <TableColumn className="text-base font-semibold bg-gray-50">
              Hành Động
            </TableColumn>
          </TableHeader>
          <TableBody emptyContent={"Không tìm thấy sản phẩm nào"}>
            {products.map((product: any) => (
              <TableRow
                key={product.id}
                className="hover:bg-blue-50 transition-colors"
              >
                <TableCell>
                  <div className="flex items-center gap-4">
                    <img
                      src={product.images}
                      alt={product.name}
                      className="w-16 h-16 rounded-lg object-cover shadow-sm border border-gray-200"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-800 text-lg">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-2 my-1">
                        <Chip
                          size="sm"
                          variant="flat"
                          color="primary"
                          className="py-1"
                        >
                          {getCategoryName(product.category)}
                        </Chip>
                        <span className="text-xs text-gray-500">
                          ID: {product.id.slice(0, 8)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2 max-w-md">
                        {product.description.slice(0, 100)}...
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="font-medium text-lg text-gray-900">
                    {product.price.toLocaleString("vi-VN")}đ
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium text-lg">
                      {product.quantity}
                    </span>
                    {product.quantity < 10 && (
                      <span className="text-xs text-red-500">Sắp hết hàng</span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  {!product.status ? (
                    <Chip
                      color="success"
                      variant="flat"
                      size="md"
                      className="py-1 px-2"
                    >
                      Hoạt Động
                    </Chip>
                  ) : (
                    <Chip
                      color="danger"
                      variant="flat"
                      size="md"
                      className="py-1 px-2"
                    >
                      Đang đóng
                    </Chip>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      isIconOnly
                      color="primary"
                      variant="flat"
                      size="sm"
                      className="rounded-full"
                      title="Sửa sản phẩm"
                      onPress={() => {
                        localStorage.setItem("dataEditProductId", product.id);
                        localStorage.setItem("OpenAddEdit", "true");
                        setIsOpenAddEdit(true);
                      }}
                    >
                      <Icon icon="Edit" />
                    </Button>
                    <Button
                      isIconOnly
                      color="success"
                      variant="flat"
                      size="sm"
                      className="rounded-full"
                      title="Xem chi tiết"
                      onPress={() => {
                        setIsOpenDetail(true);
                        setDataDetail(product);
                      }}
                    >
                      <Icon icon="Eye" />
                    </Button>
                    <Button
                      isIconOnly
                      color="danger"
                      variant="flat"
                      size="sm"
                      className="rounded-full"
                      title="Xoá sản phẩm"
                      onPress={() => handleDeleteProduct(product.id)}
                      isLoading={loading}
                      disabled={loading}
                    >
                      <Icon icon="Trash" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Danh sách sản phẩm cho mobile */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {products.map((product: any) => (
          <Card key={product.id} className="p-4">
            <div className="flex items-center gap-4">
              <img
                src={product.images}
                alt={product.name}
                className="w-24 h-24 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{product.name}</h3>
                <Chip size="sm" variant="flat" color="primary" className="my-1">
                  {getCategoryName(product.category)}
                </Chip>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {product.description}
                </p>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Giá:</span>
                <span className="font-semibold text-gray-900">
                  {product.price.toLocaleString("vi-VN")}đ
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-500">Số lượng:</span>
                <div className="text-right">
                  <span className="font-semibold">{product.quantity}</span>
                  {product.quantity < 10 && (
                    <p className="text-xs text-red-500">Sắp hết hàng</p>
                  )}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-500">Trạng thái:</span>
                {!product.status ? (
                  <Chip color="success" variant="flat" size="sm">
                    Hoạt Động
                  </Chip>
                ) : (
                  <Chip color="danger" variant="flat" size="sm">
                    Đang đóng
                  </Chip>
                )}
              </div>
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <Button
                color="primary"
                variant="flat"
                size="sm"
                onPress={() => {
                  localStorage.setItem("dataEditProductId", product.id);
                  localStorage.setItem("OpenAddEdit", "true");
                  setIsOpenAddEdit(true);
                }}
              >
                <Icon icon="Edit" />
                Sửa
              </Button>
              <Button
                color="success"
                variant="flat"
                size="sm"
                onPress={() => {
                  setIsOpenDetail(true);
                  setDataDetail(product);
                }}
              >
                <Icon icon="Eye" />
                Chi tiết
              </Button>
              <Button
                color="danger"
                variant="flat"
                size="sm"
                onPress={() => handleDeleteProduct(product.id)}
                isLoading={loading}
                disabled={loading}
              >
                <Icon icon="Trash" />
                Xóa
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center">
        <Pagination page={Number(page)} total={totalPages} />
      </div>
      <DetailProduct
        isOpen={isOpenDetail}
        setIsOpen={setIsOpenDetail}
        data={dataDetail}
      />
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<Loading />}>
      <ProductsContent />
    </Suspense>
  );
}
