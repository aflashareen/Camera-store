import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div className="min-h-screen bg-[#080808] bg-[radial-gradient(circle_at_15%_10%,rgba(161,161,170,0.25),transparent_35%),radial-gradient(circle_at_85%_90%,rgba(113,113,122,0.12),transparent_45%)] p-3 md:p-5">
      <div className="flex flex-col gap-2 lg:flex-row">

        <aside className="w-full lg:fixed lg:left-3 lg:top-3 lg:z-40 lg:h-[calc(100vh-1.5rem)] lg:w-72">
          <Sidebar />
        </aside>
        
        <div className="flex min-w-0 flex-1 flex-col gap-2 lg:ml-[18rem]">
          <Header />

          <main className="min-h-[calc(100vh-7rem)] rounded-3xl border border-white/5 bg-[#151515] p-4 shadow-2xl md:p-6">
            <Outlet />
          </main>
        </div>

      </div>
    </div>
  );
}

export default AdminLayout;