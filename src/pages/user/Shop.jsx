import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../services/productService";
import ProductCard from "../../components/productCard/ProductCard";

function Shop() {

  const {data: products, isLoading, error} = useQuery({
    queryKey:["products"],
    queryFn:getProducts,
  });

  if(isLoading){
    return <p>Loading...</p>
  }
  if(error){
    return <p>Something went wrong.</p>
  }

  return (
    <div className="grid grid-cols-4 gap-6 p-8">
      {
        products.map(product => (
          <ProductCard key={product.id} product={product}/>
        ))
      }
    </div>
  );
}

export default Shop;