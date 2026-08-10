import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserByEmail } from "../../../services/authService";

function Login() {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: getUserByEmail,

    onSuccess: (data) => {
      if (data.length === 0) {
        setErrors({
          email: "Email not found",
        });
        return;
      }

      const user = data[0];

      if (user.password !== formData.password) {
        setErrors({
          password: "Incorrect password",
        });
        return;
      }

      if (user.isBlocked) {
        setErrors({ general:"Your account has been blocked."});
        return; }

      localStorage.setItem("userId", user.id);

      queryClient.setQueryData(["currentUser", user.id], user);
      navigate("/");

    },
    onError: (error) => {
      setErrors({
        general: "Something went wrong. Please try again.",
      });
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors({});

    loginMutation.mutate(formData.email);
  };

  return (
    <form onSubmit={handleSubmit} className="min-h-screen flex items-center justify-center">

      <div className="w-full max-w-xl bg-white shadow-lg p-8">
        <h1 className="text-3xl font-semibold text-center tracking-[0.3em] mb-8">
          LENSÉ
        </h1>

        <h2 className="text-xl font-thin text-center mb-7">
          Welcome Back
        </h2>

        <div className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email*"
            value={formData.email}
            onChange={(e) => setFormData({
              ...formData,
              email: e.target.value
            })}
            className="border border-[#cbcbcb] rounded px-4 py-3 outline-none focus:border-black"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}

          <input
            type="password"
            placeholder="Password*"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="border border-[#cbcbcb] rounded-md px-4 py-3 outline-none focus:border-black"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}

          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="bg-black text-white py-3 hover:bg-black/80 transition">
            Log In
          </button>
          {errors.general && (
            <p className="text-red-500 text-sm">{errors.general}</p>
          )}

          <Link
            to="/register"
            className="bg-white border border-[#cbcbcb] py-3 text-center hover:bg-gray-100 transition"
          >
            CREATE ACCOUNT
          </Link>

        </div>
      </div>
    </form>
  );
}

export default Login;