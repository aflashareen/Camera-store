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
    <div className="max-w-7xl mx-auto px-6 py-14">

      <div className="text-center mb-14">
        <h1 className="text-5xl font-bold">
          Collections
        </h1>

        <p className="text-gray-500 mt-4">
          Explore our curated camera collections.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        {collections.map((collection) => (
          <Link
            key={collection.id}
            to={collection.path}
          >
            <div className="group overflow-hidden rounded-lg shadow-lg">

              <img
                src={collection.image}
                alt={collection.title}
                className="h-[420px] w-full object-cover transition duration-500 group-hover:scale-110"
              />

              <div className="bg-black text-white p-8">

                <h2 className="text-3xl font-semibold">
                  {collection.title}
                </h2>

                <p className="mt-3 text-gray-300">
                  {collection.description}
                </p>

                <button className="mt-6 border border-white px-6 py-2 hover:bg-white hover:text-black transition">
                  Explore
                </button>

              </div>
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
}

export default Collections;