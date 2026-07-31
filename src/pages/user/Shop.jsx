import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../services/productService";
import ProductCard from "../../components/productCard/ProductCard";
import { useSearchParams } from "react-router-dom";

function Shop() {
  
  const {data: products = [], isLoading, error} = useQuery({
    queryKey:["products"],
    queryFn:getProducts,
  });
  
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  //filter
  const filteredProducts = category 
  ? products.filter((product)=> product.category === category)
   : products;

  if(isLoading){
    return <p>Loading...</p>
  }
  if(error){
    return <p>Something went wrong.</p>
  }

  return (
    <div className="grid grid-cols-3 gap-8 p-8 bg-zinc-300">
      {
        filteredProducts.map(product => (
          <ProductCard key={product.id} product={product}/>
        ))
      }
    </div>
  );
}

export default Shop;