import React from 'react'
import SideBar from './SideBar'
import Header from './Header'
import { Outlet } from 'react-router-dom'

function AdminLayout() {
  return (
    <div className='flex min-h-screen bg-gray-100'>
        <SideBar />

        <div className='flex flex-1 flex-col'>
            <Header />

            <main className='flex-1 p-6'>
                <Outlet />
            </main>
        </div>
    </div>
  )
}

export default AdminLayout;