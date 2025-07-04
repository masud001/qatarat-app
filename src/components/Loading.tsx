import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-full h-full py-10">
      <LoadingSpinner />
      <LoadingText />
    </div>
  );
};

const LoadingSpinner: React.FC = () => (
  <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-(--theme-color) border-opacity-75"></div>
);

const LoadingText: React.FC = () => (
  <span className="ml-4 text-(--theme-color) text-lg font-medium">Loading...</span>
);

export default Loading;