import React from "react";
import Icon from "@/app/_shared/utils/Icon";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Giới thiệu về hải sản Minh Thuận",
  description: "Giới thiệu về nhà hàng hải sản Minh Thuận",
};

const AboutDetail = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="max-w-6xl mx-auto py-16 px-4">
        {/* History Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-amber-600 mb-6 text-center">
            Câu Chuyện Của Chúng Tôi
          </h2>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <p className="text-gray-700 mb-4">
              Nhà hàng Hải Sản Minh Thuận được thành lập từ năm 2003, khởi đầu
              là một quán ăn nhỏ với tâm huyết mang đến những món hải sản tươi
              ngon nhất cho thực khách. Qua hơn 20 năm phát triển, chúng tôi đã
              trở thành một trong những nhà hàng hải sản uy tín nhất trong khu
              vực.
            </p>
            <p className="text-gray-700">
              Với sự phát triển của công nghệ, chúng tôi đã mở rộng dịch vụ sang
              mảng đặt hàng trực tuyến và giao hàng tận nơi, giúp thực khách có
              thể thưởng thức các món ăn ngon của nhà hàng ngay tại nhà.
            </p>
          </div>
        </div>

        {/* Kitchen Workspace Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-amber-600 mb-6 text-center">
            Không Gian
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <Icon icon="ChefHat" className="w-12 h-12 text-amber-600 mb-4" />
              <h3 className="text-xl font-semibold mb-4">
                Khu Vực Bếp Chuyên Nghiệp
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Diện tích bếp rộng rãi trên 200m²</li>
                <li>
                  • Trang thiết bị hiện đại, đạt chuẩn vệ sinh an toàn thực phẩm
                </li>
                <li>• Khu vực sơ chế và chế biến riêng biệt</li>
                <li>• Hệ thống làm mát và thông gió tiêu chuẩn</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <Icon icon="Award" size={48} className="text-amber-600 mb-4" />
              <h3 className="text-xl font-semibold mb-4">Đội Ngũ Bếp</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Đầu bếp trưởng với hơn 15 năm kinh nghiệm</li>
                <li>• Đội ngũ phụ bếp được đào tạo chuyên nghiệp</li>
                <li>• Quy trình chế biến chuẩn mực</li>
                <li>• Kiểm soát chất lượng nghiêm ngặt</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Core Values Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 md:gap-8 gap-2 mb-16">
          <div className="bg-white md:p-6 py-4 rounded-lg shadow-lg text-center">
            <Icon
              icon="Award"
              size={48}
              className="text-amber-600 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Chất Lượng</h3>
            <p className="text-gray-600">
              Cam kết sử dụng hải sản tươi sống 100%
            </p>
          </div>

          <div className="bg-white md:p-6 py-4 rounded-lg shadow-lg text-center">
            <Icon
              icon="Utensils"
              size={48}
              className="text-amber-600 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Đa Dạng</h3>
            <p className="text-gray-600">
              Thực đơn phong phú với hơn 100 món ăn
            </p>
          </div>

          <div className="bg-white md:p-6 py-4 rounded-lg shadow-lg text-center">
            <Icon
              icon="Users"
              size={48}
              className="text-amber-600 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Phục Vụ</h3>
            <p className="text-gray-600">
              Đội ngũ nhân viên chuyên nghiệp, thân thiện
            </p>
          </div>

          <div className="bg-white md:p-6 py-4 rounded-lg shadow-lg text-center">
            <Icon
              icon="ThumbsUp"
              size={48}
              className="text-amber-600 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Uy Tín</h3>
            <p className="text-gray-600">20 năm kinh nghiệm phục vụ</p>
          </div>
        </div>

        {/* Online Service Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-amber-600 mb-6 text-center">
            Dịch Vụ Đặt Hàng Online
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <Icon icon="Truck" size={48} className="text-amber-600 mb-4" />
              <h3 className="text-xl font-semibold mb-4">Giao Hàng Tận Nơi</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Phạm vi giao hàng: 10km từ nhà hàng</li>
                <li>• Thời gian giao hàng: 30-45 phút</li>
                <li>• Đóng gói cẩn thận, giữ nhiệt tốt</li>
                <li>• Miễn phí giao hàng cho đơn từ 500.000đ</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <Icon icon="Clock" size={48} className="text-amber-600 mb-4" />
              <h3 className="text-xl font-semibold mb-4">Thời Gian Phục Vụ</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Nhà hàng: 10:00 - 22:00</li>
                <li>• Đặt hàng online: 10:00 - 21:00</li>
                <li>• Phục vụ tất cả các ngày trong tuần</li>
                <li>• Hotline đặt hàng: 0123 456 789</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Ordering Process */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-amber-600 mb-6 text-center">
            Quy Trình Đặt Hàng
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <Icon
                icon="ShoppingBag"
                size={48}
                className="text-amber-600 mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Chọn Món</h3>
              <p className="text-gray-600">
                Dễ dàng đặt hàng qua website hoặc gọi điện trực tiếp
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <Icon
                icon="CreditCard"
                size={48}
                className="text-amber-600 mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Thanh Toán</h3>
              <p className="text-gray-600">
                Đa dạng phương thức thanh toán: tiền mặt, chuyển khoản, ví điện
                tử
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <Icon
                icon="Truck"
                size={48}
                className="text-amber-600 mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Giao Hàng</h3>
              <p className="text-gray-600">
                Giao hàng nhanh chóng, đảm bảo chất lượng món ăn
              </p>
            </div>
          </div>
        </div>

        {/* Commitment Section */}
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-3xl font-bold text-amber-600 mb-6">
            Cam Kết Của Chúng Tôi
          </h2>
          <div className="text-gray-700 space-y-4">
            <p>• Đảm bảo chất lượng món ăn như tại nhà hàng</p>
            <p>• Giao hàng đúng giờ, đúng địa chỉ</p>
            <p>• Đổi trả miễn phí nếu món ăn không đạt yêu cầu</p>
            <p>• Nhân viên giao hàng chuyên nghiệp, thân thiện</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutDetail;
