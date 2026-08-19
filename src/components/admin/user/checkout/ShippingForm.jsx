import React from 'react'

function ShippingForm({ formData, errors, handleChange }) {
    return (
        <div>
            <form id="checkout-form"
                className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.45)] p-8">
                <h2 className="text-2xl font-semibold mb-6">
                    Shipping Information
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <input
                            type="text"
                            placeholder="Full Name"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                            className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-gray-400 backdrop-blur-md outline-none transition-all duration-300 focus:border-white/40 focus:bg-white/10"
                        />
                        {errors.fullName && (
                            <p className="text-red-500 text-sm">{errors.fullName}</p>
                        )}
                    </div>
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-gray-400 backdrop-blur-md outline-none transition-all duration-300 focus:border-white/40 focus:bg-white/10"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm">{errors.email}</p>
                        )}
                    </div>

                    <div>
                        <input
                            type="tel"
                            placeholder="Phone Number"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-gray-400 backdrop-blur-md outline-none transition-all duration-300 focus:border-white/40 focus:bg-white/10"
                        />
                        {errors.phone && (
                            <p className="text-red-500 text-sm">{errors.phone}</p>
                        )}
                    </div>

                    <div>
                        <input
                            type="text"
                            placeholder="City"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                            className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-gray-400 backdrop-blur-md outline-none transition-all duration-300 focus:border-white/40 focus:bg-white/10"
                        />
                        {errors.city && (
                            <p className="text-red-500 text-sm">{errors.city}</p>
                        )}
                    </div>

                    <div>
                        <input
                            type="text"
                            placeholder="State"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            required
                            className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-gray-400 backdrop-blur-md outline-none transition-all duration-300 focus:border-white/40 focus:bg-white/10"
                        />
                        {errors.state && (
                            <p className="text-red-500 text-sm">{errors.state}</p>
                        )}
                    </div>

                    <div>
                        <input
                            type="text"
                            placeholder="PIN Code"
                            name="pincode"
                            value={formData.pincode}
                            onChange={handleChange}
                            required
                            className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-gray-400 backdrop-blur-md outline-none transition-all duration-300 focus:border-white/40 focus:bg-white/10"
                        />
                        {errors.pincode && (
                            <p className="text-red-500 text-sm">{errors.pincode}</p>
                        )}
                    </div>

                </div>

                <textarea
                    placeholder="Full Address"
                    rows={4}
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="mt-6 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-gray-400 backdrop-blur-md outline-none focus:border-white/40 focus:bg-white/10"
                />
                {errors.address && (
                    <p className="text-red-500 text-sm">{errors.address}</p>
                )}

                <h2 className="text-2xl font-semibold mt-10 mb-5">
                    Payment Method
                </h2>

                <div className="space-y-3">
                    <label className="flex items-center gap-3">
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="Cash on Delivery"
                            checked={formData.paymentMethod === "Cash on Delivery"}
                            onChange={handleChange}
                        />
                        Cash on Delivery
                    </label>

                    <label className="flex items-center gap-3">
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="Credit / Debit Card"
                            checked={formData.paymentMethod === "Credit / Debit Card"}
                            onChange={handleChange}
                        />
                        Credit / Debit Card
                    </label>

                    <label className="flex items-center gap-3">
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="Razorpay"
                            checked={formData.paymentMethod === "Razorpay"}
                            onChange={handleChange}
                        />
                        Razorpay
                    </label>

                    <label className="flex items-center gap-3">
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="UPI"
                            checked={formData.paymentMethod === "UPI"}
                            onChange={handleChange}
                        />
                        UPI
                    </label>
                </div>

            </form>
        </div>
    )
}

export default ShippingForm