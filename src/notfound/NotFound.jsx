import React from "react";
import { ArrowLeft, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">

        <p className="text-sm tracking-[0.4em] uppercase text-zinc-500 mb-6">
          LENSÉ
        </p>

        <h1 className="text-[120px] sm:text-[160px] md:text-[200px] font-bold leading-none tracking-tight bg-gradient-to-b from-white to-zinc-700 bg-clip-text text-transparent">
          404
        </h1>

        <h2 className="text-2xl sm:text-3xl font-semibold mt-4">
          This moment wasn't captured.
        </h2>

        <p className="text-zinc-400 mt-4 max-w-md mx-auto leading-relaxed">
          The page you're looking for doesn't exist or may have been moved.
          Let's get you back to where the story begins.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">

          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-medium hover:bg-zinc-200 transition" >
            <Home size={18} />
            Back to Home
          </button>

          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/20 text-white hover:bg-white/10 transition">
            <ArrowLeft size={18} />
            Go Back
          </button>

        </div>
      </div>
    </div>
  );
}

export default NotFound;