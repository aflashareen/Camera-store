import React from "react";
import { IndianRupee, ShoppingBag, Package } from "lucide-react";

function Dashboard() {
  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">

        <div className="bg-[#151515] border border-white/10 rounded-2xl p-6">
          <div className="flex justify-between items-center">
            <p className="text-gray-400">Revenue</p>
            <IndianRupee size={20} />
          </div>

          <h2 className="text-3xl font-semibold mt-4">
            ₹0
          </h2>
        </div>

        <div className="bg-[#151515] border border-white/10 rounded-2xl p-6">
          <div className="flex justify-between items-center">
            <p className="text-gray-400">Orders</p>
            <ShoppingBag size={20} />
          </div>

          <h2 className="text-3xl font-semibold mt-4">
            0
          </h2>
        </div>

        <div className="bg-[#151515] border border-white/10 rounded-2xl p-6">
          <div className="flex justify-between items-center">
            <p className="text-gray-400">Products</p>
            <Package size={20} />
          </div>

          <h2 className="text-3xl font-semibold mt-4">
            0
          </h2>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;