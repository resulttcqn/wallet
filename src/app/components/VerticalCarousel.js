'use client'; // 클라이언트 사이드에서만 렌더링되도록 설정

import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar, Autoplay } from 'swiper/modules';

const VerticalCarousel = () => {
  return (
    <div className="relative w-full h-[100px] md:h-24 lg:h-28">
      <Swiper
        direction="vertical"
        slidesPerView={1}
        spaceBetween={10}
        loop={true}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        scrollbar={{ draggable: true }}
        modules={[Scrollbar, Autoplay]} 
        className="w-full h-full"
      >
        {["banner1.png", "banner2.png", "banner3.png", "banner4.png"].map((banner, index) => (
          <SwiperSlide key={index} className="flex items-center justify-center">
            <Image
              src={`/images/banners/${banner}`}
              width={2800}
              height={170}
              alt={`배너 ${index + 1}`}
              className="object-cover w-full h-full"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default VerticalCarousel;
