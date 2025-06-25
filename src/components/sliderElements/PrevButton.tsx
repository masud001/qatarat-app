import type { SwiperButtonProps } from "./NextButton";
import { GrPrevious } from "react-icons/gr";

const PrevButton = ({ swiperRef }: SwiperButtonProps) => {
  return (
    <button
      onClick={() => swiperRef.current?.slidePrev()}
      className="w-10 h-10 p-2 flex items-center justify-center text-(--text-color) rounded-full bg-white border border-(--theme-border-color) cursor-pointer backdrop-blur-xs backdrop-grayscale"
      
    >
      <GrPrevious className="arrow-prev-icon"/>
    </button>
  );
};

export default PrevButton;
