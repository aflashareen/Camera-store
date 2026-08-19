import React, { useEffect, useState, useRef } from "react";
import { Search, Bell, ChevronDown, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCurrentAdmin } from "../../hooks/UseAdmin";
import { useQueryClient } from "@tanstack/react-query";

function Header() {
    const { data: user } = useCurrentAdmin();

    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const hour = new Date().getHours();

    let greeting = "Welcome back!"

    if (hour < 12) greeting = "Good morning,";
    else if (hour < 17) greeting = "Good Afternoon,";
    else greeting = "Good Evening,";

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleLogout = () => {
        localStorage.removeItem("adminId");
        localStorage.removeItem("role");

        navigate("/login");
    };

    useEffect(() => {
        function handleClickOutside(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, []);
    return (
        <header className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-[#151515] p-4 md:px-6 md:py-5 shadow-xl lg:flex-row  lg:items-center lg:justify-between">

            <div className="hidden md:block">
                <p className="text-sm text-zinc-400">{greeting}</p>

                <h1 className="mt-1 text-xl md:text-2xl font-semibold text-white">
                    {user?.name ?? "Admin"}
                </h1>
            </div>


            <div className="ml-auto flex items-center gap-2 md:gap-3">
                <button className="relative rounded-xl bg-[#1D1D1D] p-3 transition hover:bg-[#262626]">
                    <Bell size={20} className="text-white" />

                    {/* <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-red-500" /> */}
                </button>
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex items-center gap-3 rounded-xl bg-[#1D1D1D] px-3 py-2 transition hover:bg-[#262626]">

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
                    {isOpen && (
                        <div className="absolute right-0 top-full mt-2 w-64 rounded-2xl border border-white/10 bg-[#1A1A1A] p-4 shadow-2xl z-50">

                            <p className="font-semibold text-white">
                                {user?.name}
                            </p>

                            <p className="text-sm text-zinc-400">
                                {user?.email}
                            </p>

                            <div className="my-3 border-t border-white/10"></div>

                            <p className="text-sm text-zinc-400">
                                Role
                            </p>

                            <p className="text-white capitalize">
                                {user?.role}
                            </p>
                            <br />
                            <button onClick={handleLogout}
                                className="text-white flex gap-2 px-4 py-3 rounded-xl hover:bg-[#1E1E1E]">
                                <LogOut size={20} />
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;