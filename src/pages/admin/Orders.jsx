import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { getOrders } from '../../services/orderService'
import { Eye } from 'lucide-react';

function AdminOrders() {
  const { data: orders = [], isLoading, isError } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });
  // const { currentPage, setCurrentPage, totalPages, currentItems } = usePagination(products ?? [], 5)

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong.</p>;
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-zinc-900 text-white">
            <tr>
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
                className="text-white border-b border-zinc-800 hover:bg-zinc-900">
                <td className="px-4 py-3">{order.id}</td>
                <td className="px-4 py-3">{order.shippingAddress?.fullName}</td>
                <td className="px-4 py-3">{new Date(order.orderedAt).toLocaleDateString()}</td>
                <td className="px-4 py-3">{order.items.length}</td>
                <td className="px-4 py-3">{order.total.toLocaleString()}</td>
                <td className="px-4 py-3">{order.paymentMethod}</td>
                <td className="px-4 py-3">{order.status}</td>
                <td className="px-4 py-3 text-center">
                  <button
                    className="p-2 hover:bg-zinc-800 rounded-lg"
                  >
                    <Eye size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

  )
}

export default AdminOrders;