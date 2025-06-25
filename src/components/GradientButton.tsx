import React from "react";
import { LiaAngleDownSolid } from "react-icons/lia";
interface ButtonProps {
  text: string;
  onClick?: () => void;
  icon?: string | React.ReactNode;
  className?: string; 
  showDropdownIcon?: boolean;
}

const GradientButton: React.FC<ButtonProps> = ({ text, onClick, icon, className, showDropdownIcon }) => {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center justify-center gap-1 py-2 px-3 rounded-full cursor-pointer text-white text-sm font-medium capitalize
        bg-gradient-to-r from-[#65358A]  to-[#2B153C]
         transition
        ${className || ""}
      `}
    >
      {icon && (
        <span className="w-4 h-4 flex items-center">
          {typeof icon === "string" ? (
            <img src={icon} alt="icon" className="w-4 h-4" />
          ) : (
            icon
          )}
        </span>
      )}
      <span>{text}</span>
      {showDropdownIcon && (
        <span className="ml-1 flex items-center">
          <LiaAngleDownSolid />
        </span>
      )}
    </button>
  );
};

export default GradientButton;
