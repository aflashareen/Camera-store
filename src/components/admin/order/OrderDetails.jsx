function OrderDetails({ order, onClose, dropdownRef }) {

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/70 p-6">
            <div ref={dropdownRef}
            className="w-full max-w-3xl max-h-[90vh] overflow-y-auto scrollbar-hide rounded-2xl border border-white/10 bg-[#151515] p-8 text-white">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-semibold">Order #{order.id}</h2>
                        <p className="text-sm text-zinc-500 mt-1">{new Date(order.orderedAt).toLocaleString()}</p>
                    </div>
                    <button onClick={onClose}
                        className="rounded-lg px-4 py-2 bg-zinc-800 hover:bg-zinc-700">
                        Close
                    </button>
                </div>

                <div className="mb-8">
                    <p className="text-sm text-zinc-500 mb-2">Status </p>
                    <span className="rounded-full bg-yellow-500/10 px-3 py-1 text-sm text-yellow-400">
                        {order.status}
                    </span>
                </div>
                

                <div className="grid md:grid-cols-2 gap-6 mb-8">

                    <div className="rounded-xl bg-[#1E1E1E] p-5">
                        <h3 className="text-lg font-semibold mb-4">Customer </h3>
                        <p>{order.shippingAddress?.fullName}</p>
                        <p className="text-zinc-400 mt-2">{order.shippingAddress?.email}</p>
                        <p className="text-zinc-400 mt-1">{order.shippingAddress?.phone}</p>
                    </div>

                    <div className="rounded-xl bg-[#1E1E1E] p-5">
                        <h3 className="text-lg font-semibold mb-4">Shipping Address</h3>
                        <p>{order.shippingAddress?.address}</p>
                        <p className="text-zinc-400 mt-2">{order.shippingAddress?.city}</p>
                        <p className="text-zinc-400">{order.shippingAddress?.state}</p>
                        <p className="text-zinc-400">{order.shippingAddress?.pincode}</p>
                    </div>
                </div>

                <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-4">Ordered Items</h3>
                    <div className="space-y-3">
                        {order.items.map((item) => (
                            <div
                                key={item.productId}
                                className="flex items-center justify-between rounded-xl bg-[#1E1E1E] p-4">

                                <div className="flex items-center gap-4">

                                    <img src={item.image} alt={item.name}
                                        className="w-16 h-16 rounded-lg object-cover" />

                                    <div>
                                        <p className="font-medium">{item.name}</p>
                                        <p className="text-sm text-zinc-500">Quantity: {item.quantity}</p>
                                    </div>

                                </div>
                                <p>₹{item.price.toLocaleString()}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="border-t border-white/10 pt-6">
                    <div className="flex justify-between mb-3">
                        <span className="text-zinc-400">Payment Method</span>
                        <span>{order.paymentMethod}</span>
                    </div>

                    <div className="flex justify-between text-xl font-semibold">
                        <span>Total</span>
                        <span>₹{order.total.toLocaleString()}</span>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default OrderDetails;