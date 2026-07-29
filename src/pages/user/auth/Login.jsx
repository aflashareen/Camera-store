import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [formData, setFormData]= useState({
    email:"",
    password:"",
  })
  return (
    <form className="min-h-screen flex items-center justify-center">

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
            onChange={(e)=> setFormData({...formData,
              email:e.target.value
            })}
            className="border border-[#cbcbcb] rounded px-4 py-3 outline-none focus:border-black"
          />

          <input
            type="password"
            placeholder="Password*"
            onChange={(e)=>setFormData({...formData,password:e.target.value})}
            className="border border-[#cbcbcb] rounded-md px-4 py-3 outline-none focus:border-black"
          />

          <button className="bg-black text-white py-3 hover:bg-black/80 transition">
            Log In
          </button>

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