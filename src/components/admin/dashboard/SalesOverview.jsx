import React, { useMemo } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

function SalesOverview({ orders }) {
    const salesData =useMemo(()=>{
        return orders.map((order) => ({
        date: new Date(order.orderedAt).toLocaleDateString(),
        sales: Number(order.total || 0),
         }));
    },[orders]); 
   
    return (
        <div className='mt-8'>
            <h2 className='text-xl font-semibold text-white'>Sales Overview</h2>

            <div className='mt-4 h-80 rounded-2xl border border-white/10 bg-[#151515]'>
            <ResponsiveContainer width="100%" height="100%">
            <LineChart data={salesData}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="date" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="sales"
              strokeWidth={2}
            />

          </LineChart>
        </ResponsiveContainer>

            </div>
        </div>
    )
}

export default SalesOverview