import React from "react";
import { NavLink } from "react-router-dom";
import { useAddToCartMutation } from "../store/slices/apiSlice";
import AddToCartButton from "./AddToCartButton";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    size: string;
    quantity: string;
    description: string;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [addToCart, { isLoading: isAdding, isSuccess, reset }] = useAddToCartMutation();
  const [addedId, setAddedId] = React.useState<string | null>(null);

  const handleAddToCart = async (productId: string) => {
    try {
      await addToCart({ productId, quantity: 1 }).unwrap();
      setAddedId(productId);
      setTimeout(() => {
        setAddedId(null);
        reset();
      }, 1200);
    } catch (err) {
      console.error("Failed to add to cart:", err);
    }
  };

  return (
    <div className="rounded-[16px] p-4 flex flex-col items-center bg-(--product-card-bg) transition-all duration-300">
      <ProductImage image={product.image} name={product.name} />
      <ProductDetails product={product} />
      <ProductPrice price={product.price} />
      <AddToCartButton
        productId={product.id}
        isAdding={isAdding}
        isSuccess={isSuccess}
        addedId={addedId}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
};

const ProductImage: React.FC<{ image: string; name: string }> = ({ image, name }) => (
  <img src={image} alt={name} className="w-[134px] rounded bg-white p-3" />
);

const ProductDetails: React.FC<{ product: ProductCardProps["product"] }> = ({ product }) => (
  <div className="flex flex-col items-center gap-3 pt-3">
    <NavLink
      to={`/single-product/${product.id}`}
      className="text-base open-sauce-one-medium leading-[19.2px] font-medium hover:underline transition-colors duration-300 text-(--product-name-color) hover:text-(--product-name-hover)"
    >
      {product.name}
    </NavLink>
    <div className="flex items-center justify-between gap-1 font-normal text-(--product-details-color)">
      <span className="text-sm font-normal open-sauce-sans">{product.size}</span>
      <span className="w-1 h-1 rounded-full bg-(--product-details-color)"></span>
      <span className="text-sm font-normal open-sauce-sans">{product.quantity}</span>
    </div>
  </div>
);

const ProductPrice: React.FC<{ price: number }> = ({ price }) => (
  <div className="flex flex-col text-center pt-2 pb-3">
    <div className="flex items-center justify-center gap-1.5 flex-row">
      <img src="/images/price-icon.svg" alt="price icons" />
      <p className="text-xl font-medium leading-[24px] text-(--product-price-color) open-sauce-one-medium">
        {price}
      </p>
    </div>
  </div>
);

export default ProductCard;