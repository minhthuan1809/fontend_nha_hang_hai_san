import { getProductsDetail } from "@/app/_service/client/layout";
import Icon from "@/app/_shared/utils/Icon";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Chip,
  Divider,
} from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function DetailProduct({
  isOpen,
  setIsOpen,
  data,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  data: any;
}) {
  const [productDetail, setProductDetail] = useState<any>(null);
  const [activeImage, setActiveImage] = useState("");

  useEffect(() => {
    console.log(data);
    if (data) {
      getProductsDetail(data.id).then((res: any) => {
        if (res.ok) {
          setProductDetail(res.data);
          setActiveImage(res.data.images[0].image_url);
        }
      });
    }
  }, [data]);

  if (!productDetail) return null;

  return (
    <Drawer
      isDismissable={true}
      isKeyboardDismissDisabled={false}
      isOpen={isOpen}
      onOpenChange={() => setIsOpen(false)}
      placement="left"
      size="5xl"
      classNames={{
        base: "bg-gradient-to-b from-white to-gray-100",
      }}
    >
      <DrawerContent>
        {(isOpen) => (
          <>
            <DrawerHeader className="flex flex-col gap-3 border-b pb-4 px-6">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-primary">
                  {productDetail.name}
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <Chip
                  color="primary"
                  variant="flat"
                  size="lg"
                  className="font-medium"
                >
                  ID: {productDetail.id}
                </Chip>
                <Chip
                  color={!productDetail.status ? "success" : "danger"}
                  variant="flat"
                  size="lg"
                  className="font-medium"
                >
                  {!productDetail.status ? "Hoạt động" : "Đang đóng"}
                </Chip>
              </div>
            </DrawerHeader>

            <DrawerBody className="py-6 px-6">
              <div className="grid grid-cols-12 gap-6">
                {/* Main image and thumbnails */}
                <div className="col-span-12 space-y-4">
                  <div className="relative w-full h-80 overflow-hidden rounded-xl shadow-md">
                    <img
                      src={activeImage}
                      alt={productDetail.name}
                      className="w-full h-full object-cover rounded-xl transition-transform hover:scale-105 duration-300"
                    />
                  </div>

                  <div className="flex gap-3 overflow-x-auto py-2 scrollbar-hide">
                    {productDetail.images.map((image: any, index: number) => (
                      <div
                        key={index}
                        className={`relative min-w-24 h-20 rounded-lg overflow-hidden cursor-pointer border-2 ${
                          activeImage === image.image_url
                            ? "border-primary"
                            : "border-transparent"
                        }`}
                        onClick={() => setActiveImage(image.image_url)}
                      >
                        <img
                          src={image.image_url}
                          alt={`${productDetail.name} ${index + 1}`}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Product info */}
                <div className="col-span-12 space-y-6">
                  <div className="bg-white p-5 rounded-xl shadow-sm">
                    <h3 className="text-2xl font-bold text-primary mb-1">
                      Giá
                    </h3>
                    <p className="text-3xl font-bold text-primary">
                      {productDetail.price}
                    </p>

                    <Divider className="my-4" />

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Icon icon="ShoppingBag" className="text-primary" />
                          <span className="font-medium">Số lượng</span>
                        </div>
                        <p className="text-xl font-bold mt-1">
                          {productDetail.quantity.toLocaleString()}
                        </p>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Icon icon="ShoppingBag" className="text-success" />
                          <span className="font-medium">Đã bán</span>
                        </div>
                        <p className="text-xl font-bold mt-1 text-success">
                          {productDetail.quantity_sold.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2 text-gray-600 mb-2">
                          <Icon
                            icon="Star"
                            className="text-warning"
                            size={20}
                          />
                          <span className="font-medium text-lg">
                            Đánh giá sản phẩm
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <p className="text-2xl font-bold text-warning">
                            {productDetail.star}/5
                          </p>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Icon
                                icon="Star"
                                key={i}
                                className={`${
                                  i < Math.floor(productDetail.star)
                                    ? "text-warning fill-warning"
                                    : "text-gray-200"
                                } transition-colors`}
                                size={24}
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end">
                        <span className="text-gray-500 text-sm">
                          Số lượng đã bán
                        </span>
                        <span className="text-xl font-semibold text-success">
                          {productDetail.quantity_sold.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-xl shadow-sm">
                    <h3 className="font-bold text-gray-600 mb-3">
                      Thông tin thêm
                    </h3>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Icon icon="Calendar" className="text-primary" />
                          <span>Ngày tạo</span>
                        </div>
                        <p className="text-gray-700 font-medium">
                          {productDetail.created_at}
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Icon icon="RefreshCw" className="text-primary" />
                          <span>Cập nhật lần cuối</span>
                        </div>
                        <p className="text-gray-700 font-medium">
                          {productDetail.updated_at}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mt-8">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="font-bold text-xl mb-4 text-primary border-b pb-2">
                    Mô tả Sản Phẩm
                  </h3>
                  <div
                    className="prose max-w-none text-gray-700"
                    dangerouslySetInnerHTML={{
                      __html: productDetail.description
                        .replace(
                          /<ol>/g,
                          '<ol class="list-decimal pl-6 space-y-2">'
                        )
                        .replace(
                          /<ul>/g,
                          '<ul class="list-disc pl-6 space-y-2">'
                        )
                        .replace(
                          /<blockquote>/g,
                          '<blockquote class="border-l-4 border-primary pl-4 my-4 italic text-gray-600">'
                        )
                        .replace(/<\/blockquote>/g, "</blockquote>")
                        .replace(/<p>/g, '<p class="mb-4 leading-relaxed">')
                        .replace(
                          /<h1>/g,
                          '<h1 class="text-2xl font-bold mb-3 text-gray-800">'
                        )
                        .replace(
                          /<h2>/g,
                          '<h2 class="text-xl font-bold mb-3 text-gray-800">'
                        )
                        .replace(
                          /<h3>/g,
                          '<h3 class="text-lg font-bold mb-2 text-gray-800">'
                        ),
                    }}
                  />
                </div>
              </div>
            </DrawerBody>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
}
