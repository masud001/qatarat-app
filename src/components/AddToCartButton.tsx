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
  className,
}) => {
  const getButtonText = () => {
    if (isAdding && addedId === productId) return "Adding...";
    if (isSuccess && addedId === productId) return "Added!";
    return "Add to Cart";
  };

  const isProductAdded = isSuccess && addedId === productId;

  return (
    <button
      className={`text-[16px] font-medium py-2 px-2 text-center rounded-full w-full cursor-pointer transition ${
        isProductAdded
          ? "bg-(--active-text-color) text-white"
          : "bg-(--add-to-cart-bg) text-(--add-to-cart-text) hover:bg-(--add-to-cart-hover)"
      } ${className || ""}`}
      onClick={() => onAddToCart(productId)}
      disabled={isAdding && addedId === productId}
    >
      {getButtonText()}
    </button>
  );
};

export default AddToCartButton;