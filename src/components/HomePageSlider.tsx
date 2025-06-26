import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";
import PrevButton from "./PrevButton";
import NextButton from "./NextButton";
import "../../node_modules/swiper/swiper-bundle.min.css";

const sliderData = [
  { id: "1", title: "slider title", imgUrl: "/images/slider-image-01.png" },
  { id: "2", title: "slider title", imgUrl: "/images/slider-image-01.png" },
  { id: "3", title: "slider title", imgUrl: "/images/slider-image-01.png" },
  { id: "4", title: "slider title", imgUrl: "/images/slider-image-01.png" },
  { id: "5", title: "slider title", imgUrl: "/images/slider-image-01.png" },
  { id: "6", title: "slider title", imgUrl: "/images/slider-image-01.png" },
  { id: "7", title: "slider title", imgUrl: "/images/slider-image-01.png" },
  { id: "8", title: "slider title", imgUrl: "/images/slider-image-01.png" },
];

const HomePageSlider: React.FC = () => {
  const swiperRef = useRef<SwiperType | null>(null);

  const sliderConfig = {
    dir: "ltr",
    modules: [Pagination],
    autoplay: true,
    loop: true,
    spaceBetween: 20,
    slidesPerView: 4,
    pagination: {
      clickable: true,
      el: ".custom-swiper-pagination",
      renderBullet: (index: number, className: string) =>
        `<span data-id="${index}" class="${className} my-swiper-bullet"></span>`,
    },
    breakpoints: {
      320: { slidesPerView: 1 },
      640: { slidesPerView: 2 },
      992: { slidesPerView: 3 },
      1200: { slidesPerView: 4 },
    },
  };

  return (
    <div className="home-page-slider w-full relative" dir="ltr">
      {/* Navigation Buttons */}
      <SliderNavigation swiperRef={swiperRef} />

      {/* Swiper Slider */}
      <Swiper {...sliderConfig} onSwiper={(swiper) => (swiperRef.current = swiper)}>
        {sliderData.map((slider) => (
          <SwiperSlide key={slider.id}>
            <SliderItem slider={slider} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Pagination */}
      <div className="custom-swiper-pagination flex justify-center pt-4 pb-10"></div>
    </div>
  );
};

const SliderNavigation: React.FC<{ swiperRef: React.MutableRefObject<SwiperType | null> }> = ({
  swiperRef,
}) => (
  <div className="w-full flex justify-between px-5 xl:px-12 absolute z-10 top-1/2 transform -translate-y-2/2">
    <PrevButton swiperRef={swiperRef} />
    <NextButton swiperRef={swiperRef} />
  </div>
);

const SliderItem: React.FC<{ slider: { id: string; title: string; imgUrl: string } }> = ({
  slider,
}) => (
  <div className="relative">
    <img className="rounded-3xl" src={slider.imgUrl} alt={`${slider.title} ${slider.id}`} />
  </div>
);

export default HomePageSlider;