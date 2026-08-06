import { Link } from "react-router-dom";

function PicksCard({ product }) {
  return (
    <Link to={`/product/${product.id}`}>
      <div className="min-w-[450px] rounded-xl bg-zinc-900 overflow-hidden hover:scale-[1.02] transition duration-300">
        <img
          src={product.image}
          alt={product.name}
          className="h-80 w-full object-cover"
        /> 

        <div className="p-5">
          <p className="text-sm text-zinc-500">{product.brand}</p>

          <h3 className="mt-2 text-xl font-medium">
            {product.name}
          </h3>

          <p className="mt-4 text-lg font-semibold">
            ₹{product.price.toLocaleString()}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default PicksCard;