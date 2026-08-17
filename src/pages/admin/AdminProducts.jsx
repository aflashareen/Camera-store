import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../../services/productService';
import { usePagination } from '../../hooks/UsePagination.jsx';
import {  Plus, Search } from 'lucide-react';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductsDetails from '../../components/admin/products/ProductsDetails';
import AddProduct from '../../components/admin/products/AddProducts';
import DeleteProduct from '../../components/admin/products/DeleteProduct';
import ProductStats from '../../components/admin/products/ProductStats.jsx';
import ProductTable from '../../components/admin/products/ProductTable.jsx';

function AdminProducts() {
  const { data: products, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [deleteProduct, setDeleteProduct] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const status = searchParams.get("status") || "all";

  const filteredProducts = (products ?? []).filter((product) => {
    const value = search.toLowerCase();

    const matchesSearch =
      product.name?.toLowerCase().includes(value) ||
      product.brand?.toLowerCase().includes(value) ||
      product.category?.toLowerCase().includes(value);

    const stock = Number(product.stock);
    const status = searchParams.get("status") || "all";

    const matchesStatus = status === "all" ||
      (status === "instock" && product.stock > 2) ||
      (status === "lowstock" && product.stock > 0 && product.stock < 2) ||
      (status === "outofstock" && product.stock <= 0);

    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (value) => {
    setSearchParams({
      search,
      status: value,
    })
  }
  const handleSearch = (e) => {
    const value = e.target.value;

    if (value) {
      setSearchParams({ search: value });
    } else {
      setSearchParams({});
    }
  };

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
          onChange={(e) => handleStatusChange(e.target.value)}
          className='rounded-lg border-none bg-zinc-800 px-3 py-2 text-white outline-none'>
          <option value="instock" className='bg-zinc-900 text-white'>In stock</option>
          <option value="lowstock" className='bg-zinc-900 text-white' >Low stock</option>
          <option value="outofstock" className='bg-zinc-900 text-white'>Out of stock</option>
        </select>


        <div className="relative flex-1 max-w-md">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />

          <input
            type="text"
            placeholder="Search Products..."
            value={search}
            onChange={handleSearch}
            className="w-full rounded-xl border border-white/10 bg-[#1D1D1D] py-3 pl-11 pr-4 text-sm text-white placeholder:text-zinc-500 outline-none transition focus:border-white/20" />
        </div>

        <button
          onClick={() => setIsAdding(true)}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-2 text-black hover:bg-zinc-200 sm:w-auto">
          <Plus className="h-5 w-5" />
          Add Product
        </button>
      </div>

      <ProductStats products={products} />
      <br />
      <ProductTable currentItems={currentItems}
        setDeleteProduct={setDeleteProduct}
        setSelectedProduct={setSelectedProduct} />
        
      {search && filteredProducts.length === 0 && (
        <h1 className="mt-2 text-center text-bold">Product not found</h1>
      )}
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