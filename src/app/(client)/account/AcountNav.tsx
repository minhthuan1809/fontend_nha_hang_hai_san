"use client";
import Icon from "@/app/_shared/utils/Icon";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const accountMenu = [
  {
    icon: "CircleUser",
    name: "Thông tin tài khoản",
    url: "/account/account-info",
  },
  {
    icon: "Lock",
    name: "Đổi mật khẩu",
    url: "/account/change-password",
  },
  {
    icon: "MapPin",
    name: "Địa chỉ",
    url: "/account/address",
  },
];

export default function AcountNav() {
  const pathname = usePathname();

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="space-y-2">
        {accountMenu.map((item, index) => (
          <div
            key={index}
            className={`flex items-center justify-between ${
              pathname === item.url
                ? "bg-amber-50 text-amber-600"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Link
              href={item.url}
              className="flex items-center gap-2 rounded-lg p-5"
            >
              <Icon icon={item.icon} size={20} />
              <span className="font-medium">{item.name}</span>
            </Link>
            <Icon icon="ChevronRight" size={20} />
          </div>
        ))}
      </div>
    </div>
  );
}
