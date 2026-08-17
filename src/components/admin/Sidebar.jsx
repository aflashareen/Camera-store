import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  LogOut,
} from "lucide-react";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 ${
      isActive
        ? "bg-[#1E1E1E] text-white"
        : "text-zinc-400 hover:bg-[#1E1E1E] hover:text-white"
    }`;

  return (
    <aside className="flex h-full w-full flex-col rounded-3xl border border-white/5 bg-[#121212] p-6 shadow-2xl">
      <h1 className="mb-4 text-2xl font-semibold text-white lg:mb-10"> LENSÉ</h1>

      <nav className="flex w-full gap-2 overflow-x-auto scrollbar-hide lg:flex-col lg:overflow-visible">
        <NavLink to="/admin/dashboard" className={linkClass}>
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/admin/products" className={linkClass}>
          <Package size={20} />
          <span>Products</span>
        </NavLink>

        <NavLink to="/admin/users" className={linkClass}>
          <Users size={20} />
          <span>Users</span>
        </NavLink>

        <NavLink to="/admin/orders" className={linkClass}>
          <ShoppingCart size={20} />
          <span>Orders</span>
        </NavLink>
      </nav>

      <button
        onClick={handleLogout}
        className="mt-auto hidden items-center gap-3 rounded-xl px-4 py-3 text-white hover:bg-[#1E1E1E] lg:flex">
        <LogOut size={20} />
        Logout
      </button>

    </aside>
  );
}

export default Sidebar;