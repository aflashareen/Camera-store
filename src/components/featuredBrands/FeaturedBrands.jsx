import canon from "../../assets/images/brands/canon.svg";
import sony from "../../assets/images/brands/sony.svg";
import nikon from "../../assets/images/brands/nikon.svg";
import fujifilm from "../../assets/images/brands/fujifilm.svg";
import olympus from "../../assets/images/brands/olympus.svg";
import leica from "../../assets/images/brands/leica.svg";

const brands = [
    { id: 1, name: "Canon", logo: canon },
    { id: 2, name: "Sony", logo: sony },
    { id: 3, name: "Nikon", logo: nikon },
    { id: 4, name: "Fujifilm", logo: fujifilm },
    { id: 5, name: "Olympus", logo: olympus },
    { id: 6, name: "Leica", logo: leica },
];

function FeaturedBrands() {
    return (
        <section className="bg-white py-24">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <p className="uppercase tracking-[0.35em] text-zinc-500">
                        Featured Brands
                    </p>

                    <h2 className="mt-3 text-4xl font-semibold text-black">
                        Trusted by Professionals
                    </h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                    {brands.map((brand) => (
                        <div
                            key={brand.id}
                            className="flex items-center justify-center rounded-xl border border-zinc-200 bg-zinc-200 p-8 transition hover:shadow-lg hover:-translate-y-1"
                        >
                            <img
                                src={brand.logo}
                                alt={brand.name}
                                className="h-10 object-contain grayscale hover:grayscale-0 transition"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default FeaturedBrands;