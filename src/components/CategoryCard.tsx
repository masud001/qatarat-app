import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface CategoryCardProps {
  id: string;
  name: string;
  imageUrl: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ id, name, imageUrl }) => {
  const navigate = useNavigate();

  const handleNavigation = () => navigate(`/product-list/${id}`);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      handleNavigation();
    }
  };

  return (
    <div
      className="w-[100px] h-[100px] min-[550px]:w-[150px] min-[550px]:h-[150px] sm:w-[200px] sm:h-[200px] bg-white rounded-full my-box-shadow p-4 relative cursor-pointer hover:bg-[#f3eff6] transition-colors duration-200"
      onClick={handleNavigation}
      role="button"
      tabIndex={0}
      aria-label={`Navigate to ${name} category`}
      onKeyDown={handleKeyDown}
    >
      <CategoryImage imageUrl={imageUrl} name={name} />
      <CategoryName name={name} />
    </div>
  );
};

const CategoryImage: React.FC<{ imageUrl: string; name: string }> = ({ imageUrl, name }) => (
  <div className="w-9 h-9 sm:w-14 sm:h-14 absolute text-center inset-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center">
    <img src={imageUrl} alt={`Category ${name}`} className="w-full h-full object-contain" />
  </div>
);

const CategoryName: React.FC<{ name: string }> = ({ name }) => {
  const { t } = useTranslation();
  return (
    <p className="w-full text-center absolute top-7/10 left-1/2 transform -translate-x-1/2 text-[#65358a] font-bold text-[9px] sm:text-[14px]">
      {t(name)}
    </p>
  );
};

export default CategoryCard;