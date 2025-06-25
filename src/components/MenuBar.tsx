import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";

interface MenuItem {
  label: string;
  href: string;
}

interface MenuBarProps {
  variant?: "left" | "right" | "top" | "bottom"; 
  className?: string; 
  width?: string; 
  isDisabled?: boolean; 
}

const menuItems: MenuItem[] = [
  { label: "Home", href: "/" },
  { label: "Cart", href: "/cart" },
  { label: "Order", href: "/order" },
  { label: "Media", href: "/media" },
  { label: "Profile", href: "/profile" },
];

const MenuBar: React.FC<MenuBarProps> = ({
  variant = "left",
  className = "",
  width = "w-64",
  isDisabled = false,
}) => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const getVariantClasses = () => {
    switch (variant) {
      case "left":
        return "left-0 top-0 h-full transform";
      case "right":
        return "right-0 top-0 h-full transform";
      case "top":
        return "top-0 left-0 w-full transform";
      case "bottom":
        return "bottom-0 left-0 w-full transform";
      default:
        return "";
    }
  };

  const getSizeClasses = () => {
    switch (variant) {
      case "left":
      case "right":
        return width; 
      case "top":
      case "bottom":
        return width.replace("w-", "h-"); 
      default:
        return "w-64"; 
    }
  };

  const getActiveClasses = () => {
    switch (variant) {
      case "left":
        return isMenuOpen ? "translate-x-0" : "-translate-x-full";
      case "right":
        return isMenuOpen ? "translate-x-0" : "translate-x-full";
      case "top":
        return isMenuOpen ? "translate-y-0" : "-translate-y-full";
      case "bottom":
        return isMenuOpen ? "translate-y-0" : "translate-y-full";
      default:
        return "";
    }
  };

  const getCloseIconRotation = () => {
    switch (variant) {
      case "left":
        return "rotate-0";
      case "right":
        return "rotate-180";
      case "top":
        return "rotate-90";
      case "bottom":
        return "-rotate-90";
      default:
        return "";
    }
  };

  return (
    <div className="mobile-menu-bar">
      {/* Menu Bar Icon */}
      <button
        aria-label="Open menu"
        className={`p-[9px] rounded-full bg-[#F3EFF6] border border-(--theme-border-color) transition-colors duration-200 cursor-pointer ${
          isDisabled ? " " : " "
        }`}
        onClick={() => {
          if (!isDisabled) {
            setMenuOpen(!isMenuOpen);
          }
        }}
      >
        <img src="/images/menu-bar-icon.svg" alt="menu-bar" className="w-5 h-5" />
      </button>

      {/* Offcanvas Menu hidden for now/ use for future */}
      <div
        role="dialog"
        aria-hidden={!isMenuOpen}
        className={`fixed ${getVariantClasses()} ${getSizeClasses()} bg-white shadow-lg transition-transform duration-300 z-10 hidden ${getActiveClasses()} ${className}`}
      >
        <div className="p-4 flex justify-between items-center border-b border-gray-200">
          <h2 className="text-lg font-medium">Menu</h2>
          <button
            aria-label="Close menu"
            className={`p-[9px] rounded-full bg-[#F3EFF6] border border-(--theme-border-color) transition-colors duration-200 cursor-pointer ${getCloseIconRotation()}`}
            onClick={() => {
              if (!isDisabled) {
                setMenuOpen(false);
              }
            }}
          >
            <RxCross1 className="w-5 h-5" />
          </button>
        </div>
        <ul className="p-4">
          {menuItems.map((item, index) => (
            <li key={index} className="py-2 px-4 hover:bg-gray-100 rounded">
              <a href={item.href} className="text-sm text-(--text-color) font-medium">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          aria-hidden="true"
          className="fixed inset-0 bg-[#F3EFF6] opacity-75"
          onClick={() => {
            if (!isDisabled) {
              setMenuOpen(false);
            }
          }}
        ></div>
      )}
    </div>
  );
};

export default MenuBar;