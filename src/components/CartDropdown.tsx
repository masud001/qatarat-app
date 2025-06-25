import React from 'react';
import { useGetCartQuery, useAddToCartMutation, useGetProductsQuery } from '../store/slices/apiSlice';
import { CartIcon } from './CartIcon';

const CartDropdown: React.FC = () => {
  const { data: cart, isLoading: cartLoading, error: cartError } = useGetCartQuery();
  const { data: products } = useGetProductsQuery({});
  const [addToCart] = useAddToCartMutation();
  const [cartOpen, setCartOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const handleDelete = async (productId: string) => {
    try {
      console.log('Removing product from cart:', productId);
      await addToCart({ productId, quantity: -9999 }).unwrap();
      console.log('Product removed from cart');
    } catch (err) {
      console.error('Failed to remove from cart:', err);
    }
  };

  const cartCount = cart ? cart.reduce((sum, item) => sum + item.quantity, 0) : 0;

  const getProductName = (productId: string) => {
    return products?.find((p) => p.id === productId)?.name || productId;
  };

  React.useEffect(() => {
    if (!cartOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setCartOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [cartOpen]);

  // Debug logging
  React.useEffect(() => {
    console.log('Cart data updated:', cart);
    console.log('Cart count:', cartCount);
  }, [cart, cartCount]);

  return (
    <div className="relative" ref={dropdownRef}>
      <CartIcon cartCount={cartCount} onClick={() => setCartOpen((v) => !v)} />
      {cartOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded shadow-lg z-10 border border-gray-200 dark:border-gray-700 p-4">
          <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">Cart ({cartCount})</h3>
          {cartLoading && <div className="text-gray-500">Loading cart...</div>}
          {cartError && <div className="text-red-500">Error loading cart</div>}
          {cart && cart.length > 0 && cartCount > 0 ? (
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {cart.map(item => (
                item.quantity > 0 && (
                  <li key={item.productId} className="flex items-center justify-between py-2">
                    <span className="text-gray-800 dark:text-gray-100">{getProductName(item.productId)}</span>
                    <span className="text-gray-600 dark:text-gray-300">x{item.quantity}</span>
                    <button
                      className="ml-2 px-2 py-1 rounded bg-red-500 text-white text-xs hover:bg-red-600"
                      onClick={() => handleDelete(item.productId)}
                    >
                      Delete
                    </button>
                  </li>
                )
              ))}
            </ul>
          ) : (
            <div className="text-gray-500 dark:text-gray-400">Cart is empty.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default CartDropdown; 