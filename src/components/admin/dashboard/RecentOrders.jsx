import React from "react";

function RecentOrders({ orders }) {
  const recentOrders = orders.slice(-5).reverse();

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold text-white">
        Recent Orders
      </h2>

      <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-[#151515]">
        <div className="grid grid-cols-4 border-b border-white/10 px-6 py-4 text-sm text-gray-400">
          <p>Order</p>
          <p>Amount</p>
          <p>Status</p>
          <p>Date</p>
        </div>

        {recentOrders.map((order) => (
          <div
            key={order.id}
            className="grid grid-cols-4 border-b border-white/5 px-6 py-4 text-sm text-white last:border-b-0"
          >
            <p>#{order.id}</p>

            <p>₹{Number(order.total || 0).toLocaleString()}</p>

            <p>{order.status}</p>

            <p>
              {new Date(order.orderedAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentOrders;