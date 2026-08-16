import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useRef } from 'react'
import { getOrders, updateOrder } from '../../services/orderService'
import { Eye } from 'lucide-react';
import { useState } from 'react';
import OrderDetails from '../../components/admin/order/OrderDetails';
import useClickOutside from '../../hooks/UseClickOutside';

function AdminOrders() {
  const { data: orders = [], isLoading, isError } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });
  const [selectedOrder, setSelectedOrder] = useState(null);
  const queryClient = useQueryClient();

  const updateStatusMutation = useMutation({
    mutationFn: updateOrder,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
  });

  const handleStatusChange = (order, e) => {
    updateStatusMutation.mutate({
      id: order.id,
      data: {
        status: e.target.value,
      },
    });
  };
const orderDetailsRef = useRef(null);

useClickOutside(orderDetailsRef, () => {
  setSelectedOrder(null);
});
  // const { currentPage, setCurrentPage, totalPages, currentItems } = usePagination(products ?? [], 5)

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong.</p>;
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#151515] shadow-xl">
      <div className='overflow-x-auto'>
        <table className="w-full min-w-[1000px]">
          <thead>
            <tr className='border-b border-white/10 bg-white/[0.02] text-left text-xs uppercase tracking-wider text-gray-500'>
              <th className="px-4 py-3 text-left">Order</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Items</th>
              <th className="px-4 py-3 text-left">Amount</th>
              <th className="px-4 py-3 text-left">Payment method</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}
                className="border-b border-white/5 text-sm text-gray-300 transition hover:bg-white/[0.03]">
                <td className="px-4 py-3">{order.id}</td>
                <td className="px-4 py-3">{order.shippingAddress?.fullName || "Unknown"}</td>
                <td className="px-4 py-3">{new Date(order.orderedAt).toLocaleDateString()}</td>
                <td className="px-4 py-3">{order.items.length}</td>
                <td className="px-4 py-3">{order.total.toLocaleString()}</td>
                <td className="px-4 py-3">{order.paymentMethod}</td>
                <td className="px-4 py-3">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order, e)}
                    disabled={updateStatusMutation.isPending}
                    className={`rounded-full px-3 py-1.5 text-xs font-medium border outline-none cursor-pointer appearance-none transition
                      ${order.status === "Pending"
                        ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" : order.status === "Processing"
                          ? "bg-blue-500/10 text-blue-400 border-blue-500/20" : order.status === "Shipped"
                            ? "bg-purple-500/10 text-purple-400 border-purple-500/20" : order.status === "Delivered"
                              ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-red-500/10 text-red-400 border-red-500/20"
                      }`}>
                    <option value="Pending" className="bg-[#151515] text-yellow-400">Pending</option>
                    <option value="Processing" className="bg-[#151515] text-blue-400">Processing</option>
                    <option value="Shipped" className="bg-[#151515] text-purple-400">Shipped</option>
                    <option value="Delivered" className="bg-[#151515] text-green-400">Delivered</option>
                    <option value="Cancelled" className="bg-[#151515] text-red-400">Cancelled</option>
                  </select>
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="p-2 hover:bg-zinc-800 rounded-lg" >
                    <Eye size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedOrder && (
        <OrderDetails
          order={selectedOrder}
          dropdownRef={orderDetailsRef}
          onClose={() => setSelectedOrder(null)} />
      )}
    </div>
  )
}

export default AdminOrders;