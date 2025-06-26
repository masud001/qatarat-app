import React from "react";
import { useGetCartQuery, useAddToCartMutation, useGetProductsQuery } from "../store/slices/apiSlice";
import NavigationButton from "../components/NavigationButton";
import PageTitle from "../components/PageTitle";
import Loading from "../components/Loading";
import Error from "../components/Error";
import { useNavigate } from "react-router-dom";

const Cart: React.FC = () => {
  const { data: cart, isLoading: cartLoading, error: cartError } = useGetCartQuery();
  const { data: products, isLoading: productsLoading } = useGetProductsQuery({});
  const [addToCart] = useAddToCartMutation();
  const navigate = useNavigate();

  const getProductDetails = (productId: string) => {
    return products?.find((p) => p.id === productId);
  };

  const handleUpdateQuantity = async (productId: string, newQuantity: number) => {
    try {
      if (newQuantity <= 0) {
        await addToCart({ productId, quantity: -9999 }).unwrap();
      } else {
        const currentItem = cart?.find((item) => item.productId === productId);
        const currentQuantity = currentItem?.quantity || 0;
        const difference = newQuantity - currentQuantity;
        await addToCart({ productId, quantity: difference }).unwrap();
      }
    } catch (err) {
      console.error("Failed to update quantity:", err);
    }
  };

  const handleRemoveItem = async (productId: string) => {
    try {
      await addToCart({ productId, quantity: -9999 }).unwrap();
    } catch (err) {
      console.error("Failed to remove item:", err);
    }
  };

  const calculateTotal = () => {
    if (!cart || !products) return 0;
    return cart.reduce((total, item) => {
      const product = getProductDetails(item.productId);
      return total + (product?.price || 0) * item.quantity;
    }, 0);
  };

  const cartItems = cart?.filter((item) => item.quantity > 0) || [];
  const total = calculateTotal();

  if (cartLoading || productsLoading) {
    return <Loading />;
  }

  if (cartError) {
    return <Error message="Failed to load cart." />;
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center p-6 transition-colors duration-300"
      style={{ backgroundColor: "var(--background-color)", color: "var(--text-color)" }}
    >
      <div className="w-full max-w-[712px] mx-auto pb-8">
        <div className="flex justify-between items-center gap-3">
          <NavigationButton className="!bg-[#F3EFF6]" />
          <div className="page-title">
          <PageTitle title="Cart" />
          </div>
        </div>
      </div>

      {cartItems.length === 0 ? (
        <EmptyCart navigate={navigate} />
      ) : (
        <div className="w-full max-w-[712px] mx-auto space-y-6">
          <CartItems
            cartItems={cartItems}
            getProductDetails={getProductDetails}
            handleUpdateQuantity={handleUpdateQuantity}
            handleRemoveItem={handleRemoveItem}
          />
          <CartSummary cartItems={cartItems} total={total} />
        </div>
      )}
    </div>
  );
};

export default Cart;



const EmptyCart: React.FC<{ navigate: (path: string) => void }> = ({ navigate }) => (
  <div className="flex flex-col items-center justify-center flex-1">
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center border border-gray-200">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
      <p className="text-gray-600 mb-6">Add some products to get started!</p>
      <button
        onClick={() => navigate("/product-list")}
        className="bg-(--add-to-cart-bg) text-(--add-to-cart-text) px-6 py-2 rounded-full hover:bg-(--add-to-cart-hover) transition"
      >
        Continue Shopping
      </button>
    </div>
  </div>
);


interface CartItemsProps {
  cartItems: Array<{ productId: string; quantity: number }>;
  getProductDetails: (productId: string) => { id: string; name: string; image: string; size: string; price: number } | undefined;
  handleUpdateQuantity: (productId: string, newQuantity: number) => void;
  handleRemoveItem: (productId: string) => void;
}

const CartItems: React.FC<CartItemsProps> = ({
  cartItems,
  getProductDetails,
  handleUpdateQuantity,
  handleRemoveItem,
}) => (
  <div className="space-y-4">
    {cartItems.map((item) => {
      const product = getProductDetails(item.productId);
      if (!product) return null;

      return (
        <CartItem
          key={item.productId}
          product={product}
          quantity={item.quantity}
          handleUpdateQuantity={handleUpdateQuantity}
          handleRemoveItem={handleRemoveItem}
        />
      );
    })}
  </div>
);



interface CartItemProps {
  product: {
    id: string;
    name: string;
    image: string;
    size: string;
    price: number;
  };
  quantity: number;
  handleUpdateQuantity: (productId: string, newQuantity: number) => void;
  handleRemoveItem: (productId: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  product,
  quantity,
  handleUpdateQuantity,
  handleRemoveItem,
}) => (
  <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
    <div className="flex items-center gap-4">
      <img
        src={product.image}
        alt={product.name}
        className="w-20 h-20 object-contain rounded bg-gray-100"
      />
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-2">Size: {product.size}</p>
        <p className="text-lg font-bold text-(--text-color)">${product.price}</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => handleUpdateQuantity(product.id, quantity - 1)}
          className="w-8 h-8 rounded-full bg-[#F3EFF6] text-gray-700 hover:bg-gray-300 transition cursor-pointer"
          disabled={quantity <= 1}
        >
          -
        </button>
        <span className="w-12 text-center font-semibold text-gray-900">{quantity}</span>
        <button
          onClick={() => handleUpdateQuantity(product.id, quantity + 1)}
          className="w-8 h-8 rounded-full bg-[#F3EFF6] text-gray-700 hover:bg-gray-300 transition cursor-pointer"
        >
          +
        </button>
      </div>
      <button
        onClick={() => handleRemoveItem(product.id)}
        className="text-[#c92c2c] hover:text-[#c92c2c] transition p-2"
        title="Remove item"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
  </div>
);


interface CartSummaryProps {
  cartItems: Array<{ productId: string; quantity: number }>;
  total: number;
}

const CartSummary: React.FC<CartSummaryProps> = ({ cartItems, total }) => (
  <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-bold text-gray-900">Cart Summary</h2>
      <span className="text-lg font-semibold text-gray-900">Total: ${total.toFixed(2)}</span>
    </div>
    <div className="space-y-3">
      <div className="flex justify-between text-gray-600">
        <span>Subtotal ({cartItems.length} items)</span>
        <span>${total.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-gray-600">
        <span>Shipping</span>
        <span>Free</span>
      </div>
      <hr className="border-gray-200 dark:border-gray-600" />
      <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
    </div>
    <button
      className="w-full mt-6 bg-(--add-to-cart-bg) text-(--add-to-cart-text) py-3 px-6 rounded-full font-semibold hover:bg-(--add-to-cart-hover) transition"
    >
      Proceed to Checkout
    </button>
  </div>
);

