import React from "react";
import type { SwiperButtonProps } from "./NextButton";
import { GrPrevious } from "react-icons/gr";

const PrevButton: React.FC<SwiperButtonProps> = ({ swiperRef }) => {
  const handlePrevSlide = () => {
    swiperRef.current?.slidePrev();
  };

  return (
    <button
      onClick={handlePrevSlide}
      aria-label="Previous slide"
      className="w-10 h-10 p-2 flex items-center justify-center text-(--text-color) rounded-full bg-white border border-(--theme-border-color) cursor-pointer backdrop-blur-xs backdrop-grayscale hover:bg-gray-100 transition-colors duration-200"
    >
      <GrPrevious className="arrow-prev-icon" />
    </button>
  );
};

export default PrevButton;
