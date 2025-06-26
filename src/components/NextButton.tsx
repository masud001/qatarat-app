import React from "react";
import SwiperInstance from "swiper";
import { GrNext } from "react-icons/gr";

export interface SwiperButtonProps {
  swiperRef: React.RefObject<SwiperInstance | null>;
}

const NextButton: React.FC<SwiperButtonProps> = ({ swiperRef }) => {
  const handleNextSlide = () => {
    swiperRef.current?.slideNext();
  };

  return (
    <button
      onClick={handleNextSlide}
      aria-label="Next slide"
      className="w-10 h-10 p-2 flex items-center justify-center text-(--text-color) rounded-full bg-white border border-(--theme-border-color) cursor-pointer backdrop-blur-xs backdrop-grayscale hover:bg-gray-100 transition-colors duration-200"
    >
      <GrNext className="arrow-next-icon" />
    </button>
  );
};

export default NextButton;
