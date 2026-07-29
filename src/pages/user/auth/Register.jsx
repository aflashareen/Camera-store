import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query'
import { getUserByEmail, registerUser } from '../../../services/authService';

function Register() {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const registerMutation = useMutation({
    mutationFn: registerUser,

    onSuccess: () => {
      navigate("/login");
    },
    onError: (error) => {
      setErrors({
        general: "Something went wrong. Please try again.",
      });
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({});

    if (formData.password !== formData.confirmPassword) {
      setErrors({
        confirmPassword: "Passwords do not match"
      });
      return;
    }

    try {
      const existingUser = await getUserByEmail(formData.email);

      if (existingUser.length > 0) {
        setErrors({
          email: "Email already exists"
        });
        return;
      }

      const { confirmPassword, ...userData } = formData;

      registerMutation.mutate(userData)
    } catch (error) {
      setErrors({
        general: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="min-h-screen flex items-center justify-center">
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
              name='fullname'
              value={formData.fullname}
              onChange={handleChange}
              className="border border-[#cbcbcb] rounded px-4 py-3 outline-none focus:border-black"
            />

            <input
              type="email"
              placeholder="EMAIL*"
              name='email'
              value={formData.email}
              onChange={handleChange}
              className="border border-[#cbcbcb] rounded-md px-4 py-3 outline-none focus:border-black"
            />
            {errors.email && (
              <p className='text-red-500 text-sm mt-1'>{errors.email}</p>
            )}

            <input
              type="password"
              placeholder="PASSWORD*"
              name='password'
              value={formData.password}
              onChange={handleChange}
              className="border border-[#cbcbcb] rounded-md px-4 py-3 outline-none focus:border-black"
            />

            <input
              type="password"
              placeholder="CONFIRM PASSWORD*"
              name='confirmPassword'
              value={formData.confirmPassword}
              onChange={handleChange}
              className="border border-[#cbcbcb] rounded-md px-4 py-3 outline-none focus:border-black"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}

            <button
              type="submit"
              disabled={registerMutation.isPending}
              className="bg-black text-white py-3 hover:bg-black/80 transition">
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
      </form>
    </>
  )
}

export default Register;