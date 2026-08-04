import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCurrentUser } from "../../hooks/UseCurrentUser";
import { useQueryClient } from "@tanstack/react-query";
import { User, Mail, Heart, ShoppingBag, LogOut, BadgeCheck, Package, ArrowLeft } from "lucide-react";

function Profile() {
  const { data: user, isLoading } = useCurrentUser();

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userId");

    queryClient.removeQueries({ queryKey: ["currentUser"] });
    queryClient.removeQueries({ queryKey: ["wishlist"] });
    queryClient.removeQueries({ queryKey: ["cart"] });

    navigate("/login");
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#2A2A2A_0%,#18181B_45%,#09090B_100%)] text-white py-12 px-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-8 text-gray-400 hover:text-white transition"
      >
        <ArrowLeft size={20} />
        Back
      </button>

      <div className="max-w-3xl mx-auto rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.45)] p-10">
        <div className="flex flex-col items-center">
          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-white/20 to-white/5 border border-white/10 flex items-center justify-center text-5xl font-bold">
            {user.fullname.charAt(0).toUpperCase()}
          </div>

          <h1 className="text-4xl font-bold mt-5 tracking-wide">
            {user.fullname}
          </h1>

          <p className="text-gray-500 mt-2">
            {user.email}
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6 space-y-6">

          <div className="flex items-center gap-4">
            <User className="text-gray-400" size={20} />
            <span>{user.fullname}</span>
          </div>

          <div className="flex items-center gap-4">
            <Mail className="text-gray-400" size={20} />
            <span>{user.email}</span>
          </div>

          <div className="flex items-center gap-4">
            <BadgeCheck className="text-gray-400" size={20} />
            <span>ID : {user.id}</span>
          </div>

        </div>

        <div className="mt-10 grid grid-cols-3 gap-4">

          <Link
            to="/wishlist"
            className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center hover:bg-white/10 transition duration-300 hover:-translate-y-1"
          >
            <Heart className="mx-auto mb-2" />
            Wishlist
          </Link>

          <Link
            to="/cart"
            className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center hover:bg-white/10 transition duration-300 hover:-translate-y-1"
          >
            <ShoppingBag className="mx-auto mb-2" />
            Cart
          </Link>

          <Link
            to="/orders"
            className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center hover:bg-white/10 transition duration-300 hover:-translate-y-1"
          >
            <Package className="mx-auto mb-2" />
            Orders
          </Link>

        </div>

        <button
          onClick={handleLogout}
          className="mt-10 w-full rounded-2xl bg-white text-black py-4 font-semibold flex items-center justify-center gap-3 hover:bg-gray-200 transition"
        >
          <LogOut size={18} />
          Logout
        </button>

      </div>

    </div>

  );
}

export default Profile;