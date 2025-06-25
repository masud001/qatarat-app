import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-full h-full py-10">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[--active-text-color] border-opacity-75"></div>
      <span className="ml-4 text-gray-500 dark:text-gray-400 text-lg font-medium">Loading...</span>
    </div>
  );
};

export default Loading;