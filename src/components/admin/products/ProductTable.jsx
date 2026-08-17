import { Eye, Trash2 } from 'lucide-react'
import React from 'react'

function ProductTable({currentItems,setDeleteProduct,setSelectedProduct}) {
  return (
    <div>
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
                    className="h-16 w-16 rounded-lg object-cover" />
                </td>
                <td className="px-4 py-3">{product.name}</td>
                <td className="px-4 py-3">₹{product.price}</td>
                <td className="px-4 py-3">{product.stock}</td>
                <td className="px-4 py-3">
                  <span className={`whitespace-nowrap rounded-full px-3 py-1 text-sm ${product.stock <= 0 ? "bg-red-500/20 text-red-400"
                    : product.stock < 2 ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-green-500/20 text-green-400"
                    }`}>
                    {product.stock <= 0 ? "Out of stock" : product.stock < 2 ? "Low stock" : "In stock"}
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
    </div>
  )
}

export default ProductTable