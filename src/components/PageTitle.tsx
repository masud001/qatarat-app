import React from "react";
import { useTranslation } from "react-i18next";

interface PageTitleProps {
  title: string;
  className?: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ title, className = "" }) => {
  const { t } = useTranslation();

  // Determine the translation key for categories
  const categoryKey = `categories.${title}`;
  const translatedTitle = t(categoryKey) === categoryKey ? t(title) : t(categoryKey);

  return (
    <div className={className}>
      <h2 className="text-2xl md:text-[40px] font-bold text-(--text-color) leading-[48px] open-sauce-one-bold">
        {translatedTitle}
      </h2>
    </div>
  );
};

export default PageTitle;