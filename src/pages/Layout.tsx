import React from "react";
import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useGetCartQuery } from "../store/slices/apiSlice";
import { LuClipboardList } from "react-icons/lu";
import { PiFilmStripThin } from "react-icons/pi";
import { IoPersonCircleOutline } from "react-icons/io5";
import { BsCart } from "react-icons/bs";
import { RiHome5Fill } from "react-icons/ri";

const Layout: React.FC = () => {
  const { data: cart } = useGetCartQuery();
  
  // Calculate cart count - set to undefined if 0 or less
  const cartCount = cart ? cart.reduce((sum, item) => sum + item.quantity, 0) : 0;
  const displayCount = cartCount > 0 ? cartCount : undefined;

  const footerLinks = [
    { label: "Home", path: "/", icon: <RiHome5Fill className="w-5 h-5 sm:w-7 sm:h-7" /> },
    { 
      label: "Cart", 
      path: "/cart", 
      icon: <BsCart className="w-5 h-5 sm:w-7 sm:h-7" />,
      showCount: true,
      count: displayCount
    },
    { label: "Order", path: "/order", icon: <LuClipboardList  className="w-5 h-5 sm:w-7 sm:h-7"/> },
    { label: "Media", path: "/media", icon: <PiFilmStripThin  className="w-5 h-5 sm:w-7 sm:h-7"/> },
    { label: "Profile", path: "/profile", icon: <IoPersonCircleOutline  className="w-5 h-5 sm:w-7 sm:h-7"/> },
  ];
  return (
    <>
      {/* Header */}
      <Header />
      {/* Main Content */}
      <section className="max-w-[1440px] mx-auto pb-[140px] lg:pb-[172px]">
        <Outlet /> 
      </section>

      <Footer links={footerLinks}  />
      
    </>
  );
};

export default Layout;