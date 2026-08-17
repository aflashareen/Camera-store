import React from 'react'

function OrderSummary({cart,subtotal,shipping,total,handlePlaceOrder}) {
  return (
    <div>
         <div className="mt-12 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.45)] p-8">
          <h2 className="text-3xl font-bold mb-8">
            Order Summary
          </h2>

          <div className="space-y-5">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between mb-3">
                <span>{item.name}</span>
                <span>₹{item.price.toLocaleString()}</span>
              </div>
            ))}

            <hr className="my-6" />

            <div className="space-y-4">

              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>

              <div className="flex justify-between text-2xl font-bold">
                <span>Total</span>
                <span>₹{total.toLocaleString()}</span>
              </div>

            </div>

            <button
              form="checkout-form"
              onClick={handlePlaceOrder}
              className="mt-8 w-full rounded-xl bg-white text-black py-4 font-semibold transition hover:bg-gray-200">
              Place Order
            </button>
          </div>
        </div>
    </div>
  )
}

export default OrderSummary