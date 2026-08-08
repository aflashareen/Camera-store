import { useState } from "react";
import { X } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProduct } from "../../../services/productService";
import ProductForm from "./ProductForm";

function AddProduct({ onClose }) {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    category: "",
    price: "",
    stock: "",
    image: "",
    description: "",
    rating: "",
  });

  const addMutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      onClose();
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addMutation.mutate({
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
      rating: Number(formData.rating),
      isDeleted: false,
    });
  };

  return (
    <div className="fixed right-0 top-0 z-50 h-screen w-96 overflow-y-auto bg-zinc-900 p-6 text-white shadow-2xl">

      <div className="mb-6 flex items-center justify-between border-b border-zinc-800 pb-4">
        <h2 className="text-xl font-semibold">
          Add Product
        </h2>

        <button onClick={onClose}>
          <X />
        </button>
      </div>

      <ProductForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        isLoading={addMutation.isPending}
      />

    </div>
  );
}

export default AddProduct;