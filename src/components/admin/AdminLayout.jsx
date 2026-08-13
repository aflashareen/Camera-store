import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div className="min-h-screen  bg-[#080808] bg-[radial-gradient(circle_at_15%_10%,rgba(161,161,170,0.25),transparent_35%),radial-gradient(circle_at_85%_90%,rgba(113,113,122,0.12),transparent_45%)] p-3 md:p-5">
      <div className="flex flex-col gap-2 lg:flex-row">

        <aside>
          <Sidebar />
        </aside>
        
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