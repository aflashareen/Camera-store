import { useQuery } from "@tanstack/react-query";
import { useCurrentUser } from "../hooks/UseCurrentUser";
import { getOrderById } from "../services/orderService";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function Orders() {
  const { data: user } = useCurrentUser();
  const navigate = useNavigate();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["orders", user?.id],
    queryFn: () => getOrderById(user.id),
    enabled: !!user,
  });

  if (isLoading) return <p>Loading...</p>;

  if (orders.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-semibold">
          No Orders Yet
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-10 px-6">
            <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 text-gray-700 hover:text-black transition"
      >
        <ArrowLeft size={20} />
        Back
      </button>
      <h1 className="text-4xl font-bold mb-8">
        My Orders
      </h1>

      {orders.map((order) => (
        <div
          key={order.id}
          className="bg-white rounded-xl shadow p-6 mb-8"
        >
          <div className="flex justify-between mb-6">
            <div>
              <p className="font-semibold">
                Order #{order.id}
              </p>

              <p className="text-gray-500">
                {new Date(order.orderedAt).toLocaleDateString()}
              </p>
            </div>

            <span className="text-green-600 font-semibold">
              {order.status}
            </span>
          </div>

          {order.items.map((item) => (
            <div
              key={item.productId}
              className="flex items-center gap-5 border-b py-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded"
              />

              <div className="flex-1">
                <h3 className="font-semibold">
                  {item.name}
                </h3>

                <p>Qty: {item.quantity}</p>
              </div>

              <p className="font-bold">
                ₹{item.price.toLocaleString()}
              </p>
            </div>
          ))}

          <div className="text-right mt-6 text-xl font-bold">
            Total: ₹{order.total.toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Orders;