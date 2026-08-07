import React from 'react'
import { NavLink } from 'react-router-dom'

function SideBar() {
  return (
    <aside>
        <h1>Admin</h1>

        <nav>
            <NavLink>Dashboard</NavLink>

            <NavLink>Products</NavLink>

            <NavLink>Users</NavLink>

            <NavLink>Orders</NavLink>
        </nav>
    </aside>
  )
}

export default SideBar