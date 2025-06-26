import React from "react";
import { GrPrevious } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

interface NavigationButtonProps {
  className?: string;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({ className = "" }) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(-1);
  };

  return (
    <button
      onClick={handleNavigation}
      aria-label="Go back"
      className={`w-10 h-10 p-2 flex items-center justify-center text-(--text-color) rounded-full bg-white border border-(--theme-border-color) cursor-pointer backdrop-blur-xs backdrop-grayscale hover:bg-gray-100 transition-colors duration-200 ${className}`}
    >
      <GrPrevious className="back-navigation-arrow" />
    </button>
  );
};

export default NavigationButton;