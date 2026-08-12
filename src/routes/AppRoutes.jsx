import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { Outlet } from "react-router-dom";

// user
import Home from "../pages/user/Home";
import Shop from "../pages/user/Shop";
import Products from "../pages/user/Products";
import Cart from "../pages/user/Cart";
import Wishlist from "../pages/user/Wishlist";
import Checkout from "../pages/user/Checkout";
import Collection from "../pages/user/Collections";
import Profile from "../pages/user/Profile";
import About from "../pages/user/About";
import Login from "../pages/user/auth/Login";
import Register from "../pages/user/auth/Register";
import Hero from "../components/hero/Hero";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import OrderSuccess from "../orders/OrderSuccess";
import Orders from "../orders/Orders";
import NotFound from "../notfound/NotFound";

//admin
import AdminRoute from "./AdminRoute";
import Dashboard from "../pages/admin/Dashboard";
import AdminProducts from "../pages/admin/Products";
import Users from "../pages/admin/Users";
import AdminOrders from "../pages/admin/Orders";
import AdminLayout from "../components/admin/AdminLayout";

function AuthLayout() {
  return <Outlet />;
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/hero" element={<Hero />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/product/:id" element={<Products />} />
          <Route path="/about" element={<About />} />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/ordersuccess" element={<OrderSuccess />} />
          <Route path="/orders" element={<Orders />} />
        </Route>

        <Route element={<PublicRoute />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Route>


{/* //admin */}
        <Route path="/admin" element={
          <AdminRoute>
              <AdminLayout />
          </AdminRoute>
          }>
          <Route index element={<Dashboard />}/>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="users" element={<Users />} />
          <Route path="orders" element={<AdminOrders />} />
        </Route>
      <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;