import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function Register() {
  const [formData, setFormData]= useState({
    fullname : "",
    email : "",
    password : "",
    confirmPassword : "",
  });

  const handleChange = (e) =>{
    setFormData({
      ...formData,
      [e.target.name] : e.target.value,
    });
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-xl bg-white shadow-lg p-8">
          <h1 className="text-3xl font-semibold text-center tracking-[0.3em] mb-8">
            LENSÉ
          </h1>

          <h2 className="text-xl font-thin text-center mb-7">
            CREATE ACCOUNT
          </h2>

          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="FULLNAME*"
              value={formData.fullname}
              onChange={handleChange}
              className="border border-[#cbcbcb] rounded px-4 py-3 outline-none focus:border-black"
            />

            <input
              type="email"
              placeholder="EMAIL*"
              value={formData.email}
              onChange={handleChange}
              className="border border-[#cbcbcb] rounded-md px-4 py-3 outline-none focus:border-black"
            />
            <input
              type="password"
              placeholder="PASSWORD*"
              value={formData.password}
              onChange={handleChange}
              className="border border-[#cbcbcb] rounded-md px-4 py-3 outline-none focus:border-black"
            />
            <input
              type="password"
              placeholder="CONFIRM PASSWORD*"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="border border-[#cbcbcb] rounded-md px-4 py-3 outline-none focus:border-black"
            />

            <button type="submit" className="bg-black text-white py-3 hover:bg-black/80 transition">
              CREATE ACCOUNT
            </button>

            <p className="text-center font-thin text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-normal hover:underline"
              >
                Log In
              </Link>
            </p>


          </div>
        </div>
      </div>
    </>
  )
}

export default Register;