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
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#262626_0%,#111_45%,#000_100%)] text-white">
      <div className="max-w-6xl mx-auto py-12 px-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-8 text-gray-400 hover:text-white transition"
        >
          <ArrowLeft size={20} />
          Back
        </button>
        <h1 className="text-5xl font-bold tracking-tight mb-10">
          My Orders
        </h1>

        {orders.map((order) => (
          <div
            key={order.id}
            className="mb-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-8 shadow-[0_20px_80px_rgba(0,0,0,0.45)]"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-6">
              <div>
                <p className="text-xl font-semibold">
                  Order #{order.id}
                </p>

                <p className="text-sm text-gray-400 mt-1">
                  {new Date(order.orderedAt).toLocaleDateString()}
                </p>
              </div>

              <span className="rounded-full bg-green-500/15 border border-green-400/20 px-4 py-2 text-green-400 text-sm font-semibold">
                {order.status}
              </span>
            </div>

            {order.items.map((item) => (
              <div
                key={item.productId}
                className="flex items-center gap-6 rounded-2xl border border-white/10 bg-white/5 p-4 mb-4 hover:bg-white/10 transition"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-28 h-28 rounded-xl object-cover"
                />

                <div className="flex-1">
                  <h3 className="text-lg font-semibold">
                    {item.name}
                  </h3>

                  <p className="text-gray-400 mt-1">Qty: {item.quantity}</p>
                </div>

                <p className="text-xl font-bold">
                  ₹{item.price.toLocaleString()}
                </p>
              </div>
            ))}

            <div className="mt-8 flex justify-between items-center border-t border-white/10 pt-6">
              <span className="text-lg text-gray-400">
                Order Total
              </span>

              <span className="text-3xl font-bold">
                ₹{order.total.toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;