import React from "react";
import { NavLink } from "react-router-dom";

interface FooterLink {
  label: string;
  path: string;
  icon: React.ReactNode;
  showCount?: boolean; // Option to show count
  count?: number; // Count prop
}

interface FooterProps {
  links: FooterLink[];
  copyrightText?: string; // Optional copyright text
}

const Footer: React.FC<FooterProps> = ({ links, copyrightText }) => {
  return (
    <footer className="fixed z-10 bottom-0 left-0 w-full pb-12 md:pb-16 text-center text-sm backdrop-blur-xs backdrop-grayscale footer-gradient">
      <div className="max-w-[492px] mx-auto px-4">
        <div className="flex flex-wrap justify-between py-4 px-6 rounded-full footer-box-shadow">
          {links.map((link, index) => (
            <FooterLinkItem key={index} link={link} />
          ))}
        </div>
        {copyrightText && (
          <div className="mt-4 text-xs text-gray-500">{copyrightText}</div>
        )}
      </div>
    </footer>
  );
};

const FooterLinkItem: React.FC<{ link: FooterLink }> = ({ link }) => (
  <NavLink
    to={link.path}
    className="nav-link relative flex flex-col items-center gap-2 text-xs sm:text-xl font-normal hover:text-(--theme-color) transition-colors duration-200"
  >
    <div className="relative">
      {link.icon}
      {link.showCount && link.count && link.count > 0 && (
        <span className="absolute -top-2 -right-2 bg-[#c92c2c] text-white text-xs rounded-full px-1.5 py-0.5 min-w-[18px] flex items-center justify-center">
          {link.count}
        </span>
      )}
    </div>
    <div className="label text-xl font-normal leading-[28px] absolute -bottom-[50px] sm:-bottom-[60px] text-(--text-color) open-sauce-sans">
      {link.label}
    </div>
  </NavLink>
);

export default Footer;