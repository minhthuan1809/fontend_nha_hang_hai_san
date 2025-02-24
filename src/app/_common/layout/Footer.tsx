"use client";
import React, { useEffect, useState } from "react";
import Icon from "@/app/_shared/utils/Icon";
import Link from "next/link";
import { Input, Button } from "@nextui-org/react";
import { getFooter } from "@/app/_service/client/layout";
import Loading from "@/app/_shared/components/Loading";

type FooterData = {
  introduction: {
    title: string;
    description: string;
  };
  contacts: {
    icon: string;
    type: string;
  }[];
  social_links: {
    platform: string;
    url: string;
  }[];
  copyright: {
    text: string;
  };
};

export default function Footer() {
  const [footer, setFooter] = useState<FooterData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getFooter();
      setFooter(data.data);
    };
    fetchData();
  }, []);

  if (!footer) {
    return <Loading />;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <>
      <footer className="bg-[#1A1A1A] text-white py-12 border-t border-amber-800/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Giới thiệu */}
            <div>
              <h3 className="text-2xl font-serif font-bold mb-6 text-amber-300">
                {footer.introduction.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {footer.introduction.description}
              </p>
              <div className="flex items-center gap-4 pt-6">
                {footer.social_links.map((link, index) => (
                  <Link key={index} href={link.url} target="_blank">
                    <div className="w-10 h-10 rounded-full bg-amber-800/30 flex items-center justify-center hover:bg-amber-700 transition-colors duration-300">
                      <Icon
                        icon={link.platform}
                        className="text-amber-200"
                        size={22}
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Liên hệ */}
            <div>
              <h3 className="text-2xl font-serif font-bold mb-6 text-amber-300">
                Liên hệ
              </h3>
              <ul className="space-y-4 text-gray-300">
                {footer.contacts.map((contact, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Icon
                      icon={contact.icon}
                      size={22}
                      className="text-amber-400 mt-1"
                    />
                    <span className="leading-relaxed">{contact.type}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Đăng ký nhận ưu đãi */}
            <div>
              <h3 className="text-2xl font-serif font-bold mb-6 text-amber-300">
                Đặt bàn & Ưu đãi
              </h3>
              <div className="bg-gradient-to-b from-amber-950/40 to-gray-900 p-6 rounded-lg border border-amber-800/30 shadow-lg">
                <p className="text-gray-300 mb-4 leading-relaxed">
                  Đặt bàn ngay hôm nay hoặc đăng ký nhận thông tin về các khuyến
                  mãi đặc biệt và thực đơn mới!
                </p>
                <form onSubmit={handleSubmit}>
                  <Input
                    type="text"
                    placeholder="Nhập số điện thoại của bạn"
                    size="lg"
                    radius="sm"
                    classNames={{
                      inputWrapper:
                        "bg-black/30 border border-amber-800/30 focus-within:border-amber-500",
                    }}
                    startContent={
                      <Icon icon="Phone" className="text-amber-400" size={20} />
                    }
                  />
                  <Button
                    size="lg"
                    className="w-full mt-4 bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 transition-colors duration-300 font-medium"
                    type="submit"
                  >
                    Đăng ký ngay
                  </Button>
                  <p className="text-xs text-gray-400 mt-3 text-center">
                    Bằng cách đăng ký, bạn đồng ý với các điều khoản và chính
                    sách bảo mật của chúng tôi.
                  </p>
                </form>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:justify-between items-center border-t border-amber-800/20 mt-12 pt-8 text-gray-400">
            <p>&copy; {footer.copyright.text}</p>
          </div>
        </div>
      </footer>
    </>
  );
}
