import { useSelector } from "react-redux";
import Products from "./Products";
import ProductCard from "../../components/productCard/ProductCard";

function Wishlist() {
  const wishlist = useSelector((state)=> state.wishlist.items);

  if(wishlist.length === 0){
    return (
      <div className="py-20 text-center">
        <h2 className="text-3xl font-semibold">Your Wishlist Is Empty</h2>
      </div>
    )
  }
  return ( 
      <div className="max-w-7xl mx-auto py-10 px-6">
        <h1 className="text-4xl font-bold mb-10">Wishlist</h1>

        <div className="grid md:grid-cols-4 gap-8">
          {wishlist.map((product)=>
          <ProductCard 
          key={product.id}
          product={product}
          />)}
        </div>
      </div>
  );
}

export default Wishlist;