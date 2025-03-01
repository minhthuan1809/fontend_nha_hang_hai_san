import React, { useEffect, useState } from "react";

import { Avatar } from "@nextui-org/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { getCustomerSection } from "@/app/_service/client/layout";
import Loading from "@/app/_shared/components/Loading";

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCustomerSection();
      setTestimonials(data.data);
    };

    fetchData();
  }, []);

  if (!testimonials) {
    return <Loading />;
  }

  return (
    <section className="py-24 relative overflow-hidden bg-gray-50 ">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-20 w-64 h-64 bg-orange-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full opacity-30 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-8"></div>

        <div className="flex flex-col lg:flex-row items-center justify-around gap-12 mx-auto mt-8">
          <div className="w-[70%] md:w-[40%] m-auto relative">
            <div className="relative">
              <div className="w-full h-full rounded-full relative overflow-hidden animate-spin-slow ">
                <img
                  src={testimonials.images[0].image_url}
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
              {testimonials.images[0].title}
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
              {testimonials.sections.map((testimonial: any) => (
                <SwiperSlide key={testimonial.id}>
                  <div className="flex flex-col items-center mb-6">
                    <Avatar
                      src={testimonial.image_url}
                      className="w-[8rem] h-[8rem] border-5 border-gray-200"
                    />
                    <div className="text-center mt-3">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {testimonial.name}
                      </h3>
                    </div>
                  </div>

                  <div className="text-gray-700 leading-relaxed text-center">
                    <cite className="text-lg italic">
                      " {testimonial.description} "
                    </cite>
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
