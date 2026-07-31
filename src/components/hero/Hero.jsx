import { useNavigate } from "react-router-dom";
import heroVideo from "../../assets/videos/hero-video.mp4";

function Hero() {
  const navigate = useNavigate();
  return (
    <section className="relative h-screen overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
        <h1 className="text-5xl font-bold font-serif">
          Capture Every Moment
        </h1>

        <p className="mt-4 max-w-xl text-lg text-gray-300">
          Discover premium cameras built for professionals and creators.
        </p>

        <button 
        onClick={()=>(
          navigate("/shop")
        )}
        className="mt-8 rounded-full bg-white px-8 py-3 text-black font-medium hover:bg-gray-200 transition" >
          Shop Now
        </button>
      </div>
    </section>
  );
}

export default Hero;