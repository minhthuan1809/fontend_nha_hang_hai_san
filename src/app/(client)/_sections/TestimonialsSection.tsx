import React from "react";
import Image from "next/image";
import { Avatar } from "@nextui-org/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      name: "Vũ Quang Huy",
      avatar:
        "https://scontent.fhan18-1.fna.fbcdn.net/v/t39.30808-1/400057903_10159821074220592_7376063669291051878_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeHaeRkpk27lYXuH1SkY5OnKURtylWC26rBRG3KVYLbqsBsO_iif2OztMNyU-suKqPTpmLAUUPIYNrom1qMe5Dwr&_nc_ohc=S-hyNNlvrzAQ7kNvgHFQkoK&_nc_oc=AdicJ0WkOcMy7O-OgwGI4huB-UiYYa-8D7T4nPQm92q_reL_ZcMLsfvbipEn-BHAFSg&_nc_zt=24&_nc_ht=scontent.fhan18-1.fna&_nc_gid=AlN2e0rbRRQD5R5VZPphZXC&oh=00_AYAwuQkyA3cbCKbeghLNIjvz-nbnyCtjvWDdKpW2i8Y2jg&oe=67BA2BCA",
      content:
        "Vừa bước vào tôi đã rất ấn tượng với không gian của nhà hàng, rất gần gũi nhưng lại sang trọng. Tôi đã ăn 4 món ở đây, món nào cũng ngon. Tôi thích thưởng thức món 'Hào sống'. Món 'Hào sống' được phết tí mù tạt, tí muối tiêu, thêm vài giọt chanh tươi, vị cay sẽ hòa lẫn với vị dịu ngọt của hào tươi mang lại cho vị giác sự thích thú lạ thường. Đó là những cảm giác không thể nào quên được, rất lạ và ngon miệng.",
    },
    {
      id: 2,
      name: "Trần Thị Hương",
      avatar:
        "http://dev.mypagevn.com/ganhhao/wp-content/uploads/2018/01/kim-tae-hee_1515335238.jpg",
      content:
        "Nhà hàng có không gian thoáng đãng, món ăn chế biến tinh tế và nhân viên phục vụ chu đáo. Đặc biệt là các món hải sản tươi ngon khiến tôi muốn quay lại lần nữa.",
    },
    {
      id: 3,
      name: "Lê Minh Tuấn",
      avatar:
        "http://dev.mypagevn.com/ganhhao/wp-content/uploads/2018/01/kim-tae-hee_1515335238.jpg",
      content:
        "Đây là địa điểm lý tưởng để tôi đưa đối tác đến thương thảo hợp đồng. Không gian yên tĩnh, thức ăn ngon miệng, và dịch vụ chuyên nghiệp đã để lại ấn tượng tốt đẹp.",
    },
  ];

  return (
    <section className="py-24  relative overflow-hidden  bg-gray-50 ">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-20 w-64 h-64 bg-orange-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full opacity-30 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-8"></div>

        <div className="flex flex-col lg:flex-row items-center justify-around gap-12 mx-auto mt-8">
          <div className="w-[70%] md:w-[40%] m-auto  relative">
            <div className="relative">
              <div className="w-full h-full rounded-full  relative overflow-hidden animate-spin-slow ">
                <Image
                  src="http://dev.mypagevn.com/ganhhao/wp-content/uploads/2018/01/plate.png"
                  alt="Món ăn đặc trưng"
                  className="w-full h-auto object-cover"
                  width={500}
                  height={500}
                />
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center pb-4 text-[#444]">
              Khách hàng nói gì về chúng tôi
            </h2>
            <Swiper
              modules={[Autoplay, Navigation]}
              spaceBetween={30}
              slidesPerView={1}
              autoplay={{
                delay: 7000,
                disableOnInteraction: false,
              }}
              className="w-full h-full"
            >
              {testimonials.map((testimonial) => (
                <SwiperSlide key={testimonial.id}>
                  <div className="flex flex-col items-center mb-6">
                    <Avatar
                      src={testimonial.avatar}
                      className="w-[8rem] h-[8rem] border-5 border-gray-200"
                    />
                    <div className="text-center mt-3">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {testimonial.name}
                      </h3>
                    </div>
                  </div>

                  <div className="text-gray-700 leading-relaxed text-center">
                    <cite className="text-lg italic">" {testimonial.content} "</cite>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
