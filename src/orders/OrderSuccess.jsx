import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

function OrderSuccess() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#2A2A2A_0%,#18181B_45%,#09090B_100%)] flex items-center justify-center px-6">
      <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.45)] p-10 text-center">

        <div className="flex justify-center mb-6">
          <div className="flex h-24 w-24 items-center justify-center rounded-full border border-green-500/30 bg-green-500/10">
            <CheckCircle2
              size={64}
              className="text-green-400"
            />
          </div>
        </div>

        <h1 className="text-4xl font-bold text-white mb-4">
          Order Placed Successfully
        </h1>

        <p className="text-gray-400 leading-7 mb-10">
          Thank you for choosing{" "}
          <span className="font-semibold text-white">
            LENSÉ
          </span>
          . Your order has been successfully placed and is now being
          processed. We'll notify you once it's shipped.
        </p>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 mb-10">

          <div className="flex justify-between items-center mb-5">
            <span className="text-gray-400">
              Order Status
            </span>

            <span className="rounded-full bg-green-500/15 px-4 py-1 text-sm font-semibold text-green-400">
              Confirmed
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-400">
              Estimated Delivery
            </span>

            <span className="font-medium text-white">
              3–5 Business Days
            </span>
          </div>

        </div>

        <div className="grid sm:grid-cols-2 gap-4">

          <Link
            to="/orders"
            className="rounded-xl bg-white py-3 font-semibold text-black transition-all duration-300 hover:bg-gray-200"
          >
            View Orders
          </Link>

          <Link
            to="/shop"
            className="rounded-xl border border-white/15 bg-white/5 py-3 text-white transition-all duration-300 hover:bg-white/10"
          >
            Continue Shopping
          </Link>

        </div>

      </div>
    </div>
  );
}

export default OrderSuccess;