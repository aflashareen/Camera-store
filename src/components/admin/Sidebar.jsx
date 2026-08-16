import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  LogOut
} from "lucide-react";

function Sidebar() {
  const navigate = useNavigate();
  const handleLogout = (user) =>{
    localStorage.removeItem("userId");
    if(user.role !== "admin"){
      navigate("/login")
    }
  }
  return (
    <aside className="flex h-full w-full flex-col rounded-3xl border border-white/5 bg-[#121212] p-6 shadow-2xl">

      <div>
        <h1 className="hidden md:block mb-10 text-2xl font-semibold text-white">
          LENSÉ
        </h1>

        <nav className="space-y-2 flex w-full items-center gap-2
           overflow-x-auto
           whitespace-nowrap
           scrollbar-hide
           lg:flex-col
           lg:items-stretch
           lg:overflow-visible
           lg:whitespace-normal">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) => `flex items-center gap-3 rounded-xl px-4 py-3 ${isActive
              ? "bg-[#1E1E1E] text-white" : "text-zinc-400 hover:bg-[#1E1E1E] hover:text-white"
              }`}>
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/products"
            className={({ isActive }) => `flex items-center gap-3 rounded-xl px-4 py-3 ${isActive
              ? "bg-[#1E1E1E] text-white" : "text-zinc-400 hover:bg-[#1E1E1E] hover:text-white"
              }`}>
            <Package size={20} />
            Products
          </NavLink>

          <NavLink
            to="/admin/users"
            className={({ isActive }) => `flex items-center gap-3 rounded-xl px-4 py-3 ${isActive
              ? "bg-[#1E1E1E] text-white" : "text-zinc-400 hover:bg-[#1E1E1E] hover:text-white"
              }`}>
            <Users size={20} />
            Users
          </NavLink>

          <NavLink
            to="/admin/orders"
            className={({ isActive }) => `flex items-center gap-3 rounded-xl px-4 py-3 ${isActive
              ? "bg-[#1E1E1E] text-white" : "text-zinc-400 hover:bg-[#1E1E1E] hover:text-white"
              }`}>
            <ShoppingCart size={20} />
            Orders
          </NavLink>
        </nav>
      </div>
      <button onClick={handleLogout}
      className="mt-auto flex w-full items-center justify-start gap-3 rounded-xl px-4 py-3 text-white transition hover:bg-[#1E1E1E]">
        <LogOut size={20} />
        Logout
      </button>
    </aside>
  );
}

export default Sidebar;