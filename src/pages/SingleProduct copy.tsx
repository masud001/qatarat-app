import { useParams } from 'react-router-dom';
import { useGetProductQuery, useAddToCartMutation } from '../store/slices/apiSlice';
import React from 'react';
import NavigationButton from "../components/NavigationButton"
import PageTitle from "../components/PageTitle"
import GradientButton from "../components/GradientButton"
import Loading from '../components/Loading';
import Error from '../components/Error';

const SingleProduct = () => {
  const { productId } = useParams();
  const { data: product, isLoading, error } = useGetProductQuery(productId || '');
  const [addToCart, { isLoading: isAdding, isSuccess, reset }] = useAddToCartMutation();
  const [added, setAdded] = React.useState(false);
  

  const handleAddToCart = async () => {
    if (!product) return;
    await addToCart({ productId: product.id, quantity: 1 });
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      reset();
    }, 1200);
  };

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
            <PageTitle title={"Product Details"}/>
          </div>
          <div className="">
            <GradientButton text=" SAR" icon="/images/currency-icon.svg" showDropdownIcon={true} />
          </div>
        </div>
      </div>
      {isLoading && <Loading/>}
      {error && <Error message='Failed to load product.'/> }

      {/* single product card  */}
      <div className="single-product-section">
        
      </div>

      {product && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-md w-full text-center border border-gray-200 dark:border-gray-700">
          <img src={product.image} alt={product.name} className="w-32 h-32 object-contain mx-auto mb-6 rounded bg-gray-100 dark:bg-gray-700" />
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">{product.name}</h1>
          <div className="text-blue-600 dark:text-blue-300 font-bold text-xl mb-4">${product.price}</div>
          <div className="text-gray-600 dark:text-gray-300 mb-6">Category: {product.categoryId}</div>
          <button
            className="mt-2 px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition"
            onClick={handleAddToCart}
            disabled={isAdding}
          >
            {isAdding ? 'Adding...' : added || isSuccess ? 'Added!' : 'Add to Cart'}
          </button>
        </div>
      )}
    </div>
  );
};

export default SingleProduct;