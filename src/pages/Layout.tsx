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

  // Calculate cart count
  const cartCount = cart ? cart.reduce((sum, item) => sum + item.quantity, 0) : 0;
  const displayCount = cartCount > 0 ? cartCount : undefined;

  const footerLinks = getFooterLinks(displayCount);

  return (
    <>
      {/* Header */}
      <Header />

      {/* Main Content */}
      <MainContent />

      {/* Footer */}
      <Footer links={footerLinks} />
    </>
  );
};

export default Layout;


const MainContent: React.FC = () => (
  <section className="max-w-[1440px] mx-auto pb-[140px] lg:pb-[172px]">
    <Outlet />
  </section>
);


const getFooterLinks = (cartCount?: number) => [
  {
    label: "Home",
    path: "/",
    icon: <RiHome5Fill className="w-5 h-5 sm:w-7 sm:h-7" />,
  },
  {
    label: "Cart",
    path: "/cart",
    icon: <BsCart className="w-5 h-5 sm:w-7 sm:h-7" />,
    showCount: true,
    count: cartCount,
  },
  {
    label: "Order",
    path: "/order",
    icon: <LuClipboardList className="w-5 h-5 sm:w-7 sm:h-7" />,
  },
  {
    label: "Media",
    path: "/media",
    icon: <PiFilmStripThin className="w-5 h-5 sm:w-7 sm:h-7" />,
  },
  {
    label: "Profile",
    path: "/profile",
    icon: <IoPersonCircleOutline className="w-5 h-5 sm:w-7 sm:h-7" />,
  },
];