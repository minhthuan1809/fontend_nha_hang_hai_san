import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Avatar } from '@nextui-org/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      name: "Tóc Tiên",
      avatar: "http://dev.mypagevn.com/ganhhao/wp-content/uploads/2018/01/kim-tae-hee_1515335238.jpg", // Using placeholder since we don't know the exact image
      content: "Vừa bước vào tôi đã rất ấn tượng với không gian của nhà hàng, rất gần gũi nhưng lại sang trọng. Tôi đã ăn 4 món ở đây, món nào cũng ngon. Tôi thích thưởng thức món 'Hào sống'. Món 'Hào sống' được phết tí mù tạt, tí muối tiêu, thêm vài giọt chanh tươi, vị cay sẽ hòa lẫn với vị dịu ngọt của hào tươi mang lại cho vị giác sự thích thú lạ thường. Đó là những cảm giác không thể nào quên được, rất lạ và ngon miệng.",
    },
    {
      id: 2,
      name: "Trần Thị Hương",
      avatar: "http://dev.mypagevn.com/ganhhao/wp-content/uploads/2018/01/kim-tae-hee_1515335238.jpg",
      content: "Nhà hàng có không gian thoáng đãng, món ăn chế biến tinh tế và nhân viên phục vụ chu đáo. Đặc biệt là các món hải sản tươi ngon khiến tôi muốn quay lại lần nữa.",
    },
    {
      id: 3,
      name: "Lê Minh Tuấn",
      avatar: "http://dev.mypagevn.com/ganhhao/wp-content/uploads/2018/01/kim-tae-hee_1515335238.jpg",
      content: "Đây là địa điểm lý tưởng để tôi đưa đối tác đến thương thảo hợp đồng. Không gian yên tĩnh, thức ăn ngon miệng, và dịch vụ chuyên nghiệp đã để lại ấn tượng tốt đẹp.",
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextTestimonial = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }
  };

  const prevTestimonial = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [activeIndex]);

  // Auto change testimonial every 5 seconds
  useEffect(() => {
    const autoChangeTimer = setInterval(() => {
      nextTestimonial();
    }, 7000);

    return () => clearInterval(autoChangeTimer);
  }, []);

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-20 w-64 h-64 bg-orange-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-amber-100 rounded-full opacity-30 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-8">
          
        
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-around gap-12  mx-auto mt-8">
          <div className="w-[10%] lg:w-1/2 relative">
            <div className="relative">
              <div className="w-full h-auto relative overflow-hidden animate-spin-slow">
                <Image 
                  src="http://dev.mypagevn.com/ganhhao/wp-content/uploads/2018/01/plate.png"
                  alt="Món ăn đặc trưng" 
                  width={500}
                  height={500}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 space-y-8">
          <h2 className="text-3xl md:text-4xl font-Pacifico text-center pb-4 text-gray-900">
            Khách hàng nói gì về chúng tôi
          </h2>
            <div className="relative overflow-hidden">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={testimonial.id}
                  className={`transition-all duration-500 ${
                    index === activeIndex 
                      ? 'opacity-100 translate-x-0' 
                      : 'opacity-0 absolute top-0 translate-x-full'
                  }`}
                >
                  <div className="flex flex-col items-center mb-6">
                    <Avatar 
                      src={testimonial.avatar}
                      className="w-[10rem] h-[10rem] border-5 border-gray-200"
                    />
                    <div className="text-center mt-3">
                      <h3 className="text-xl font-semibold text-gray-900">{testimonial.name}</h3>
                    </div>
                  </div>

                  <div className="text-gray-700 leading-relaxed text-center">
                    <p className="text-lg">{testimonial.content}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-8">
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button 
                    key={index}
                    onClick={() => !isAnimating && setActiveIndex(index)}
                    className={`w-4 h-4 rounded-full transition-all duration-300 ${
                      index === activeIndex ? 'bg-red-500' : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Show testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}