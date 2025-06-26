import React from "react";
import { useGetCategoriesQuery } from "../store/slices/apiSlice";
import PageTitle from "../components/PageTitle";
import { useTranslation } from "react-i18next";
import CategoryCard from "../components/CategoryCard";
import HomePageSlider from "../components/HomePageSlider";
import Subscriptions from "../components/Subscriptions";
import Loading from "../components/Loading";
import Error from "../components/Error";
import { NavLink } from "react-router";

const Home: React.FC = () => {
  const { data: categories, isLoading, error } = useGetCategoriesQuery();
  const { t } = useTranslation();

  return (
    <div className="bg-white transition-colors duration-300 flex flex-col items-center relative">
      {/* Page Title */}
      <HeaderSection title={t("home")} />

      {/* Home Page Slider */}
      <HomePageSlider />

      {/* Banner Section */}
      <BannerSection />

      {/* Categories Section */}
      <CategoriesSection
        categories={categories}
        isLoading={isLoading}
        error={!!error}
      />

      {/* Subscriptions Section */}
      <SubscriptionsSection />

      {/* WhatsApp Contact */}
      <WhatsAppContact />
    </div>
  );
};

export default Home;


const HeaderSection: React.FC<{ title: string }> = ({ title }) => (
  <div className="pb-10 max-w-[712px] w-full px-5 lg:px-0 md:px-0">
    <PageTitle title={title} />
  </div>
);

const BannerSection: React.FC = () => (
  <div className="w-full max-w-[712px] mx-auto px-4 lg:px-0 pb-8 sm:pb-4 md:pb-8">
    <div className="max-w-[712px] h-[152px] relative rounded-3xl">
      <img
        className="w-full h-full absolute top-0 left-0 right-0 bottom-0 object-cover rounded-3xl sm:object-contain"
        src="/images/banner-image.png"
        alt="qatarat app home page banner"
        loading="lazy"
      />
    </div>
  </div>
);

interface CategoriesSectionProps {
  categories: Array<{ id: string; name: string; imageUrl: string }> | undefined;
  isLoading: boolean;
  error: boolean;
}

const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  categories,
  isLoading,
  error,
}) => (
  <div className="w-full max-w-[712px] mx-auto md:px-0">
    {isLoading && <Loading />}
    {error && <Error message="Failed to load categories." />}
    <div className="category-section flex justify-center gap-3 mx-[550px]:gap-4 lg:gap-6">
      {categories &&
        categories.map((cat) => (
          <CategoryCard
            key={cat.id}
            id={cat.id}
            name={cat.name}
            imageUrl={cat.imageUrl}
          />
        ))}
    </div>
  </div>
);


const SubscriptionsSection: React.FC = () => (
  <div className="hidden xl:block fixed left-0 bottom-[126px] z-10">
    <Subscriptions />
  </div>
);


const WhatsAppContact: React.FC = () => (
  <div className="fixed min-[1441px]:absolute min-[1441px]:bottom-0 right-0 bottom-[126px] z-10 pr-5 lg:pr-12">
    <NavLink to="https://wa.me/+8801709036155">
      <img
        src="/images/whatsapp-icons.svg"
        alt="call to WhatsApp number"
        loading="lazy"
      />
    </NavLink>
  </div>
);



