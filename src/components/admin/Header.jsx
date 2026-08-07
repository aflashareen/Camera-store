import React from "react";
import { Search, Bell, ChevronDown } from "lucide-react";
import { useCurrentUser } from "../../hooks/UseCurrentUser";

function Header() {
  const { data: user } = useCurrentUser();

  return (
    <header className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-[#151515] p-4 md:px-6 md:py-5 shadow-xl lg:flex-row lg:items-center lg:justify-between">

      <div>
        <p className="text-sm text-zinc-400">
          Welcome back!
        </p>

        <h1 className="mt-1 text-xl md:text-2xl font-semibold text-white">
          {user?.name || "Admin"}
        </h1>
      </div>


      <div className="flex w-full items-center gap-3 lg:w-auto">

        <div className="relative flex-1 max-w-md">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
          />

          <input
            type="text"
            placeholder="Search..."
            className="w-full rounded-xl border border-white/10 bg-[#1D1D1D] py-3 pl-11 pr-4 text-sm text-white placeholder:text-zinc-500 outline-none transition focus:border-white/20"
          />
        </div>

        <button className="relative rounded-xl bg-[#1D1D1D] p-3 transition hover:bg-[#262626]">
          <Bell size={20} className="text-white" />

          <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <button className="flex items-center gap-3 rounded-xl bg-[#1D1D1D] px-3 py-2 transition hover:bg-[#262626]">

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white font-semibold text-black">
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <div className="hidden text-left md:block">
            <p className="text-sm font-medium text-white">
              {user?.name}
            </p>

            <p className="text-xs text-zinc-400">
              Administrator
            </p>
          </div>

          <ChevronDown size={16} className="hidden text-zinc-400 md:block" />

        </button>

      </div>
    </header>
  );
}

export default Header;