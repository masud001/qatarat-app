import { useGetCategoriesQuery } from '../store/slices/apiSlice';
import PageTitle from '../components/PageTitle';
import { useTranslation } from "react-i18next";
import CategoryCard from '../components/CategoryCard';
import HomePageSlider from '../components/HomePageSlider'
import Subscriptions from '../components/Subscriptions';
import { NavLink } from 'react-router';
import Loading from '../components/Loading';
import Error from '../components/Error';
const Home = () => {
  const { data: categories, isLoading, error } = useGetCategoriesQuery();

  
  const { t } = useTranslation(); 

  return (
    <div className=" bg-white transition-colors duration-300 flex flex-col items-center relative">

      <div className="pb-10 max-w-[712px] w-full px-5 lg:px-0 md:px-0">
        <PageTitle title={t("home")} />
      </div>

      {/* home page slider start */}
      <HomePageSlider />
      {/* home page slider end */}

      <div className="w-full max-w-[712px] mx-auto px-4 lg:px-0 pb-8 sm:pb-4 md:pb-8">
        <div className="max-w-[712px] h-[152px] relative rounded-3xl">
          <img className='w-full h-full absolute top-0 left-0 right-0 bottom-0 object-cover rounded-3xl sm:object-contain' src="/images/banner-image.png" alt="qatarat app home page banner" />
        </div>
      </div>
      
      <div className="w-full max-w-[712px] mx-auto  md:px-0">
        {isLoading && <Loading />}
        {error && <Error message=" Failed to load categories."/> }
        <div className="category-section  flex justify-center gap-3 mx-[550px]:gap-4 lg:gap-6">
          {categories &&
            categories.map((cat) => (
              <CategoryCard 
                key={cat.id} 
                id={cat.id} 
                name={cat.name} 
                imageUrl={cat.imageUrl}/>
            ))}
        </div>
      </div>
      <div className=" hidden xl:block fixed left-0 bottom-[126px] z-10">
        <Subscriptions/>
      </div>
      <div className=" fixed  min-[1441px]:absolute min-[1441px]:bottom-0 right-0 bottom-[126px] z-10 pr-5 lg:pr-12">
        <NavLink to="https://wa.me/+8801709036155">
          <img src="/images/whatsapp-icons.svg" alt="call to whats-app number" />
        </NavLink>
      </div>
    </div>
  );
};

export default Home;