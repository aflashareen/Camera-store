import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCart, removeFromCart } from "../../services/cartService";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCurrentUser } from "../../hooks/UseCurrentUser";
import { addOrder } from "../../services/orderService";
import ShippingForm from "../../components/admin/user/checkout/ShippingForm";
import OrderSummary from "../../components/admin/user/checkout/OrderSummary";

function Checkout() {
  const navigate = useNavigate();

  const { data: user } = useCurrentUser();

  const queryClient = useQueryClient();

  const placeOrderMutation = useMutation({
    mutationFn: addOrder,

    onSuccess: async () => {
      await Promise.all(cart.map(item => removeFromCart(item.id)));

      queryClient.invalidateQueries({ queryKey: ["cart"] });

      navigate("/ordersuccess");
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
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number"
    };

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!/^\d{6}$/.test(formData.pincode)) {
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

      shippingAddress: {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
      },

      paymentMethod: formData.paymentMethod,
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
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#2a2a2a_0%,#111_45%,#000_100%)] text-white">
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
        <ShippingForm
          formData={formData}
          errors={errors}
          handleChange={handleChange}
        />
        <OrderSummary
          cart={cart}
          subtotal={subtotal}
          shipping={shipping}
          total={total}
          handlePlaceOrder={handlePlaceOrder}
        />
      </div>
    </div>
  );
}

export default Checkout;