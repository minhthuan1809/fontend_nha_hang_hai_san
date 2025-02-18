import React from "react";
import { Check, Utensils, ThumbsUp, Cookie } from "lucide-react";
import Image from "next/image";

const SelectSection = () => {
  const features = [
    {
      icon: <Cookie className="w-8 h-8" />,
      title: "Thực phẩm sạch, tươi ngon nhất",
      description: "được lựa chọn kỹ càng",
    },
    {
      icon: <Utensils className="w-8 h-8" />,
      title: "Duy trì hương vị và chất lượng",
      description: "thực phẩm ngon nhất",
    },
    {
      icon: <Check className="w-8 h-8" />,
      title: "Món ăn được chế biến phong phú",
      description: "và đa dạng",
    },
    {
      icon: <ThumbsUp className="w-8 h-8" />,
      title: "Giá cả ổn định, phong cách phục vụ",
      description: "chuyên nghiệp",
    },
  ];

  return (
    <div className="relative py-24 bg-amber-50">
      <div className="absolute inset-0">
       <Image
           src="http://dev.mypagevn.com/ganhhao/wp-content/uploads/2018/02/FOD0020_preview.jpeg"
          alt="Background"
          fill
          className="object-cover"
          quality={100}
          priority
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
            Đây là lý do khách hàng thường chọn chúng tôi
          </h2>
          <div className="flex items-center justify-center gap-2">
            <span className="w-28 h-1 bg-amber-600 rounded-full"></span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 bg-white/90 backdrop-blur-sm rounded-lg border border-amber-200 hover:border-amber-300 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="bg-amber-100 text-amber-700 rounded-full p-4 group-hover:bg-amber-700 group-hover:text-white transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-amber-900">
                  {feature.title}
                </h3>
                <p className="text-amber-700">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectSection;
