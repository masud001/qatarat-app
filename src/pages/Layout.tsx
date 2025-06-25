import React from "react";
import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaHome, FaShoppingCart, FaClipboardList, FaPhotoVideo, FaUser } from "react-icons/fa"; // Import icons
import { useGetCartQuery } from "../store/slices/apiSlice";

const Layout: React.FC = () => {
  const { data: cart } = useGetCartQuery();
  
  // Calculate cart count - set to undefined if 0 or less
  const cartCount = cart ? cart.reduce((sum, item) => sum + item.quantity, 0) : 0;
  const displayCount = cartCount > 0 ? cartCount : undefined;

  const footerLinks = [
    { label: "Home", path: "/", icon: <FaHome className="w-5 h-5 sm:w-7 sm:h-7" /> },
    { 
      label: "Cart", 
      path: "/cart", 
      icon: <FaShoppingCart className="w-5 h-5 sm:w-7 sm:h-7" />,
      showCount: true,
      count: displayCount
    },
    { label: "Order", path: "/order", icon: <FaClipboardList  className="w-5 h-5 sm:w-7 sm:h-7"/> },
    { label: "Media", path: "/media", icon: <FaPhotoVideo  className="w-5 h-5 sm:w-7 sm:h-7"/> },
    { label: "Profile", path: "/profile", icon: <FaUser  className="w-5 h-5 sm:w-7 sm:h-7"/> },
  ];
  return (
    <>
      {/* Header */}
      <Header />
      {/* Main Content */}
      <main className="max-w-[1440px] mx-auto pb-[140px] lg:pb-[172px]">
        <Outlet /> 
      </main>

      <Footer links={footerLinks}  />
      
    </>
  );
};

export default Layout;