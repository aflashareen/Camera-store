import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../services/productService";
import ProductCard from "../../components/productCard/ProductCard";
import { useSearchParams } from "react-router-dom";

function Shop() {
  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  const search = searchParams.get("search") || "";

  //filter
  const filteredProducts = products
    .filter((product) => {
      const matchesCategory =
        !category || product.category === category;

      const matchesSearch =
        !search ||
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.brand.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (!search) return 0;

      const aMatch =
        a.name.toLowerCase().includes(search.toLowerCase()) ||
        a.brand.toLowerCase().includes(search.toLowerCase()) ||
        a.category.toLowerCase().includes(search.toLowerCase());

      const bMatch =
        b.name.toLowerCase().includes(search.toLowerCase()) ||
        b.brand.toLowerCase().includes(search.toLowerCase()) ||
        b.category.toLowerCase().includes(search.toLowerCase());

      if (aMatch && !bMatch) return -1;
      if (!aMatch && bMatch) return 1;

      return 0;
    });
  return (
    <div className="grid grid-cols-3 gap-8 p-8 bg-zinc-300">
      {
        filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))
      }
    </div>
  );
}

export default Shop;