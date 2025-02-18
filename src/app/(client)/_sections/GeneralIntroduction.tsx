import React from "react";

export default function GeneralIntroduction() {
  return (
    <div
      className="relative px-4 py-16 bg-cover bg-center bg-no-repeat bg-fixed  flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)), url(https://picsum.photos/1920/1080)`,
      }}
    >
      <div className="container mx-auto w-1/2 bg-white/80 backdrop-blur-md p-8 rounded-lg shadow-xl">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-8 text-teal-600 font-serif tracking-tight">
          Minh Thuận
        </h1>

        <div className="space-y-8 text-gray-800">
          <p className="text-lg md:text-xl text-center leading-relaxed">
            Nhà hàng hải sản Minh Thuận là điểm đến lý tưởng cho những tín đồ
            yêu thích hải sản tươi sống. Tọa lạc ngay sát bờ biển Bình Thuận,
            Minh Thuận tự hào mang đến nguồn hải sản tươi ngon nhất, được đánh
            bắt trực tiếp mỗi ngày. Với hơn 50 loại hải sản phong phú, chế biến
            theo công thức đặc biệt, chúng tôi mang đến những món ăn thơm ngon,
            đậm đà hương vị biển cả, khiến thực khách nhớ mãi không quên.
          </p>

          <p className="text-lg md:text-xl text-center leading-relaxed italic font-medium border-l-4 border-teal-500 pl-6 mx-auto max-w-3xl">
            Tận hưởng hải sản chất lượng mà không phải lo về giá cả. Chúng tôi
            cam kết mang đến những sản phẩm tươi sạch, an toàn với mức giá hợp
            lý, cùng dịch vụ tận tâm.
          </p>

          <p className="text-lg md:text-xl text-center leading-relaxed font-semibold text-teal-700 mt-4 p-4 rounded-lg bg-teal-50 shadow-inner">
            Sự hài lòng của khách hàng chính là kim chỉ nam trong mọi hoạt động
            của nhà hàng Minh Thuận.
          </p>
        </div>

        <div className="mt-12 flex justify-center">
          <button className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105 shadow-lg">
            Đặt bàn ngay
          </button>
        </div>
      </div>
    </div>
  );
}
