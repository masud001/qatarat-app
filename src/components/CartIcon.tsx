import React from 'react';

interface CartIconProps {
  cartCount: number;
  onClick?: () => void;
}

export const CartIcon: React.FC<CartIconProps> = ({ cartCount, onClick }) => {
  return (
    <button
      className={`relative flex items-center px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none ${cartCount === 0 ? 'opacity-50' : ''}`}
      onClick={onClick}
      aria-haspopup="true"
      aria-label="Cart"
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A2 2 0 0 0 7.48 19h9.04a2 2 0 0 0 1.83-1.3L21 13M7 13V6a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v7"
        />
      </svg>
      {cartCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
          {cartCount}
        </span>
      )}
    </button>
  );
}; 