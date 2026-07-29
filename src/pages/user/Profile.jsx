import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/slices/AuthSlice';

function Profile() {
  const { user } = useSelector((state)=>state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () =>{
    dispatch(logout());
    localStorage.removeItem("user");

    navigate("/login");
  }
  return (
    <>
    <h1>Profile</h1>

    <button onClick={handleLogout}>Logout</button>
    </>
  )
}

export default Profile