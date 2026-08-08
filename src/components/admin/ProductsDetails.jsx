import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProduct } from "../../services/productService";
import { X } from "lucide-react";

function ProductsDetails({ product, onClose }) {
  const queryClient = useQueryClient();

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: product.name,
    price: product.price,
    stock: product.stock,
    description: product.description,
    image: product.image,
  });

  const updateMutation = useMutation({
    mutationFn: updateProduct,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
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
      data: formData,
    });
  };

  if (!product) return null;

  return (
    <div className="fixed right-0 top-0 h-screen w-96 overflow-y-auto scrollbar-hide bg-zinc-900 p-6 text-white shadow-2xl">

      {!isEditing ? (
        <>
            <button
              onClick={onClose}
              className="rounded-lg hover:bg-zinc-800 mb-2"
            >
              <X className="h-5 w-5" />
            </button>
          <img
            src={product.image}
            alt={product.name}
            className="h-56 w-full rounded-lg object-cover"
          />

          <h2 className="mt-4 text-xl font-semibold">
            {product.name}
          </h2>

          <p>₹{product.price}</p>
          <p>Stock: {product.stock}</p>
          <p>{product.description}</p>

          <div className="mt-6 flex gap-3">
            <button
              onClick={() => setIsEditing(true)}
              className="rounded-lg bg-zinc-700 px-4 py-2"
            >
              Edit
            </button>

            <button
              onClick={onClose}
              className="rounded-lg border border-zinc-700 px-4 py-2"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
            <h2 className="mb-4 text-xl font-semibold">
              Edit Product
            </h2>

          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mb-3 w-full rounded-lg bg-zinc-800 p-3"
          />

          <input
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            className="mb-3 w-full rounded-lg bg-zinc-800 p-3"
          />

          <input
            name="stock"
            type="number"
            value={formData.stock}
            onChange={handleChange}
            className="mb-3 w-full rounded-lg bg-zinc-800 p-3"
          />

          <input
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="mb-3 w-full rounded-lg bg-zinc-800 p-3"
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mb-3 w-full h-full rounded-lg bg-zinc-800 p-3"
          />

          <div className="mt-5 flex gap-3">
            <button
              onClick={handleSave}
              disabled={updateMutation.isPending}
              className="rounded-lg bg-white px-4 py-2 text-black disabled:opacity-50"
            >
              {updateMutation.isPending
                ? "Saving..."
                : "Save Changes"}
            </button>

            <button
              onClick={() => setIsEditing(false)}
              className="rounded-lg border border-zinc-700 px-4 py-2"
            >
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default ProductsDetails;