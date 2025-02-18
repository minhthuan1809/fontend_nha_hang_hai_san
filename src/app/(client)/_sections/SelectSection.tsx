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
      <div className="absolute inset-0 bg-[url('https://scontent.fhan17-1.fna.fbcdn.net/v/t1.15752-9/476911566_1723320565279294_6474198103564421508_n.png?stp=dst-png_s552x414&_nc_cat=109&ccb=1-7&_nc_sid=0024fc&_nc_eui2=AeE6IJBgPRWQRQMCw2nZnwqwaMlwAvMtOoNoyXAC8y06g0hGV2w8qtysooOFZvnPqbjdFfVnz9xLYxe7sOfjrAA9&_nc_ohc=2Qsj5wYofggQ7kNvgHLcfLH&_nc_oc=Adi1UU_q6c8Ej34hB5ZvHUy7RPKNzf061IOIUrE-odMM-ghZrg9aZygA4MDU0kLz82Ir5yRmFwij0N5PHg1MrAif&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.fhan17-1.fna&oh=03_Q7cD1gG00iiWFc29aCz-tf8DOdqyrSN11vPqxSONC3phkeCQDg&oe=67DC2FF2')] bg-fixed bg-cover bg-center bg-no-repeat opacity-90">
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
