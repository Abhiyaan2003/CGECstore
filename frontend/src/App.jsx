import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

// Store pages
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import Product from './pages/Product'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Wishlist from './pages/Wishlist'
import Login from './pages/Login'
import PrivacyPolicy from './pages/PrivacyPolicy'
import ReturnPolicy from './pages/ReturnPolicy'
import RefundPolicy from './pages/RefundPolicy'
import Disclaimer from './pages/Disclaimer'

// Layouts
import StoreLayout from './components/StoreLayout'
import AdminLayout from './components/AdminLayout'

// Admin pages
import AdminLogin from './pages/AdminLogin'
import AdminAddProduct from './pages/AdminAddProduct'
import AdminListProducts from './pages/AdminListProducts'
import AdminOrders from './pages/AdminOrders'

const App = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        {/* ── Admin routes (own dark layout, no store nav/footer) ── */}
        <Route path='/admin' element={<AdminLogin />} />
        <Route path='/admin' element={<AdminLayout />}>
          <Route path='add' element={<AdminAddProduct />} />
          <Route path='list' element={<AdminListProducts />} />
          <Route path='orders' element={<AdminOrders />} />
        </Route>

        {/* ── Store routes (Navbar + SearchBar + Footer via StoreLayout) ── */}
        <Route element={<StoreLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/collection' element={<Collection />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/product/:productId' element={<Product />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/place-order' element={<PlaceOrder />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/wishlist' element={<Wishlist />} />
          <Route path='/login' element={<Login />} />
          <Route path='/privacy-policy' element={<PrivacyPolicy />} />
          <Route path='/return-policy' element={<ReturnPolicy />} />
          <Route path='/refund-policy' element={<RefundPolicy />} />
          <Route path='/disclaimer' element={<Disclaimer />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
