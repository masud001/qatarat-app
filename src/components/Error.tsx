import React from "react";

interface ErrorProps {
  message: string; // Error message to display
}

const Error: React.FC<ErrorProps> = ({ message }) => {
  return (
    <div className="flex items-center justify-center w-full py-10">
      <div className="text-red-500 text-lg font-medium">{message}</div>
    </div>
  );
};

export default Error;