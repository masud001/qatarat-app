import React from "react";
import { useParams, NavLink } from "react-router-dom";
import { useGetProductQuery, useAddToCartMutation, useGetProductsQuery } from "../store/slices/apiSlice";
import NavigationButton from "../components/NavigationButton";
import PageTitle from "../components/PageTitle";
import GradientButton from "../components/GradientButton";
import Loading from "../components/Loading";
import Error from "../components/Error";
import SingleProductCard from "../components/SingleProductCard";
import ProductCard from "../components/ProductCard";
import { LiaAngleRightSolid } from "react-icons/lia";

const SingleProduct: React.FC = () => {
  const { productId } = useParams();
  const { data: product, isLoading, error } = useGetProductQuery(productId || "");
  const [addToCart, { isLoading: isAdding, isSuccess, reset }] = useAddToCartMutation();

  // Fetch similar products from the same category
  const { data: similarProducts } = useGetProductsQuery(
    product?.categoryId ? { categoryId: product.categoryId } : { categoryId: undefined }
  );

  const handleAddToCart = async () => {
    if (!product) return;
    await addToCart({ productId: product.id, quantity: 1 });
    setTimeout(() => {
      reset();
    }, 1200);
  };

  // Filter out the current product and take up to 4 similar products
  const suggestedProducts = (similarProducts?.products || [])
    .filter((p) => p.id !== productId)
    .slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col items-center p-6 transition-colors duration-300 bg-(--background-color) text-(--text-color)">
      {/* Header Section */}
      <HeaderSection />

      {/* Loading and Error States */}
      {isLoading && <Loading />}
      {error && <Error message="Failed to load product." />}

      {/* Product Details */}
      {product && (
      <SingleProductCard
        product={product}
        isAdding={isAdding}
        isSuccess={isSuccess}
        addedId={product.id}
        onAddToCart={handleAddToCart}
      />
      )}

      {/* Suggested Similar Products Section */}
      <SuggestedProductsSection 
      suggestedProducts={suggestedProducts.map((prod: { id: string; name: string; price: number; image: string }) => ({
        id: prod.id,
        name: prod.name,
        price: prod.price,
        imageUrl: prod.image, // Map image to imageUrl
      }))} 
      categoryId={product?.categoryId} 
      />
    </div>
  );
};

export default SingleProduct;


const HeaderSection: React.FC = () => (
  <div className="w-full max-w-[712px] mx-auto pb-8">
    <div className="flex justify-between items-center gap-3">
      <NavigationButton className="!bg-(--theme-background-color)" />
      <div className="page-title">
        <PageTitle title="Product Details" className="product-details" />
      </div>
      <GradientButton
        text="SAR"
        icon="/images/currency-icon.svg"
        showDropdownIcon={true}
      />
    </div>
  </div>
);

interface SuggestedProductsSectionProps {
  suggestedProducts: Array<{ 
    id: string; 
    name: string; 
    price: number; 
    imageUrl: string 
  }>;
  categoryId?: string;
}

const SuggestedProductsSection: React.FC<SuggestedProductsSectionProps> = ({ suggestedProducts, categoryId }) => (
  suggestedProducts.length > 0 && (
    <div className="w-full max-w-[712px] mx-auto mt-12 flex flex-col gap-4">
      <div className="flex justify-between items-center gap-4">
        <h3 className="text-[15px] md:text-2xl leading-[33.6px] text-(--text-color) font-bold md:font-medium open-sauce-one-medium">
          Suggested Similar Products
        </h3>
        <NavLink
          to={categoryId ? `/product-list/${categoryId}` : "/"}
          className="font-normal text-sm md:text-xl inter text-(--see-all-link-color) leading-[24px] flex items-center gap-1 hover:underline hover:text-(--active-text-color)"
        >
          See All <LiaAngleRightSolid className="ml-1 see-all-arrow-icon" />
        </NavLink>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {suggestedProducts.map((prod) => (
          <ProductCard
            key={prod.id}
            product={{
              ...prod,
              image: prod.imageUrl, // Map imageUrl to image
              size: "330 ml", // Provide a default size
              quantity: "20 bottle", // Provide a default quantity
              description: "No description available", // Provide a default description
            }}
          />
        ))}
      </div>
    </div>
  )
);


