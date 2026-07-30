import Layout from "../../components/layout/Layout";

import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../../services/productService";

function Products() {
  const { id } = useParams();

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong.</p>;

  return (
    <div>
      <div className="w-full p-10 flex flex-col justify-center">
        <img className="" src={product.image} alt={product.name} />

        <h1 className="font-semibold text-3xl">{product.name}</h1>

        <p>{product.brand}</p>

        <p>MRP (Inclusive of all taxes)</p>
        <p>£{product.price}</p>

        <p>{product.description}</p>

        <button className="bg-green-400">Add to Cart</button>

        <button>Add to Wishlist</button>
      </div>
    </div>
  );
}

export default Products;