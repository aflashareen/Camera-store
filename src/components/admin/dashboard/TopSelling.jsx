import React from "react";

function TopSelling({ orders }) {
  const productSales = {};

  orders.forEach((order) => {
    order.items?.forEach((item) => {
      const productId = item.productId;

      if (!productSales[productId]) {
        productSales[productId] = {
          name: item.name,
          quantity: 0,
        };
      }

      productSales[productId].quantity += Number(item.quantity || 0);
    });
  });

  const topProducts = Object.values(productSales)
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5);

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold text-white">
        Top Selling Products
      </h2>

      <div className="mt-4 rounded-2xl border border-white/10 bg-[#151515] p-6">
        {topProducts.map((product, index) => (
          <div
            key={index}
            className="flex items-center justify-between border-b border-white/5 py-4 last:border-0"
          >
            <p className="text-white">{product.name}</p>

            <p className="text-gray-400">
              {product.quantity} sold
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopSelling;