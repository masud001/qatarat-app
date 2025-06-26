import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LanguageDropdown from "./LanguageDropdown.tsx";
import Button from "./Button.tsx";
import NotificationButton from "./NotificationButton.tsx";
import MenuBar from "./MenuBar.tsx";

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const notifications = [
    "New message from John",
    "Your order has been shipped",
    "Update account",
  ]; // Example notifications

  return (
    <header
      dir="ltr"
      className={`sticky top-0 z-20 w-full flex justify-between items-center p-5 xl:px-12 ${scrolled ? "xl:py-5" : "xl:py-10"} transition-all duration-300 backdrop-blur-xl backdrop-grayscale`}
    >
      {/* Left Section: Menu Bar */}
      <HeaderLeft />

      {/* Center Section: Logo */}
      <HeaderCenter />

      {/* Right Section: Actions */}
      <HeaderRight notifications={notifications} />
    </header>
  );
};

const HeaderLeft: React.FC = () => (
  <div className="flex-1 flex justify-start items-center">
    <MenuBar variant="left" width="w-64" isDisabled={true} />
  </div>
);

const HeaderCenter: React.FC = () => (
  <div className="flex-1 flex justify-center items-center">
    <Link to="/" aria-label="Go to Home Page">
      <img
        className="cursor-pointer"
        src="/images/logo.svg"
        alt="logo"
        loading="lazy"
      />
    </Link>
  </div>
);

interface HeaderRightProps {
  notifications: string[];
}

const HeaderRight: React.FC<HeaderRightProps> = ({ notifications }) => (
  <div className="flex-1 flex justify-end items-center gap-3">
    {/* Notification Button */}
    <div className="hidden sm:block">
      <NotificationButton notifications={notifications} isDropdownDisabled={true} />
    </div>
    {/* Language Dropdown */}
    <div className="hidden md:block">
      <LanguageDropdown isDropdownDisabled={false} />
    </div>
    {/* Logout Button */}
    <div>
      <Button
        text="Logout"
        className="bg-(--button-bg-color) text-base text-white font-medium capitalize open-sauce-one-medium"
        onClick={() => console.log("Logout clicked")}
      />
    </div>
  </div>
);

export default Header;