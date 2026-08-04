import { Link } from "react-router-dom";

const collections = [
  {
    id: 1,
    title: "Mirrorless",
    image: "/src/assets/images/collections/mirrorless.jpg",
    description: "Modern performance with lightweight design.",
    path: "/shop?category=Mirrorless",
  },
  {
    id: 2,
    title: "DSLR",
    image: "/src/assets/images/collections/dslr.jpg",
    description: "Professional photography with optical precision.",
    path: "/shop?category=DSLR",
  },
  {
    id: 3,
    title: "Film Cameras",
    image: "/src/assets/images/collections/film.jpg",
    description: "Timeless analog photography.",
    path: "/shop?category=Film camera",
  },
  {
    id: 4,
    title: "Cinema",
    image: "/src/assets/images/collections/cinema.jpg",
    description: "Professional filmmaking tools.",
    path: "/shop?category=Cinema",
  },
];

function Collections() {
  return (
<div className="min-h-screen bg-black py-10 px-6">

  <div className="text-center mb-14">
    <p className="uppercase tracking-[0.4em] text-xs text-gray-500">
      LENSÉ
    </p>

    <h1 className="mt-4 text-5xl font-light text-white tracking-wide">
      Collections
    </h1>

    <p className="mt-5 max-w-xl mx-auto text-gray-400 leading-7">
      Discover cameras crafted for creators, professionals, and storytellers.
    </p>
  </div>


  <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
    {collections.map((collection) => (
      <Link
        key={collection.id}
        to={collection.path}
        className="group"
      >
        <div
          className="
            overflow-hidden
            rounded-xl
            border border-zinc-800
            bg-zinc-950
            transition-all duration-500
            hover:border-zinc-950
            hover:-translate-y-2
            hover:shadow-[0_20px_60px_rgba(255,255,255,0.06)]
          "
        >

          <div className="relative overflow-hidden">
            <img
              src={collection.image}
              alt={collection.title}
              className="h-72 w-full object-cover transition duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          </div>

         
          <div className="p-7">
            <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
              Premium Collection
            </p>

            <h2 className="mt-2 text-2xl font-light text-white">
              {collection.title}
            </h2>

            <p className="mt-4 text-sm leading-7 text-zinc-400">
              {collection.description}
            </p>

            <button
              className="
                mt-8
                rounded-full
                border border-white/30
                px-6 py-3
                text-sm
                text-white
                transition-all
                duration-300
                hover:bg-white
                hover:text-black
              "
            >
              Explore →
            </button>
          </div>
        </div>
      </Link>
    ))}
  </div>

</div>  );
}

export default Collections;