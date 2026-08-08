import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div className="min-h-screen bg-zinc-500 p-3 md:p-5">
      <div className="flex flex-col gap-2 lg:flex-row">

        <Sidebar />

        <div className="flex flex-1 flex-col gap-2">
          <Header />

          <main className="flex-1 rounded-3xl border border-white/5 bg-[#151515] p-4 md:p-6 shadow-2xl">
            <Outlet />
          </main>
        </div>

      </div>
    </div>
  );
}

export default AdminLayout;