import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { Swiper as SwiperType } from "swiper";
import { useRef } from "react";
import PrevButton from './sliderElements/PrevButton';
import NextButton from './sliderElements/NextButton';
import 'swiper/css';
import 'swiper/css/pagination';

const sliderData = [
    {
        id: "1",
        title:"slider title",
        imgUrl: "/images/slider-image-01.png",
    },
    {
        id: "2",
        title:"slider title",
        imgUrl: "/images/slider-image-01.png",
    },
    {
        id: "3",
        title:"slider title",
        imgUrl: "/images/slider-image-01.png",
    },
    {
        id: "4",
        title:"slider title",
        imgUrl: "/images/slider-image-01.png",
    },
    {
        id: "5",
        title:"slider title",
        imgUrl: "/images/slider-image-01.png",
    },
    {
        id: "6",
        title:"slider title",
        imgUrl: "/images/slider-image-01.png",
    },
    {
        id: "7",
        title:"slider title",
        imgUrl: "/images/slider-image-01.png",
    },
    {
        id: "8",
        title:"slider title",
        imgUrl: "/images/slider-image-01.png",
    },
]

const HomePageSlider = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  return (
    <div className="home-page-slider  w-full relative">
      <div className="w-full flex justify-between px-5 xl:px-12 absolute z-10 top-1/2 transform -translate-y-2/2">
        <PrevButton swiperRef={swiperRef} />
        <NextButton swiperRef={swiperRef} />
      </div>
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        modules={[Pagination]}
        spaceBetween={20}
        slidesPerView={4}
        pagination={{ 
            clickable: true,
            el: '.custom-swiper-pagination',
            renderBullet: (index, className) => {
                return `<span class="${className} my-swiper-bullet"></span>`;
        }
         }}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          992: { slidesPerView: 3 },
          1200: { slidesPerView: 4 },
        }}
      >
        {sliderData.map((slider, index) => (
          <SwiperSlide key={index}>
            <div className=" relative">
                <img className=' rounded-3xl' src={slider.imgUrl} alt={slider.title + slider.id} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
       <div className="custom-swiper-pagination flex justify-center pt-4 pb-10"></div>
    </div>
  );
};

export default HomePageSlider;