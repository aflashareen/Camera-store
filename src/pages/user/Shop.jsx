import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../services/productService";
import ProductCard from "../../components/productCard/ProductCard";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Filter from "../../components/filter/Filter";
import { useDispatch } from "react-redux";
import { setCategory, setSort } from "../../redux/slice/searchSlice";


function Shop() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const { search, category, sort } = useSelector(
    (state) => state.search
  );

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
    })

  return (
    <div className="bg-black">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 p-2 text-gray-400 hover:text-white transition"
      >
        <ArrowLeft size={20} />
        Back
      </button>
      <Filter
        categories={[...new Set(products.map((p) => p.category))]}
        selectedCategory={category}
        onCategoryChange={(value) => dispatch(setCategory(value))}
        sortBy={sort}
        onSortChange={(value) => dispatch(setSort(value))}
      />

      <div className="grid grid-cols-3 gap-8 p-8 bg-neutal-800">
        {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        }
      </div>

    </div>
  );
}

export default Shop;