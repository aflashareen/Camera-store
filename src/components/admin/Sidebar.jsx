import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  LogOut
} from "lucide-react";

function Sidebar() {
  return (
    <aside className="flex h-full w-full lg:w-72 flex-col p-6 rounded-3xl bg-white/[0.06] backdrop-blur-2xl border border-white/10">

      <div>
        <h1 className="mb-10 text-2xl font-semibold text-white">
          LENSÉ
        </h1>

        <nav className="space-y-2">

          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) => `flex items-center gap-3 rounded-xl px-4 py-3 ${isActive
              ? "bg-white/[0.09] text-white" : "text-zinc-400 hover:bg-white/[0.06] hover:text-white"
              }`}>
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/products"
            className={({ isActive }) => `flex items-center gap-3 rounded-xl px-4 py-3 ${isActive
              ? "bg-white/[0.09] text-white" : "text-zinc-400 hover:bg-white/[0.06] hover:text-white"
              }`}>
            <Package size={20} />
            Products
          </NavLink>

          <NavLink
            to="/admin/users"
            className={({ isActive }) => `flex items-center gap-3 rounded-xl px-4 py-3 ${isActive
              ? "bg-white/[0.09] text-white" : "text-zinc-400 hover:bg-white/[0.06] hover:text-white"
              }`}>
            <Users size={20} />
            Users
          </NavLink>

          <NavLink
            to="/admin/orders"
            className={({ isActive }) => `flex items-center gap-3 rounded-xl px-4 py-3 ${isActive
              ? "bg-white/[0.09] text-white" : "text-zinc-400 hover:bg-white/[0.06] hover:text-white"
              }`}>
            <ShoppingCart size={20} />
            Orders
          </NavLink>
        </nav>
      </div>
      <button className="mt-auto flex items-center gap-3 rounded-xl px-4 py-3 text-white transition hover:bg-[#1E1E1E]">
        <LogOut size={20} />
        Logout
      </button>
    </aside>
  );
}

export default Sidebar;