import React from "react";

interface AddToCartButtonProps {
  productId: string;
  isAdding: boolean;
  isSuccess: boolean;
  addedId: string | null;
  onAddToCart: (productId: string) => void;
  className?: string;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  productId,
  isAdding,
  isSuccess,
  addedId,
  onAddToCart,
  className = "",
}) => {
  const isProductAdded = isSuccess && addedId === productId;

  const getButtonText = (): string => {
    if (isAdding && addedId === productId) return "Adding...";
    if (isProductAdded) return "Added!";
    return "Add to Cart";
  };

  const buttonStyles = isProductAdded
    ? "bg-(--active-text-color) text-white"
    : "bg-(--add-to-cart-bg) text-(--add-to-cart-text) hover:bg-(--add-to-cart-hover)";

  return (
    <button
      className={`text-base font-medium inter leading-[22.4px] py-2 px-2 text-center rounded-full w-full cursor-pointer transition ${buttonStyles} ${className}`}
      onClick={() => onAddToCart(productId)}
      disabled={isAdding && addedId === productId}
    >
      {getButtonText()}
    </button>
  );
};

export default AddToCartButton;