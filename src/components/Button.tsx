import React from "react";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  icon?: string; 
  className?: string; 
}

const Button: React.FC<ButtonProps> = ({ text, onClick, icon, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-6 py-2 rounded-full cursor-pointer text-white transition ${className}`}
    >
      {icon && <img src={icon} alt={`${text}-icon`} className="w-5 h-5" />}
      <span>{text}</span>
    </button>
  );
};

export default Button;