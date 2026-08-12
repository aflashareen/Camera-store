import React from "react";
import { IndianRupee, ShoppingBag, Package,Users } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../services/productService";
import { getOrders } from "../../services/orderService";
import RecentOrders from "../../components/admin/dashboard/RecentOrders";
import SalesOverview from "../../components/admin/dashboard/SalesOverview";
import { getUsers } from "../../services/userService";
import TopSelling from "../../components/admin/dashboard/TopSelling";

function Dashboard() {
  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts
  });
  const { data: orders = [] } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders
  });
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
  const activeUsers = users.filter(
    (user) => user.role === "user"
  ).length;
  const revenue = orders.reduce((total, order) => {
    return total + Number(order.total || 0);
  }, 0);

  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-8">

        <div className="bg-[#151515] border border-white/10 rounded-2xl p-6">
          <div className="flex justify-between items-center">
            <p className="text-gray-400">Revenue</p>
            <IndianRupee size={20} />
          </div>

          <h2 className="text-3xl font-semibold mt-4">
            ₹{revenue.toLocaleString()}
          </h2>
        </div>

        <div className="bg-[#151515] border border-white/10 rounded-2xl p-6">
          <div className="flex justify-between items-center">
            <p className="text-gray-400">Orders</p>
            <ShoppingBag size={20} />
          </div>

          <h2 className="text-3xl font-semibold mt-4">
            {orders.length}
          </h2>
        </div>

        <div className="bg-[#151515] border border-white/10 rounded-2xl p-6">
          <div className="flex justify-between items-center">
            <p className="text-gray-400">Products</p>
            <Package size={20} />
          </div>

          <h2 className="text-3xl font-semibold mt-4">
            {products.length}
          </h2>
        </div>
        
      <div className="bg-[#151515] border border-white/10 rounded-2xl p-6">
        <div className="flex justify-between items-center">
          <p className="text-gray-400">Active Users</p>
          <Users size={20} />
        </div>

        <h2 className="text-3xl font-semibold mt-4">
          {activeUsers}
        </h2>
      </div>
      </div>
      <div >
        <SalesOverview orders={orders} />
      </div>
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RecentOrders orders={orders} />
        <TopSelling orders={orders}/>
      </div>
    </div>
  );
}

export default Dashboard;