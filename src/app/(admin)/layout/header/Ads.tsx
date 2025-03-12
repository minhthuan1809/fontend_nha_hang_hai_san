"use client";
import { getAds } from "@/app/_service/client/layout";
import React, { useEffect, useState } from "react";
import { deleteAd, editAd } from "@/app/_service/admin/ads";
import Icon from "@/app/_shared/utils/Icon";
import { getCookie } from "cookies-next";
import { enqueueSnackbar } from "notistack";
import { Switch } from "@nextui-org/react";
import ModalAddAds from "./modal/ModalAddAds";

interface Ad {
  id: number;
  title: string;
  description?: string;
  image_url: string;
  is_active: boolean;
}

export default function Ads() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = getCookie("token");
  const [refresh, setRefresh] = useState(false);
  const [onOpen, setOnOpen] = useState(false);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        setIsLoading(true);
        const data = await getAds();
        setAds(data.data);
      } catch (error) {
        console.error("Lỗi khi tải quảng cáo:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAds();
  }, [refresh]);

  // xóa quảng cáo
  const handleDeleteAd = async (adId: number) => {
    const confirm = window.confirm("Bạn có chắc chắn muốn xóa quảng cáo này?");
    if (!confirm) return;
    try {
      const res = await deleteAd(adId, token as string);
      if (res.ok) {
        enqueueSnackbar(res.message, {
          variant: "success",
        });
        setRefresh(!refresh);
      } else {
        enqueueSnackbar(res.message, {
          variant: "error",
        });
      }
    } catch (error) {
      console.error("Lỗi khi xóa quảng cáo:", error);
    }
  };

  // bật tắt quảng cáo
  const handleToggleAd = async (adId: number, is_active: boolean) => {
    console.log(adId, is_active);
    try {
      const res = await editAd(
        adId,
        { is_active: !is_active },
        token as string
      );
      if (res.ok) {
        enqueueSnackbar(res.message, {
          variant: "success",
        });
        setRefresh(!refresh);
      } else {
        enqueueSnackbar(res.message, {
          variant: "error",
        });
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái quảng cáo:", error);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Quảng Cáo Trang Chủ
        </h1>
        <button
          className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-m d hover:bg-blue-700 transition-colors"
          onClick={() => setOnOpen(true)}
        >
          <Icon icon="Plus" size={18} />
          <span>Thêm mới</span>
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : ads.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-gray-500">
          <Icon icon="Image" size={48} />
          <p className="mt-4 text-lg">Chưa có quảng cáo nào</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ads.map((ad: any) => (
            <div
              key={ad.id}
              className={`group overflow-hidden rounded-lg shadow-md transition-all hover:shadow-lg ${
                !ad.is_active ? "opacity-70 bg-gray-50" : ""
              }`}
            >
              <div className="relative aspect-video">
                {!ad.is_active && (
                  <div className="absolute top-2 left-2 z-10">
                    <span className="px-2 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
                      Đã tắt
                    </span>
                  </div>
                )}
                <img
                  src={ad.image_url}
                  alt={ad.title}
                  className={`w-full h-full object-cover ${
                    !ad.is_active ? "grayscale" : ""
                  }`}
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300">
                  <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                      onClick={() => handleDeleteAd(ad.id)}
                    >
                      <Icon icon="Trash" className="text-red-500" size={18} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-800">{ad.title}</h3>
                  <Switch
                    isSelected={ad.is_active}
                    onValueChange={() => handleToggleAd(ad.id, ad.is_active)}
                  >
                    {ad.is_active ? "Đang bật" : "Đã tắt"}
                  </Switch>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {ad.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
      <ModalAddAds
        isOpen={onOpen}
        onClose={setOnOpen}
        setRefresh={setRefresh}
      />
    </div>
  );
}
