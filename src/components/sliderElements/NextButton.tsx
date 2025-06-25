import SwiperInstance from "swiper";
import { GrNext } from "react-icons/gr";

export interface SwiperButtonProps {
  swiperRef: React.RefObject<SwiperInstance | null>; 
}

const NextButton = ({ swiperRef }: SwiperButtonProps) => {
  return (
    <button
      onClick={() => swiperRef.current?.slideNext()}
      className="w-10 h-10 p-2 flex items-center justify-center text-(--text-color) rounded-full bg-white border border-(--theme-border-color) cursor-pointer backdrop-blur-xs backdrop-grayscale"
    >
     <GrNext  className="arrow-next-icon"/>
    </button>
  );
};

export default NextButton;
