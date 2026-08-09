import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../../services/productService';
import { usePagination } from '../../hooks/UsePagination';
import { Eye, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import ProductsDetails from '../../components/admin/ProductsDetails';
import AddProduct from '../../components/admin/products/AddProducts';

function AdminProducts() {
  const { data: products, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const { currentPage, setCurrentPage, totalPages, currentItems } = usePagination(products ?? [], 5)
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong.</p>;

  return (
    <div className='text-white'>
      <div className="mb-5 flex items-center justify-between p-5">
        <h1 className="text-3xl font-black">
          Products
        </h1>

        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-black hover:bg-zinc-200"
        >
          <Plus className="h-5 w-5" />
          Add Product
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-zinc-900">
            <tr>
              <th className="px-4 py-3 text-left">Image</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Price</th>
              <th className="px-4 py-3 text-left">Stock</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentItems.map((product) => (
              <tr
                key={product.id}
                className="border-b border-zinc-800 hover:bg-zinc-900"
              >
                <td className="px-4 py-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-16 w-16 rounded-lg object-cover"
                  />
                </td>

                <td className="px-4 py-3">{product.name}</td>

                <td className="px-4 py-3">₹{product.price}</td>

                <td className="px-4 py-3">{product.stock}</td>

                <td className="px-4 py-3">

                  <span className="rounded-full bg-green-500/20 px-3 py-1 text-sm text-green-400">
                    Available
                  </span>

                </td>

                <td className="px-4 py-3 text-center">
                  <button className="rounded-lg p-2 hover:bg-[red-500]/20">
                    <Trash2 className="h-5 w-5 text-red-500" />
                  </button>
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="rounded-lg p-2 hover:bg-[#1E1E1E]">
                    <Eye className="h-5 w-5 text-zinc-500" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedProduct && (
        <ProductsDetails
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
      {isAdding && (
        <AddProduct
          onClose={() => setIsAdding(false)}
        />
      )}

      {selectedProduct && (
        <ProductsDetails
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
      <div className="flex justify-center items-center gap-2 mt-6">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="px-3 py-2 border-none rounded-xl hover:bg-[#1E1E1E] disabled:opacity-50">
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-3 py-2 rounded ${currentPage === index + 1
              ? "bg-zinc-600 text-white"
              : "bg-[#1E1E1E] text-white"
              }`}>
            {index + 1}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="px-3 py-2 border-none rounded-xl hover:bg-[#1E1E1E] disabled:opacity-50">
          Next
        </button>
      </div>
    </div>
  )
}

export default AdminProducts;