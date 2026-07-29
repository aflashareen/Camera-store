import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

function AuthRoute({children}) {
    const { isAuthenticated } = useSelector((state)=> state.auth);

    if(isAuthenticated){
        return <Navigate to="/profile" replace/>
    }
  return children;
}

export default AuthRoute;