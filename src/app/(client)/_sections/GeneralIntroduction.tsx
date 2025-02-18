import React from "react";

export default function GeneralIntroduction() {
  return (
    <div
      className="relative px-4 py-16 bg-cover bg-center bg-no-repeat bg-fixed flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(http://dev.mypagevn.com/ganhhao/wp-content/uploads/2018/02/FOD0088_preview.jpeg)`,
      }}
    >
      <div className="container mx-auto md:w-3/5 bg-white/90 backdrop-blur-md p-8 rounded-xl shadow-2xl">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-8 text-amber-600 font-sans tracking-tight">
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

          <p className="text-lg md:text-xl text-center leading-relaxed italic font-medium border-l-4 border-amber-500 pl-6 mx-auto max-w-3xl">
            Tận hưởng hải sản chất lượng mà không phải lo về giá cả. Chúng tôi
            cam kết mang đến những sản phẩm tươi sạch, an toàn với mức giá hợp
            lý, cùng dịch vụ tận tâm.
          </p>

     
        </div>

        <div className="mt-12 flex justify-center">
          <button className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-10 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg flex items-center space-x-2">
            <span>Đặt bàn ngay</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}