import React from "react";
import { useTranslation } from 'react-i18next';
interface PageTitleProps {
  title: string;
  className?: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ title, className }) => {
  const { t } = useTranslation(); 
  const categoryKey = `categories.${title}`;
  const translated = t(categoryKey);
  return (
    <div className={`  ${className || ""}`}>
      <h2 className="text-2xl md:text-[40px] font-bold text-(--text-color) leading-[48px] open-sauce-one-bold">
        {translated === categoryKey ? t(title) : translated}
      </h2>
    </div>
  );
};

export default PageTitle;