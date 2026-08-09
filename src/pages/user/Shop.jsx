import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../services/productService";
import ProductCard from "../../components/productCard/ProductCard";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Filter from "../../components/filter/Filter";
import { useDispatch } from "react-redux";
import { setCategory, setSort } from "../../redux/slice/searchSlice";
import { useMemo } from "react";


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
  const filteredProducts = useMemo(() => {
    return products
    .filter((product) => !product.isDeleted)
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
      });
  }, [products, category, search, sort]);


  const categories = useMemo(() => {
    return [...new Set(products.filter((product) => !product.isDeleted).map((p) => p.category))];
  }, [products]);

  // if(filteredProducts !== search){
  //   return <h1>no products</h1>
  // }
  if (isLoading) return <p className="text-white text-center py-20">Loading...</p>
  if (error) return <p className="text-red-500 text-center py-20">something went wrong</p>

  return (
    <div className="bg-black">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 px-4 py-4 text-gray-400 hover:text-white"
      >
        <ArrowLeft size={20} />
        Back
      </button>
      <Filter
        categories={categories}
        selectedCategory={category}
        onCategoryChange={(value) => dispatch(setCategory(value))}
        sortBy={sort}
        onSortChange={(value) => dispatch(setSort(value))}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4 md:p-8">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
        }
      </div>
    </div>
  );
}

export default Shop;