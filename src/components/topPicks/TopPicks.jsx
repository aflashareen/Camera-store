import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../services/productService";
import PicksCard from "./PicksCard";

function TopPicks() {
  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong.</p>;

  return (
    <section className="bg-[radial-gradient(circle_at_top,#2A2A2A_0%,#18181B_45%,#09090B_100%)] text-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        <p className="uppercase tracking-[0.35em] text-zinc-500">
          Top Picks
        </p>

        <h2 className="text-4xl font-semibold mt-3">
          Editor's Selection
        </h2>

        <div className="mt-12 flex gap-6 overflow-x-auto pb-4">
          {products.slice(9, 15).map((product) => (
            <PicksCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default TopPicks;