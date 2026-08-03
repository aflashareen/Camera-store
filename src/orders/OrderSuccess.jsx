import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

function OrderSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
      <div className="bg-white shadow-lg rounded-2xl p-10 max-w-lg w-full text-center">

        <CheckCircle2
          size={80}
          className="text-green-500 mx-auto mb-6"
        />

        <h1 className="text-3xl font-bold mb-3">
          Order Placed Successfully!
        </h1>

        <p className="text-gray-600 mb-8">
          Thank you for shopping with <span className="font-semibold">LENSÉ</span>.
          Your order has been placed and is being processed.
        </p>

        <div className="bg-gray-100 rounded-xl p-5 text-left mb-8">
          <div className="flex justify-between mb-3">
            <span>Order Status</span>
            <span className="text-green-600 font-semibold">
              Confirmed
            </span>
          </div>

          <div className="flex justify-between">
            <span>Estimated Delivery</span>
            <span>3 - 5 Business Days</span>
          </div>
        </div>

        <div className="flex gap-4">
          <Link
            to="/orders"
            className="flex-1 bg-black text-white py-3 rounded-lg text-center hover:bg-gray-800"
          >
            View Orders
          </Link>

          <Link
            to="/shop"
            className="flex-1 border border-black py-3 rounded-lg text-center hover:bg-gray-100"
          >
            Continue Shopping
          </Link>
        </div>

      </div>
    </div>
  );
}

export default OrderSuccess;