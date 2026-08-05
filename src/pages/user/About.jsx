function About() {
  return (
    <div className="bg-black text-white">

      <section className="min-h-screen flex items-center justify-center px-8">
        <div className="max-w-4xl text-center">

          <p className="uppercase tracking-[0.5em] text-zinc-500 text-sm">
            LENSÉ
          </p>

          <h1 className="mt-8 text-5xl md:text-7xl font-light leading-tight">
            Precision.
            <br />
            Crafted For Vision.
          </h1>

          <p className="mt-8 text-zinc-400 text-lg leading-8 max-w-2xl mx-auto">
            More than cameras. We curate timeless tools for creators who
            transform everyday moments into unforgettable stories.
          </p>

        </div>
      </section>

      <section className="px-8 pb-24">
        <div className="max-w-7xl mx-auto overflow-hidden rounded-3xl border border-zinc-800">

          <img
            src="src/assets/images/about-camera.jpg"
            alt="Camera"
            className="w-full h-[650px] object-cover hover:scale-105 transition duration-700"
          />

        </div>
      </section>

      <section className="py-24 px-8 border-t border-zinc-900">

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20">

          <div>

            <p className="uppercase tracking-[0.4em] text-zinc-500 text-sm">
              OUR STORY
            </p>

            <h2 className="mt-6 text-5xl font-light leading-tight">
              Designed For
              <br />
              Modern Creators.
            </h2>

          </div>

          <div className="space-y-8 text-zinc-400 leading-8">

            <p>
              LENSÉ was created with one vision—to bring exceptional cameras
              into the hands of creators who appreciate craftsmanship,
              innovation, and timeless design.
            </p>

            <p>
              Every camera in our collection is carefully selected for its
              performance, reliability, and ability to inspire creativity.
              Whether you're capturing travel, portraits, cinema, or everyday
              life, your vision deserves equipment that never compromises.
            </p>

          </div>

        </div>

      </section>

      <section className="py-24 px-8">

        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 text-center gap-10">

          <div>
            <h2 className="text-6xl font-light">50+</h2>
            <p className="mt-3 uppercase tracking-[0.25em] text-zinc-500 text-sm">
              Products
            </p>
          </div>

          <div>
            <h2 className="text-6xl font-light">10+</h2>
            <p className="mt-3 uppercase tracking-[0.25em] text-zinc-500 text-sm">
              Brands
            </p>
          </div>

          <div>
            <h2 className="text-6xl font-light">10K+</h2>
            <p className="mt-3 uppercase tracking-[0.25em] text-zinc-500 text-sm">
              Customers
            </p>
          </div>

          <div>
            <h2 className="text-6xl font-light">100%</h2>
            <p className="mt-3 uppercase tracking-[0.25em] text-zinc-500 text-sm">
              Authentic
            </p>
          </div>

        </div>

      </section>

      <section className="py-24 px-8 border-y border-zinc-900">

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">

          <div>
            <h3 className="text-2xl font-light mb-4">Quality</h3>
            <p className="text-zinc-400 leading-8">
              We partner with trusted brands to ensure every product meets the
              highest standards of performance and durability.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-light mb-4">Innovation</h3>
            <p className="text-zinc-400 leading-8">
              From mirrorless systems to cinema cameras, we bring modern
              technology to passionate photographers and filmmakers.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-light mb-4">Trust</h3>
            <p className="text-zinc-400 leading-8">
              Every purchase is backed by authenticity, transparency, and
              dedicated customer support.
            </p>
          </div>

        </div>

      </section>

      <section className="py-32 px-8">

        <div className="max-w-4xl mx-auto text-center">

          <p className="uppercase tracking-[0.5em] text-zinc-500 mb-8">
            LENSÉ
          </p>

          <h2 className="text-4xl md:text-6xl font-light leading-relaxed">
            "The world isn't remembered
            <br />
            for what we saw,
            <br />
            but for what we captured."
          </h2>

        </div>

      </section>

    </div>
  );
}

export default About;