function About() {
  return (
    <div className="bg-[radial-gradient(circle_at_top,#2A2A2A_0%,#18181B_45%,#09090B_100%)] text-white">

      <section className="max-w-7xl mx-auto px-8 py-28 text-center">
        <p className="uppercase tracking-[6px] text-gray-400 text-sm mb-4">
          About Us
        </p>

        <h1 className="text-5xl md:text-6xl font-semibold leading-tight pt-14">
          Capturing Moments.
          <br />
          Inspiring Creativity.
        </h1>

        <p className="max-w-3xl mx-auto mt-8 text-gray-400 text-lg leading-8">
          Whether you're a passionate beginner, a professional creator, or an
          experienced filmmaker, we provide premium cameras and photography gear
          designed to help you capture every moment with confidence.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-8 py-24 grid md:grid-cols-2 gap-20 items-center">

        <div>
          <img
            src="src/assets/images/about-camera.jpg"
            alt=""
            className="rounded-xl object-cover w-full h-[500px]"
          />
        </div>

        <div>
          <p className="uppercase tracking-[5px] text-gray-500 text-sm mb-4">
            Our Story
          </p>

          <h2 className="text-4xl font-semibold mb-8">
            Crafted for Creators
          </h2>

          <p className="text-gray-400 leading-8 mb-6">
            Founded with a passion for photography and filmmaking, our mission
            is to bring the world's finest cameras and accessories to creators
            everywhere.
          </p>

          <p className="text-gray-400 leading-8">
            Every photograph tells a story. That's why we carefully curate
            professional mirrorless cameras, vintage film cameras, cinema gear,
            and photography accessories trusted by photographers around the
            globe.
          </p>
        </div>

      </section>

      <section className="max-w-7xl mx-auto px-8 py-24">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

          <div className="bg-white/5 rounded-xl p-8 text-center border border-white/10">
            <h2 className="text-4xl font-bold">50+</h2>
            <p className="text-gray-400 mt-2">Premium Products</p>
          </div>

          <div className="bg-white/5 rounded-xl p-8 text-center border border-white/10">
            <h2 className="text-4xl font-bold">10+</h2>
            <p className="text-gray-400 mt-2">Trusted Brands</p>
          </div>

          <div className="bg-white/5 rounded-xl p-8 text-center border border-white/10">
            <h2 className="text-4xl font-bold">10K+</h2>
            <p className="text-gray-400 mt-2">Happy Customers</p>
          </div>

          <div className="bg-white/5 rounded-xl p-8 text-center border border-white/10">
            <h2 className="text-4xl font-bold">100%</h2>
            <p className="text-gray-400 mt-2">Authentic Products</p>
          </div>

        </div>

      </section>

      <section className="py-28 px-8">

        <div className="max-w-4xl mx-auto text-center">

          <h2 className="text-4xl md:text-5xl font-semibold leading-relaxed">
            "Photography is more than capturing an image.
            It's preserving a moment forever."
          </h2>

        </div>

      </section>

    </div>
  );
}

export default About;