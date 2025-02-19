import Navigation from "@/app/_shared/components/ui/Navigation";
import React from "react";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tin tức tại nhà hàng hải sản Minh Thuận",
  description: "Tin tức tại nhà hàng hải sản Minh Thuận",
};

export default async function NewsDetailPage() {
  // Giả sử đây là HTML nhận được từ server
  const htmlContent = `
    <div class="article-content">
      <p class="text-base leading-relaxed mb-4">Tôm rang me được ngợi là món ăn đơn giản, dễ ăn và dễ chế biến. Vị ngọt từ tôm kết hợp với vị chua của me chính ngọt ngon của me, thêm chút nước mắm vừa miệng.</p>
      
      <h2 class="text-2xl font-bold mt-6 mb-4">Nguyên liệu cần chuẩn bị để thực hiện món tôm rang me bao gồm:</h2>
      <ul class="list-disc pl-6 mb-6">
        <li class="mb-2">Tôm sú đã làm sạch</li>
        <li class="mb-2">Me tươi</li>
        <li class="mb-2">Hành lá, rau ăn</li>
        <li class="mb-2">Những thành phần khác như nước mắm, dầu ăn, đường...</li>
      </ul>

      <h2 class="text-2xl font-bold mt-6 mb-4">Cách sơ chế nguyên liệu chế biến:</h2>
      <ul class="list-disc pl-6 mb-6">
        <li class="mb-2">Tôm rửa sạch, đánh vảy và cắt râu</li>
        <li class="mb-2">Ngâm tôm với nước muối, rửa sạch với nước, để ráo sau đó chế biến</li>
        <li class="mb-2">Đồ gia vị</li>
      </ul>

      <h2 class="text-2xl font-bold mt-6 mb-4">Cách làm tôm rang me như sau:</h2>
      <p class="text-base leading-relaxed">Bắt đầu, cho nướng chảo, sau đó cho 1 muỗng dầu ăn vào. Phi đầu tôm lên, cho 1 muỗng nước bột đầu để tạo màu sắc. Đầu tiên, bắt đầu rây khoảng 2 – 3 phút là có thể tắt bếp. Hỗn hợp đầu có màu đỏ, mùi thơm.</p>
    </div>
  `;

  return (
    <div className="container mx-auto p-4 max-w-7xl min-h-screen">
      <Navigation />

      <div className="mt-8">
        <h1 className="text-3xl font-bold mb-4">
          Cách làm tôm rang me chua ngọt cực ngon dành cho cả gia đình
        </h1>

        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
    </div>
  );
}
