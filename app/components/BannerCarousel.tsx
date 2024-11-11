'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

type Banner = {
  id: string;
  imageUrl: string;
  altText: string;
};

interface BannerCarouselProps {
  banners: Banner[];
}

const BannerCarousel: React.FC<BannerCarouselProps> = ({ banners }) => {
  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={1}
      pagination={{ clickable: true }}
      modules={[Pagination]}
      className="w-full h-auto" 
    >
      {banners.map((banner) => (
        <SwiperSlide key={banner.id}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={banner.imageUrl}
            alt={banner.altText}
            className="w-full h-[auto] object-cover max-h-[780px]" 
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default BannerCarousel;
