import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../components/layout/Layout';

//User Pages
import Home from '../pages/user/Home';
import Shop from '../pages/user/Shop';
import Products from '../pages/user/Products'
import Cart from '../pages/user/Cart'
import Wishlist from '../pages/user/Wishlist';
import Checkout from '../pages/user/Checkout';
import Collection from '../pages/user/Collection';
import Search from '../pages/user/Search';
import Profile from '../pages/user/Profile';
import About from '../pages/user/About';
import Login from '../pages/user/auth/Login';
import Register from '../pages/user/auth/Register';
import BestSeller from '../pages/user/BestSeller';
import ProtectedRoute from './ProtectedRoute';

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                {/* user */}
                <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/collection" element={<Collection />} />
                <Route path="/product/:id" element={<Products />} />
                <Route path='/about' element={<About />}/>
                <Route path='/bestseller' element={<BestSeller />}></Route>

                <Route path="/profile" element={
                    <ProtectedRoute>
                    <Profile />
                    </ProtectedRoute>
                    } />
                <Route path='/login' element={<Login />}/>
                <Route path='/register' element={<Register />}/>

                <Route path="/search" element={<Search />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
export default AppRoutes;