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
    <div className=" py-12 px-6 bg-zinc-300">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 text-gray-700 hover:text-black transition"
      >
        <ArrowLeft size={20} />
        Back
      </button>

      <div className="max-w-3xl mx-auto rounded bg-white shadow-md p-8">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-black text-white flex items-center justify-center text-4xl font-bold">
            {user.fullname.charAt(0).toUpperCase()}
          </div>

          <h1 className="text-3xl font-semibold mt-4">
            {user.fullname}
          </h1>

          <p className="text-gray-500">
            {user.email}
          </p>
        </div>

        <div className="mt-10 space-y-5">

          <div className="flex items-center gap-4">
            <User />
            <span>{user.fullname}</span>
          </div>

          <div className="flex items-center gap-4">
            <Mail />
            <span>{user.email}</span>
          </div>

          <div className="flex items-center gap-4">
            <BadgeCheck />
            <span>{user.id}</span>
          </div>

        </div>

        <div className="mt-10 grid grid-cols-3 gap-4">

          <Link
            to="/wishlist"
            className="border rounded-lg p-5 text-center hover:bg-gray-100"
          >
            <Heart className="mx-auto mb-2" />
            Wishlist
          </Link>

          <Link
            to="/cart"
            className="border rounded-lg p-5 text-center hover:bg-gray-100"
          >
            <ShoppingBag className="mx-auto mb-2" />
            Cart
          </Link>

          <Link
            to="/orders"
            className="border rounded-lg p-5 text-center hover:bg-gray-100"
          >
            <Package className="mx-auto mb-2" />
            Orders
          </Link>

        </div>

        <button
          onClick={handleLogout}
          className="mt-10 w-full bg-black text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-neutral-800"
        >
          <LogOut size={18} />
          Logout
        </button>

      </div>

    </div>

  );
}

export default Profile;