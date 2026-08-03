import { useQuery } from "@tanstack/react-query";
import { getCart } from "../../services/cartService";
import Layout from "../../components/layout/Layout";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();

  const { data: cart = [] } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
  });

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  const shipping = 0;
  const total = subtotal + shipping;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">

      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6"
      >
        <ArrowLeft size={20} />
        Back
      </button>

      <h1 className="text-4xl font-bold mb-10">
        Checkout
      </h1>

      <div className="bg-white shadow rounded-lg p-8">

        <h2 className="text-2xl font-semibold mb-6">
          Shipping Information
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <input
            type="text"
            placeholder="Full Name"
            className="border rounded-lg p-3"
          />

          <input
            type="email"
            placeholder="Email"
            className="border rounded-lg p-3"
          />

          <input
            type="tel"
            placeholder="Phone Number"
            className="border rounded-lg p-3"
          />

          <input
            type="text"
            placeholder="City"
            className="border rounded-lg p-3"
          />

          <input
            type="text"
            placeholder="State"
            className="border rounded-lg p-3"
          />

          <input
            type="text"
            placeholder="PIN Code"
            className="border rounded-lg p-3"
          />

        </div>

        <textarea
          placeholder="Full Address"
          rows={4}
          className="border rounded-lg p-3 w-full mt-6"
        />

        <h2 className="text-2xl font-semibold mt-10 mb-5">
          Payment Method
        </h2>

        <div className="space-y-3">
          <label className="flex items-center gap-3">
            <input type="radio" name="payment" defaultChecked />
            Cash on Delivery
          </label>

          <label className="flex items-center gap-3">
            <input type="radio" name="payment" />
            Credit / Debit Card
          </label>

          <label className="flex items-center gap-3">
            <input type="radio" name="payment" />
            UPI
          </label>
        </div>

      </div>

      <div className="mt-12 bg-gray-100 rounded-xl p-8">

        <h2 className="text-3xl font-bold mb-8">
          Order Summary
        </h2>

        <div className="space-y-5">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between mb-3"
            >
              <span>{item.name}</span>
              <span>₹{item.price.toLocaleString()}</span>
            </div>
          ))}

          <hr className="my-6" />

          <div className="space-y-4">

            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString()}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-green-600">Free</span>
            </div>

            <div className="flex justify-between text-2xl font-bold">
              <span>Total</span>
              <span>₹{total.toLocaleString()}</span>
            </div>

          </div>

          <button className="w-full mt-8 bg-black text-white py-4 rounded-lg hover:bg-gray-800 transition">
            Place Order
          </button>
        </div>
      </div>
      </div>
      );
}

      export default Checkout;