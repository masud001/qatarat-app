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
    const variants = {
      left: "left-0 top-0 h-full transform",
      right: "right-0 top-0 h-full transform",
      top: "top-0 left-0 w-full transform",
      bottom: "bottom-0 left-0 w-full transform",
    };
    return variants[variant] || "";
  };

  const getSizeClasses = () => {
    const sizeMap = {
      left: width,
      right: width,
      top: width.replace("w-", "h-"),
      bottom: width.replace("w-", "h-"),
    };
    return sizeMap[variant] || "w-64";
  };

  const getActiveClasses = () => {
    const activeMap = {
      left: isMenuOpen ? "translate-x-0" : "-translate-x-full",
      right: isMenuOpen ? "translate-x-0" : "translate-x-full",
      top: isMenuOpen ? "translate-y-0" : "-translate-y-full",
      bottom: isMenuOpen ? "translate-y-0" : "translate-y-full",
    };
    return activeMap[variant] || "";
  };

  const getCloseIconRotation = () => {
    const rotationMap = {
      left: "rotate-0",
      right: "rotate-180",
      top: "rotate-90",
      bottom: "-rotate-90",
    };
    return rotationMap[variant] || "";
  };

  return (
    <div className="mobile-menu-bar">
      {/* Menu Bar Icon */}
      <MenuBarIcon
        isDisabled={isDisabled}
        onClick={() => !isDisabled && setMenuOpen(!isMenuOpen)}
      />

      {/* Offcanvas Menu */}
      <OffcanvasMenu
        isMenuOpen={isMenuOpen}
        variantClasses={getVariantClasses()}
        sizeClasses={getSizeClasses()}
        activeClasses={getActiveClasses()}
        closeIconRotation={getCloseIconRotation()}
        className={className}
        onClose={() => !isDisabled && setMenuOpen(false)}
      />

      {/* Overlay */}
      {isMenuOpen && (
        <Overlay onClick={() => !isDisabled && setMenuOpen(false)} />
      )}
    </div>
  );
};

const MenuBarIcon: React.FC<{ isDisabled: boolean; onClick: () => void }> = ({
  isDisabled,
  onClick,
}) => (
  <button
    aria-label="Open menu"
    className={`p-[9px] rounded-full bg-(--theme-background-color) border border-(--theme-border-color) transition-colors duration-200 cursor-pointer ${
      isDisabled ? " " : " "
    }`}
    onClick={onClick}
  >
    <img src="/images/menu-bar-icon.svg" alt="menu-bar" className="w-5 h-5" loading="lazy" />
  </button>
);

const OffcanvasMenu: React.FC<{
  isMenuOpen: boolean;
  variantClasses: string;
  sizeClasses: string;
  activeClasses: string;
  closeIconRotation: string;
  className: string;
  onClose: () => void;
}> = ({
  isMenuOpen,
  variantClasses,
  sizeClasses,
  activeClasses,
  closeIconRotation,
  className,
  onClose,
}) => (
  <div
    role="dialog"
    aria-hidden={!isMenuOpen}
    className={`fixed ${variantClasses} ${sizeClasses} bg-white shadow-lg transition-transform duration-300 z-10 ${activeClasses} ${className}`}
  >
    <div className="p-4 flex justify-between items-center border-b border-gray-200">
      <h2 className="text-lg font-medium">Menu</h2>
      <button
        aria-label="Close menu"
        className={`p-[9px] rounded-full bg-(--theme-background-color) border border-(--theme-border-color) transition-colors duration-200 cursor-pointer ${closeIconRotation}`}
        onClick={onClose}
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
);

const Overlay: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <div
    aria-hidden="true"
    className="fixed inset-0 bg-(--theme-background-color) opacity-75"
    onClick={onClick}
  ></div>
);

export default MenuBar;