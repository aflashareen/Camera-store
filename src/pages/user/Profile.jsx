import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useCurrentUser } from '../../hooks/UseCurrentUser';
import { useQueryClient } from '@tanstack/react-query';

function Profile() {
  const { data : user } =useCurrentUser();

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleLogout = () =>{
    localStorage.removeItem("user");

    queryClient.setQueriesData(["currentUser"], null);

    navigate("/login");
  }
  return (
    <>
    <h1>Profile</h1>

    <button onClick={handleLogout}>Logout</button>
    </>
  )
}

export default Profile;