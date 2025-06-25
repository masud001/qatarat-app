const Order = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center transition-colors duration-300"
      style={{ backgroundColor: 'var(--background-color)', color: 'var(--text-color)' }}
    >
      <div className="bg-white  rounded-xl shadow-lg p-8 max-w-md w-full text-center border border-gray-200 ">
        <h1 className="text-2xl font-bold text-gray-900  mb-4">Order</h1>
        <p className="text-gray-600 ">Your order details will appear here.</p>
      </div>
    </div>
  );
}

export default Order;