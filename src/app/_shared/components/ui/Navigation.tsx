"use client"
import Icon from "@/app/_shared/utils/Icon";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  const title = pathname.split("/");

  const  replaceText = (text: string) => {
    return text.replace("news", "Tin Tức").replace("contact", "Liên hệ").replace("products", "Sản phẩm").replace("about", "Về chúng tôi").replace("support", "Hỗ trợ").replace(/_/g, " ") ;
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <Link href="/" className="flex justify-center items-center gap-2 hover:text-amber-400 hover:underline decoration-amber-400">
          <Icon icon="House" size={20} className="-mt-1 text-amber-400" />
          <span className="leading-relaxed text-amber-400">Trang chủ</span>
        </Link>
        <span>/</span>
        {
          title.map((item, index) => {
            if (index === 0) return null;
            
            let path = title.slice(1, index + 1).join('/');
            
            return (
              <div key={index} className="flex items-center gap-2">
                {index === title.length - 1 ? (
                  <span className="hover:text-amber-400 hover:underline decoration-amber-400 cursor-pointer">
                    {replaceText(item)}
                  </span>
                ) : (
                  <Link href={`/${path}`} className="hover:text-amber-400 hover:underline decoration-amber-400">
                    {replaceText(item)}
                  </Link>
                )}
                {index < title.length - 1 && <span>/</span>}
              </div>
            )
          })
        }
      </div>
    </div>
  );
}
