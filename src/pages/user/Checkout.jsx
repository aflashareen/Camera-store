import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCart, removeFromCart } from "../../services/cartService";
import Layout from "../../components/layout/Layout";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCurrentUser } from "../../hooks/UseCurrentUser";
import { addOrder } from "../../services/orderService";

function Checkout() {
  const navigate = useNavigate();

  const { data: user } = useCurrentUser();

  const queryClient = useQueryClient();

  const placeOrderMutation = useMutation({
    mutationFn: addOrder,

    onSuccess: async () => {
      await Promise.all(
        cart.map((item) => removeFromCart(item.id))
      );

      queryClient.invalidateQueries({ queryKey: ["cart"] });

      navigate("/orders");
    }
  })

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    pincode: "",
    address: "",
    paymentMethod: "Cash on Delivery",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [errors, setErrors] = useState({});

  const validate = () => {

    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    };

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else if (formData.phone.length !== 10) {
      newErrors.phone = "Enter a valid 10-digit phone number"
    };

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (formData.pincode.length !== 6) {
      newErrors.pincode = "Enter a valid 6-digit PIN code";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!formData.state.trim()) {
      newErrors.state = "State is required";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  const handlePlaceOrder = () => {
    if (!validate()) return;

    const order = {
      userId: user.id,
      items: cart.map((item) => ({
        productId: item.productId,
        name: item.name,
        image: item.image,
        price: item.price,
        quantity: item.quantity || 1,
      })),
      total,
      status: "Pending",
      orderedAt: new Date().toISOString(),
    };

    placeOrderMutation.mutate(order);
  };


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

          <div>
            <input
              type="text"
              placeholder="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm">{errors.fullName}</p>
            )}
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          <div>
            <input
              type="tel"
              placeholder="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.city}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="State"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.state}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="PIN Code"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.pincode}</p>
            )}
          </div>

        </div>

        <textarea
          placeholder="Full Address"
          rows={4}
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="border rounded-lg p-3 w-full mt-6"
        />
        {errors.address && (
          <p className="text-red-500 text-sm">{errors.fullName}</p>
        )}

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

          <button
            onClick={handlePlaceOrder}
            className="w-full mt-8 bg-black text-white py-4 rounded-lg hover:bg-black/80 transition">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;