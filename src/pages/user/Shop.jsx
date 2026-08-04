import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../services/productService";
import ProductCard from "../../components/productCard/ProductCard";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Filter from "../../components/filter/Filter";
import { useState } from "react";

function Shop() {
  const navigate = useNavigate();
  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get("category") || "All";
  const search = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "default";

  //category
  const filteredProducts = products
    .filter((product) => {
      const matchesCategory =
        category === "All" || product.category === category;

      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.brand.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sort === "low-high") return a.price - b.price;
      if (sort === "high-low") return b.price - a.price;
      if (sort === "rating") return b.rating - a.rating;
      return 0;
    }).sort((a, b) => {
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

  //filter
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  const categories = [...new Set(products.map((p) => p.category))];
  return (
    <div className="bg-zinc-300">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 pt-4 pl-2 text-gray-700 hover:text-black transition"
      >
        <ArrowLeft size={20} />
        Back
      </button>
      <Filter
        categories={[...new Set(products.map((p) => p.category))]}
        selectedCategory={category}
        onCategoryChange={(value) => {
          const params = new URLSearchParams(searchParams);
          params.set("category", value);
          setSearchParams(params);
        }}
        sortBy={sort}
        onSortChange={(value) => {
          const params = new URLSearchParams(searchParams);
          params.set("sort", value);
          setSearchParams(params);
        }}
      />

      <div className="grid grid-cols-3 gap-8 p-8 bg-zinc-300">
        {
          filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        }
      </div>

    </div>
  );
}

export default Shop;