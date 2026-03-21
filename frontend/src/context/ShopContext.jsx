import { createContext, useEffect, useState } from "react";
import { products as localProducts } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
   const currency = '₹';
   const delivery_fee = 10;
   const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'

   const [search, setSearch] = useState('');
   const [showSearch, setShowSearch] = useState(false);
   const [cartItems, setCartItems] = useState({});
   const [wishlistItems, setWishlistItems] = useState({});
   const [orders, setOrders] = useState([]);
   const [products, setProducts] = useState(localProducts);
   const [token, setTokenState] = useState(localStorage.getItem('token') || '');
   const navigate = useNavigate();

   const setToken = (tk) => {
      setTokenState(tk)
      localStorage.setItem('token', tk)
   }

   const logout = () => {
      setTokenState('')
      localStorage.removeItem('token')
      navigate('/login')
      toast.success('Logged out successfully')
   }

   // ─── Cart (in-memory, no auth required) ───────────────────────────────
   const addToCart = async (itemId, size, quantity = 1) => {
      if (!size) {
         toast.error('Select Product Size')
         return;
      }
      let cartData = structuredClone(cartItems);
      if (cartData[itemId]) {
         if (cartData[itemId][size]) {
            cartData[itemId][size] += quantity;
         } else {
            cartData[itemId][size] = quantity;
         }
      } else {
         cartData[itemId] = {};
         cartData[itemId][size] = 1;
      }
      setCartItems(cartData);
      toast.success('Added to Cart')
   }

   const updateQuantity = async (itemId, size, quantity) => {
      const cartData = structuredClone(cartItems);
      cartData[itemId][size] = quantity;
      setCartItems(cartData);
   }

   const getCartCount = () => {
      let totalCount = 0;
      for (const items in cartItems) {
         for (const item in cartItems[items]) {
            try {
               if (cartItems[items][item] > 0) totalCount += cartItems[items][item];
            } catch (error) { }
         }
      }
      return totalCount;
   }

   const getCartAmount = () => {
      let totalAmount = 0;
      for (const items in cartItems) {
         let itemInfo = products.find((product) => product._id === items);
         for (const item in cartItems[items]) {
            try {
               if (cartItems[items][item] > 0) {
                  totalAmount += itemInfo.price * cartItems[items][item];
               }
            } catch (error) { }
         }
      }
      return totalAmount;
   }

   // ─── Wishlist (in-memory) ──────────────────────────────────────────────
   const addToWishlist = async (itemId) => {
      let wishlistData = structuredClone(wishlistItems);
      if (wishlistData[itemId]) {
         delete wishlistData[itemId];
         toast.success('Removed from Wishlist');
      } else {
         wishlistData[itemId] = true;
         toast.success('Added to Wishlist');
      }
      setWishlistItems(wishlistData);
   }

   const getWishlistCount = () => Object.keys(wishlistItems).length;

   // ─── Orders (backend) ──────────────────────────────────────────────────
   const placeOrder = async ({ method, address, items, amount }) => {
      if (!token) {
         toast.error('Please login to place an order')
         navigate('/login')
         return false
      }
      try {
         if (method === 'razorpay') {
            // Step 1: Create Razorpay order on backend
            const response = await axios.post(
               backendUrl + '/api/order/razorpay',
               { items, amount, address },
               { headers: { token } }
            )
            if (!response.data.success) {
               toast.error(response.data.message)
               return false
            }

            const { order, orderId } = response.data

            // Step 2: Open Razorpay checkout modal
            const options = {
               key: import.meta.env.VITE_RAZORPAY_KEY_ID,
               amount: order.amount,
               currency: order.currency,
               name: 'CGEC Merchandise',
               description: 'Order Payment',
               order_id: order.id,
               handler: async function (paymentResponse) {
                  // Step 3: Verify payment on backend
                  try {
                     const verifyRes = await axios.post(
                        backendUrl + '/api/order/verifyRazorpay',
                        {
                           razorpay_order_id: paymentResponse.razorpay_order_id,
                           razorpay_payment_id: paymentResponse.razorpay_payment_id,
                           razorpay_signature: paymentResponse.razorpay_signature,
                           orderId
                        },
                        { headers: { token } }
                     )
                     if (verifyRes.data.success) {
                        setCartItems({})
                        navigate('/orders')
                        toast.success('Payment successful! Order placed.')
                     } else {
                        toast.error(verifyRes.data.message)
                     }
                  } catch (err) {
                     console.log(err)
                     toast.error('Payment verification failed')
                  }
               },
               prefill: {
                  name: address.firstName + ' ' + address.lastName,
                  email: address.email,
                  contact: address.phone
               },
               theme: { color: '#000000' }
            }

            const rzp = new window.Razorpay(options)
            rzp.open()
            return true

         } else {
            // COD fallback
            const response = await axios.post(
               backendUrl + '/api/order/place',
               { items, amount, address, paymentMethod: method.toUpperCase() },
               { headers: { token } }
            )
            if (response.data.success) {
               setCartItems({})
               navigate('/orders')
               toast.success('Order placed successfully!')
               return true
            } else {
               toast.error(response.data.message)
               return false
            }
         }
      } catch (error) {
         console.log(error)
         toast.error(error.message)
         return false
      }
   }

   const loadUserOrders = async () => {
      if (!token) return
      try {
         const response = await axios.post(
            backendUrl + '/api/order/userorders',
            {},
            { headers: { token } }
         )
         if (response.data.success) {
            setOrders(response.data.orders.reverse())
         }
      } catch (error) {
         console.log(error)
      }
   }

   // ─── Products (fetched from backend, fallback to local) ────────────────
   const getProductsData = async () => {
      try {
         const response = await fetch(backendUrl + '/api/product/list')
         const data = await response.json()
         if (data.success && data.products && data.products.length > 0) {
            setProducts(data.products)
         } else {
            // DB is empty or returned no products — use bundled local products
            setProducts(localProducts)
         }
      } catch (error) {
         console.log('Backend unreachable, using local product data')
         setProducts(localProducts)
      }
   }

   useEffect(() => {
      getProductsData()
   }, [])

   useEffect(() => {
      loadUserOrders()
   }, [token])

   const value = {
      products, currency, delivery_fee, backendUrl,
      search, setSearch, showSearch, setShowSearch,
      cartItems, setCartItems, addToCart, getCartCount, updateQuantity, getCartAmount,
      navigate,
      wishlistItems, addToWishlist, getWishlistCount,
      orders, placeOrder, loadUserOrders,
      token, setToken, logout
   }

   return (
      <ShopContext.Provider value={value}>
         {props.children}
      </ShopContext.Provider>
   )
}

export default ShopContextProvider;
