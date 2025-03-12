"use client";

import { useState, useEffect } from "react";
import { Button, Checkbox, Input, Select, SelectItem } from "@nextui-org/react";
import { getCookie } from "cookies-next";
import { getProductsDetail } from "@/app/_service/client/layout";
import {
  addImgProduct,
  addProduct,
  deleteImg,
  editProduct,
} from "@/app/_service/admin/products";
import { enqueueSnackbar } from "notistack";
import { uploadImageToCloudinaryAddProduct } from "@/app/_service/admin/upload_img_cloudinary";
import TipTapEditor from "@/app/_shared/components/ui/TipTapEditor";
import Icon from "@/app/_shared/utils/Icon";

export default function AddEditProduct({
  onClose,
  reloadProducts,
}: {
  onClose: () => void;
  reloadProducts: () => void;
}) {
  const [isSaving, setIsSaving] = useState(false);
  const [images, setImages] = useState<any>([]);
  const [editorContent, setEditorContent] = useState("");
  const [reload, setReload] = useState(false);
  const token = getCookie("token");
  const [loadingAddImg, setLoadingAddImg] = useState(false);
  const [form, setForm] = useState({
    name: "",
    price: "",
    quantity: "",
    category: "",
    status: false,
    hot: false,
  });
  let dataEditId = localStorage.getItem("dataEditProductId");
  useEffect(() => {
    if (dataEditId) {
      localStorage.setItem("dataEditProductId", dataEditId);
      getProductsDetail(
        localStorage.getItem("dataEditProductId") || dataEditId
      ).then((res) => {
        const data = res.data;
        setForm({
          name: data.name || "",
          price: data.price || "",
          quantity: data.quantity || "",
          category: data.category || "",
          status: data.status || false,
          hot: data.hot || false,
        });
        setImages(data.images || []);
        setEditorContent(data.description || "");
      });
    }
  }, [dataEditId, reload]);

  const handleSelectImg = (id: number) => {
    const file = document.createElement("input");
    file.type = "file";
    file.accept = "image/*";
    file.click();
    file.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (!target.files) return;
      const file = target.files[0];
      if (id === 0) {
        handleUploadImage(file);
      } else {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImages([...images, { image_url: e.target?.result }]);
        };
        reader.readAsDataURL(file);
      }
    };
  };
  // handle delete img
  const handleDeleteImg = (id: any) => {
    if (!confirm("Bạn có chắc chắn muốn xóa ảnh này không?")) return;
    deleteImg(id, token as string).then((res) => {
      if (res.ok) {
        enqueueSnackbar(res.message, { variant: "success" });
        setReload(!reload);
      } else {
        enqueueSnackbar(res.message, { variant: "error" });
      }
    });
  };
  // handle add product
  const handleAddProduct = async () => {
    try {
      if (!images || images.length === 0) {
        enqueueSnackbar("Vui lòng thêm ít nhất một hình ảnh cho sản phẩm", {
          variant: "error",
        });
        return;
      }
      if (!form.name || !form.price || !form.quantity || !form.category) {
        enqueueSnackbar("Vui lòng điền đầy đủ thông tin", {
          variant: "error",
        });
        return;
      }

      setIsSaving(true);
      const uploadPromises = images.map((img: any) => {
        if (img.image_url.startsWith("data:")) {
          return uploadImageToCloudinaryAddProduct(img.image_url);
        }
        return Promise.resolve(img);
      });

      const uploadedImages = await Promise.all(uploadPromises);
      const imageUrls = uploadedImages.map(
        (img) => img.secure_url || img.image_url
      );

      const productData = {
        ...form,
        description: editorContent.replace(/<[^>]*>/g, ""), // Remove HTML tags
        images: imageUrls,
      };

      const res = await addProduct(productData, token as string);

      if (res.ok) {
        enqueueSnackbar(res.message, { variant: "success" });
        onClose();
        localStorage.removeItem("dataEditProductId");
        reloadProducts();
      } else {
        enqueueSnackbar(res.message || "Có lỗi xảy ra", { variant: "error" });
      }
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm:", error);
      enqueueSnackbar("Có lỗi xảy ra khi thêm sản phẩm", { variant: "error" });
    } finally {
      setIsSaving(false);
    }
  };
  const handleUploadImage = async (file: File) => {
    try {
      setLoadingAddImg(true);
      const res = await uploadImageToCloudinaryAddProduct(file);
      if (res.secure_url && dataEditId) {
        addImgProduct(
          dataEditId,
          { image_url: res.secure_url },
          token as string
        ).then((res) => {
          if (res.ok) {
            enqueueSnackbar(res.message, { variant: "success" });
            setReload(!reload);
          } else {
            enqueueSnackbar(res.message, { variant: "error" });
          }
        });
      }
    } catch (error) {
      console.error("Lỗi khi thêm ảnh:", error);
      enqueueSnackbar("Có lỗi xảy ra khi thêm ảnh", { variant: "error" });
    } finally {
      setLoadingAddImg(false);
    }
  };

  const handleEditProduct = () => {
    if (dataEditId) {
      editProduct(
        dataEditId,
        {
          ...form,
          description: editorContent || "", // Thêm kiểm tra null/undefined
        },
        token as string
      ).then((res) => {
        if (res.ok) {
          enqueueSnackbar(res.message, { variant: "success" });
          onClose();
          reloadProducts();
          localStorage.removeItem("dataEditProductId");
        } else {
          enqueueSnackbar(res.message, { variant: "error" });
        }
      });
    } else {
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6  mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        {dataEditId ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
      </h1>

      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Hình ảnh sản phẩm
        </h2>
        <div className="flex flex-wrap gap-6 justify-center">
          {images?.map((image: any, index: number) => (
            <div key={index} className="w-32 h-32 relative group">
              <div
                className="absolute top-2 right-2 bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                onClick={() => handleDeleteImg(image.id)}
              >
                <Icon
                  icon="Trash"
                  className="w-5 h-5 text-red-500 hover:text-red-700 transition-colors cursor-pointer"
                />
              </div>
              <img
                src={image.image_url}
                alt=""
                className="w-full h-full object-cover rounded-xl shadow-md hover:shadow-xl transition-all"
              />
            </div>
          ))}
          <div
            className="w-32 h-32 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all"
            onClick={() => handleSelectImg(dataEditId ? 0 : 1)}
          >
            {loadingAddImg ? (
              <Icon
                icon="Loader"
                className="w-12 h-12 animate-spin text-blue-500"
              />
            ) : (
              <Icon icon="Plus" className="w-12 h-12 text-gray-400" />
            )}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Tên sản phẩm"
            value={form.name || ""}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full"
            size="lg"
            variant="bordered"
          />
          <Input
            label="Giá sản phẩm"
            value={form.price?.toString().replace(/ ₫/g, "") || ""}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="w-full"
            size="lg"
            type="number"
            variant="bordered"
            endContent={<span className="text-gray-500">₫</span>}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Số lượng sản phẩm"
            value={form.quantity || ""}
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
            className="w-full"
            size="lg"
            variant="bordered"
            type="number"
          />
          <Select
            label="Danh mục sản phẩm"
            selectedKeys={[form.category || ""]}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full"
            size="lg"
            variant="bordered"
          >
            {[
              { key: "fish", value: "Cá" },
              { key: "shrimp", value: "Tôm" },
              { key: "crab", value: "Cua/Ghẹ" },
              { key: "squid", value: "Mực" },
              { key: "drink", value: "Đồ uống" },
            ].map((item) => (
              <SelectItem key={item.key} value={item.key}>
                {item.value}
              </SelectItem>
            ))}
          </Select>
        </div>

        <div className="flex items-center gap-6 bg-gray-50 p-4 rounded-lg">
          <Checkbox
            isSelected={form.status || false}
            onValueChange={() => setForm({ ...form, status: !form.status })}
            className="text-lg"
          >
            Khóa sản phẩm
          </Checkbox>
          <Checkbox
            isSelected={form.hot || false}
            onValueChange={() => setForm({ ...form, hot: !form.hot })}
            className="text-lg"
          >
            Sản phẩm nổi bật
          </Checkbox>
        </div>
      </div>

      <div className="mt-8 bg-gray-50 rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Mô tả sản phẩm
        </h2>
        <TipTapEditor content={editorContent} onUpdate={setEditorContent} />
      </div>

      <div className="mt-8 flex justify-end gap-4">
        <Button
          color="danger"
          variant="light"
          size="lg"
          onPress={() => {
            if (!confirm("Bạn có chắc chắn muốn hủy không?")) return;
            localStorage.removeItem("dataEditProductId");
            setForm({
              name: "",
              price: "",
              quantity: "",
              category: "",
              status: false,
              hot: false,
            });
            setImages([]);
            setEditorContent("");
            onClose();
          }}
          isDisabled={isSaving}
        >
          Hủy
        </Button>
        <Button
          color="primary"
          size="lg"
          onPress={dataEditId ? handleEditProduct : handleAddProduct}
          isLoading={isSaving}
          isDisabled={isSaving}
        >
          {dataEditId ? "Lưu thay đổi" : "Thêm sản phẩm"}
        </Button>
      </div>
    </div>
  );
}
