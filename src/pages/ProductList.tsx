import { useParams } from 'react-router-dom';
import {useGetCategoriesQuery, useGetProductsQuery } from '../store/slices/apiSlice';
import { useTranslation } from 'react-i18next';
import NavigationButton from "../components/NavigationButton"
import PageTitle from '../components/PageTitle';
import GradientButton from '../components/GradientButton';
import Loading from '../components/Loading';
import Error from '../components/Error';
import ProductCard from '../components/ProductCard';

const ProductList = () => {
  const { categoryId } = useParams();
  const { data: categories } = useGetCategoriesQuery(); 
  const { data: products, isLoading, error } = useGetProductsQuery({ categoryId });

  // Find the category name based on categoryId
  const categoryName = categories?.find((cat) => cat.id === categoryId)?.name || "Category";

  return (
    <div
      className="min-h-screen flex flex-col items-center p-6 transition-colors duration-300 bg-(--background-color) text-(--text-color)"
    >
      <div className="w-full max-w-[712px] mx-auto pb-8">
        <div className="flex justify-between items-center gap-3">
          <div className=" flex-shrink-1">
            <NavigationButton  className='!bg-[#F3EFF6]'/>
          </div>
          <div className=" mr-auto">
            <PageTitle title={categoryName}/>
          </div>
          <div className="">
            <GradientButton text=" SAR" icon="/images/currency-icon.svg" showDropdownIcon={true} />
          </div>
        </div>
      </div>

      {/* product section  */}
      <div className="product-section flex justify-start max-w-[712px] w-full mx-auto mb-6 px-4 lg:px-0 ">
        <ProductLabel title={"Products"}/>
      </div>

      {isLoading &&  <Loading />}
      {error && <Error message="Failed to load products." />} 

      {/* product list  */}
      <div className="grid grid-cols-1 min-[450px]:grid-cols-2  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-[712px] mx-auto px-4 lg:px-0">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;

const ProductLabel = ({ title }: { title: string }) => {
  const { t } = useTranslation(); 
  return (
    <div className="text-center">
      <div className="py-2 px-4 bg-[#222222] font-medium text-[16px] leading-[22px] text-white rounded-xl">
        {t(title)} 
      </div>
    </div>
  );
};
