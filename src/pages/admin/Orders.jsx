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
                <td className="px-4 py-3">{order.status}</td>
                <td className="px-4 py-3 text-center">
                  <button
                    className="p-2 hover:bg-zinc-800 rounded-lg" >
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