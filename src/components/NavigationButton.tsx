import { GrPrevious } from "react-icons/gr";
import { useNavigate } from 'react-router-dom';
import React from 'react';

interface NavigationButtonProps {
  className?: string;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({ className }) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      className={`w-10 h-10 p-2 flex items-center justify-center text-(--text-color) rounded-full bg-white border border-(--theme-border-color) cursor-pointer backdrop-blur-xs backdrop-grayscale ${className || ""}`}
    >
      <GrPrevious />
    </button>
  );
};

export default NavigationButton;