import React from 'react'
import { useCurrentUser } from '../hooks/UseCurrentUser'
import { Navigate, Outlet } from 'react-router-dom';

function PublicRoute() {
    const { data: user } = useCurrentUser();

    return user ? <Navigate to="/" replace /> : <Outlet />
}

export default PublicRoute;