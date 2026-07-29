import './App.css'
import AppRoutes from './routes/AppRoutes'
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../src/redux/slices/AuthSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(()=>{
    const savedUser = JSON.parse(localStorage.getItem("user"));

    if(savedUser){
      dispatch(loginSuccess(savedUser));
    }
  },[dispatch]);
  return (
    <>
    <AppRoutes />
    </>
  )
}

export default App;
