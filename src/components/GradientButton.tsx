import React from "react";
import { LiaAngleDownSolid } from "react-icons/lia";

interface GradientButtonProps {
  text: string;
  onClick?: () => void;
  icon?: string | React.ReactNode;
  className?: string;
  showDropdownIcon?: boolean;
}

const GradientButton: React.FC<GradientButtonProps> = ({
  text,
  onClick,
  icon,
  className = "",
  showDropdownIcon = false,
}) => {
  return (
    <button
      dir="ltr"
      onClick={onClick}
      className={`flex items-center justify-center gap-1 py-2 px-3 rounded-full cursor-pointer text-white text-sm font-medium capitalize open-sauce-one-medium bg-gradient-to-r from-[#65358A] to-[#2B153C] transition ${className}`}
    >
      {icon && <ButtonIcon icon={icon} />}
      <span>{text}</span>
      {showDropdownIcon && <DropdownIcon />}
    </button>
  );
};

const ButtonIcon: React.FC<{ icon: string | React.ReactNode }> = ({ icon }) => (
  <span className="w-4 h-4 flex items-center">
    {typeof icon === "string" ? (
      <img src={icon} alt="icon" className="w-4 h-4" />
    ) : (
      icon
    )}
  </span>
);

const DropdownIcon: React.FC = () => (
  <span className="ml-1 flex items-center">
    <LiaAngleDownSolid />
  </span>
);

export default GradientButton;
