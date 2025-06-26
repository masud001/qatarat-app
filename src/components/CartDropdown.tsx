import React from 'react';
import { useGetCartQuery, useAddToCartMutation, useGetProductsQuery } from '../store/slices/apiSlice';
import { CartIcon } from './CartIcon';

const CartDropdown: React.FC = () => {
  const { data: cart, isLoading: cartLoading, error: cartError } = useGetCartQuery();
  const { data: products } = useGetProductsQuery({});
  const [addToCart] = useAddToCartMutation();
  const [cartOpen, setCartOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const cartCount = cart ? cart.reduce((sum, item) => sum + item.quantity, 0) : 0;

  const getProductName = (productId: string) => {
    return products?.find((p) => p.id === productId)?.name || productId;
  };

  const handleDelete = async (productId: string) => {
    try {
      await addToCart({ productId, quantity: -9999 }).unwrap();
    } catch (err) {
      console.error("Failed to remove from cart:", err);
    }
  };

  React.useEffect(() => {
    if (!cartOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setCartOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [cartOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <CartIcon cartCount={cartCount} onClick={() => setCartOpen((v) => !v)} />
      {cartOpen && (
        <CartDropdownContent
          cart={cart}
          cartCount={cartCount}
          cartLoading={cartLoading}
          cartError={!!cartError}
          getProductName={getProductName}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default CartDropdown;



interface CartDropdownContentProps {
  cart: Array<{ productId: string; quantity: number }> | undefined;
  cartCount: number;
  cartLoading: boolean;
  cartError: boolean;
  getProductName: (productId: string) => string;
  handleDelete: (productId: string) => void;
}

const CartDropdownContent: React.FC<CartDropdownContentProps> = ({
  cart,
  cartCount,
  cartLoading,
  cartError,
  getProductName,
  handleDelete,
}) => (
  <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded shadow-lg z-10 border border-gray-200 dark:border-gray-700 p-4">
    <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">Cart ({cartCount})</h3>
    {cartLoading && <div className="text-gray-500">Loading cart...</div>}
    {cartError && <div className="text-red-500">Error loading cart</div>}
    {cart && cart.length > 0 && cartCount > 0 ? (
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {cart.map(
          (item) =>
            item.quantity > 0 && (
              <CartDropdownItem
                key={item.productId}
                productName={getProductName(item.productId)}
                quantity={item.quantity}
                onDelete={() => handleDelete(item.productId)}
              />
            )
        )}
      </ul>
    ) : (
      <div className="text-gray-500 dark:text-gray-400">Cart is empty.</div>
    )}
  </div>
);


interface CartDropdownItemProps {
  productName: string;
  quantity: number;
  onDelete: () => void;
}

const CartDropdownItem: React.FC<CartDropdownItemProps> = ({ productName, quantity, onDelete }) => (
  <li className="flex items-center justify-between py-2">
    <span className="text-gray-800 dark:text-gray-100">{productName}</span>
    <span className="text-gray-600 dark:text-gray-300">x{quantity}</span>
    <button
      className="ml-2 px-2 py-1 rounded bg-red-500 text-white text-xs hover:bg-red-600"
      onClick={onDelete}
    >
      Delete
    </button>
  </li>
);

