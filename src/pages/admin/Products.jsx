import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../../services/productService';
import { usePagination } from '../../hooks/UsePagination.jsx';
import { Eye, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductsDetails from '../../components/admin/products/ProductsDetails';
import AddProduct from '../../components/admin/products/AddProducts';
import DeleteProduct from '../../components/admin/products/DeleteProduct';

function AdminProducts() {
  const { data: products, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [deleteProduct, setDeleteProduct] = useState(null);
  const [searchParams,setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const status = searchParams.get("status") || "all";

  const filteredProducts = (products ?? []).filter((product) => {
    const value = search.toLowerCase();

    const matchesSearch = () =>{
      product.name?.toLowerCase().includes(value) ||
      product.brand?.toLowerCase().includes(value) ||
      product.category?.toLowerCase().includes(value) ;
    }
    const matchesStatus = status === "all" ||
    (status === "instock" && product.stock > 2) ||
    (status === "lowstock" && product.stock < 2) ||
    (status === "outofstock" && product.stock <= 0);

    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (value) =>{
    setSearchParams({
      search,
      status: value,
    })
  }

  const { currentPage, setCurrentPage, totalPages, currentItems } = usePagination(filteredProducts, 5)
  
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong.</p>;

  return (
    <div className='text-white'>
      <div className="mb-5 flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-black">
          Products
        </h1>

        <select value={status}
        onChange={(e)=>handleStatusChange(e.target.value)}
        className='bg-black'>
          <option value="instock" className=''>In stock</option>
          <option value="lowstock" >Low stock</option>
          <option value="outofstock">Out of stock</option>
        </select>

        <button
          onClick={() => setIsAdding(true)}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-2 text-black hover:bg-zinc-200 sm:w-auto">
          <Plus className="h-5 w-5" />
          Add Product
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-white/[0.03]">
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
              <tr key={product.id}
                className="border-b border-zinc-800 hover:bg-white/[0.03]" >
                <td className="px-4 py-3">
                  <img src={product.image} alt={product.name}
                    className="h-16 w-16 rounded-lg object-cover"/>
                </td>
                <td className="px-4 py-3">{product.name}</td>
                <td className="px-4 py-3">₹{product.price}</td>
                <td className="px-4 py-3">{product.stock}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-3 py-1 text-sm ${
                    product.stock <= 0 ? "bg-red-500/20 text-red-400"
                    :product.stock < 2 ? "bg-yellow-500/20 text-yellow-400"
                    :"bg-green-500/20 text-green-400"
                  }`}>
                    {product.stock <= 0 ? "Out of stock" : product.stock < 2 ?"Low stock":"In stock"}
                  </span>
                </td>

                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => setDeleteProduct(product)}
                    className="rounded-lg p-2 hover:bg-red-500/20">
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
          onClose={() => setSelectedProduct(null)} />
      )}
      {isAdding && (
        <AddProduct
          onClose={() => setIsAdding(false)} />
      )}
      {deleteProduct && (
        <DeleteProduct
          product={deleteProduct}
          onClose={() => setDeleteProduct(null)} />
      )}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-1 px-2 sm:gap-2 sm:px-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="rounded-xl px-2 py-2 text-sm hover:bg-[#1E1E1E] disabled:opacity-50 sm:px-3">
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`rounded px-2 py-2 text-sm sm:px-3 ${currentPage === index + 1
              ? "bg-zinc-600 text-white"
              : "bg-[#1E1E1E] text-white"
              }`}>
            {index + 1}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="rounded-xl px-2 py-2 text-sm hover:bg-[#1E1E1E] disabled:opacity-50 sm:px-3">
          Next
        </button>
      </div>
    </div>
  )
}

export default AdminProducts;