import React from "react";

interface ErrorProps {
  message: string;
}

const Error: React.FC<ErrorProps> = ({ message }) => {
  return (
    <div className="flex items-center justify-center w-full py-10">
      <ErrorMessage message={message} />
    </div>
  );
};

const ErrorMessage: React.FC<{ message: string }> = ({ message }) => (
  <div className="text-red-500 text-lg font-medium">{message}</div>
);

export default Error;