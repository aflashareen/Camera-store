import React from 'react'

function ProductStats({products=[]}) {
      const availableProducts = products.filter(
    (product) => product.stock > 2
  ).length;

  const outOfStock = products.filter(
    (product) => product.stock <= 0
  ).length;
  return (
    <div>
     <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-[#151515] p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500"> Total Products</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">{products.length}</h2>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#151515] p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Available Products</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">
                {availableProducts}
              </h2>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#151515] p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Out of stock</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">
                {outOfStock}
              </h2>
            </div>
          </div>
        </div>
     </div>
    </div>
  )
}

export default ProductStats