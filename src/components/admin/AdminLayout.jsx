import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div className="min-h-screen bg-[#070707] bg-[radial-gradient(circle_at_15%_10%,rgba(161,161,170,0.18),transparent_35%),radial-gradient(circle_at_85%_90%,rgba(161,161,170,0.18),transparent_35%)] p-3 md:p-5">

      <aside className="fixed left-4 top-5 bottom-4 z-50 hidden lg:block">
        <Sidebar />
      </aside>

      <div className="lg:ml-[300px] flex min-h-[calc(100vh-24px)] flex-col gap-3">

        <Header />

        <main className="flex-1 rounded-3xl bg-white/[0.06] backdrop-blur-2xl border border-white/10 p-4 md:p-6 shadow-2xl">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default AdminLayout;