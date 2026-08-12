import { useState } from "react";
import { X } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProduct } from "../../services/productService";
import ProductForm from "./products/ProductForm";
import toast from "react-hot-toast";

function ProductsDetails({ product, onClose }) {
  const queryClient = useQueryClient();

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: product.name,
    brand: product.brand,
    category: product.category,
    price: product.price,
    stock: product.stock,
    image: product.image,
    description: product.description,
    rating: product.rating,
  });

  const updateMutation = useMutation({
    mutationFn: updateProduct,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      toast.success("Product updated successfully!");
      onClose();

      setIsEditing(false);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    updateMutation.mutate({
      id: product.id,
      data: {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        rating: Number(formData.rating),
      },
    });
  };

  if (!product) return null;

  return (
    <div className="fixed right-0 top-0 z-50 h-screen w-96 overflow-y-auto scrollbar-hide bg-zinc-900 p-6 text-white shadow-2xl">

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          {isEditing ? "Edit Product" : "Product Details"}
        </h2>

        <button
          onClick={onClose}
          className="rounded-lg p-2 hover:bg-zinc-800"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {isEditing ? (
        <ProductForm
          formData={formData}
          onChange={handleChange}
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
          isLoading={updateMutation.isPending}
          buttonText="Save Changes"
        />
      ) : (
        <>
          <img
            src={product.image}
            alt={product.name}
            className="h-56 w-full rounded-lg object-cover"
          />

          <h2 className="mt-4 text-xl font-semibold">
            {product.name}
          </h2>

          <div className="mt-3 space-y-2 text-zinc-300">
            <p>Brand: {product.brand}</p>
            <p>Category: {product.category}</p>
            <p>₹{product.price}</p>
            <p>Stock: {product.stock}</p>
            <p>Rating: {product.rating}</p>
            <p>{product.description}</p>
          </div>

          <div className="mt-6">
            <button
              onClick={() => setIsEditing(true)}
              className="w-full rounded-lg bg-white px-4 py-2 text-black"
            >
              Edit Product
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default ProductsDetails;