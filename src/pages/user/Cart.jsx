import { useDispatch, useSelector } from "react-redux";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../../redux/slices/CartSlice";
import { Trash2 } from "lucide-react";

function Cart() {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-gray-800">
            Your Cart is Empty
          </h2>
          <p className="mt-3 text-gray-500">
            Add your favorite cameras to get started.
          </p>
        </div>
      </div>
    );
  }

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-10">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">

        <div className="lg:col-span-2 space-y-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row items-center gap-6 border rounded border-none p-6 shadow-sm hover:shadow-md transition"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-40 h-40 object-contain"
              />

              <div className="flex-1">
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p className="text-gray-500 mt-1">{item.brand}</p>

                <p className="text-2xl font-bold mt-4">
                  ₹{item.price.toLocaleString()}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                disabled={item.quantity === 1}
                  onClick={() => dispatch(decreaseQuantity(item.id))}
                  className="w-10 h-10 rounded-full border text-xl"
                >
                  −
                </button>

                <span className="text-lg font-semibold w-8 text-center">
                  {item.quantity}
                </span>

                <button
                  onClick={() => dispatch(increaseQuantity(item.id))}
                  className="w-10 h-10 rounded-full border text-xl"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="text-red-500 hover:text-red-600"
              >
                <Trash2 size={22} />
              </button>
            </div>
          ))}
        </div>

        <div className="border rounded border-none p-8 h-fit shadow-sm sticky top-24">
          <h2 className="text-2xl font-semibold mb-6">
            Order Summary
          </h2>

          <div className="flex justify-between mb-4">
            <span>Items</span>
            <span>{cart.length}</span>
          </div>

          <div className="flex justify-between mb-6">
            <span>Total</span>
            <span className="text-2xl font-bold">
              ₹{total.toLocaleString()}
            </span>
          </div>

          <button className="w-full bg-black text-white py-4 rounded-xl hover:bg-gray-900 transition">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;