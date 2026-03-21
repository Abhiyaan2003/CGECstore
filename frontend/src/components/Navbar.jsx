import React from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { useState, useContext } from 'react'
import { ShopContext } from '../context/ShopContext'

const Navbar = () => {

   const [visible, setVisible] = useState(false);
   const { getCartCount, getWishlistCount, navigate, token, logout } = useContext(ShopContext);

   return (
      <div className='flex items-center justify-between py-5 font-medium relative z-50'>
         {/*Left Section Logo  */}
         <Link to='/'>
            <img src={assets.new_logo} className='w-36' alt="logo" />
         </Link>

         {/*Centered Navlinks */}
         <ul className='hidden sm:flex gap-8 text-sm text-gray-700 absolute left-1/2 -translate-x-1/2'>
            <NavLink to='/' className='flex flex-col items-center gap-1'>
               <p>Home</p>
               <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
            </NavLink>
            <NavLink to='/collection' className='flex flex-col items-center gap-1'>
               <p>Collection</p>
               <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
            </NavLink>
            <NavLink to='/about' className='flex flex-col items-center gap-1'>
               <p>About</p>
               <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
            </NavLink>
            <NavLink to='/contact' className='flex flex-col items-center gap-1'>
               <p>Contact</p>
               <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
            </NavLink>
         </ul>

         <div className='flex items-center gap-6'>
            {/*Orders link – hidden on mobile, shown on sm+ */}
            <p className='hidden sm:block cursor-pointer text-sm text-gray-600 hover:text-black transition-colors' onClick={() => navigate('/orders')}>My Orders</p>

            {/*Wishlist Icon Design Section */}
            <Link to='/wishlist' className='relative'>
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 min-w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
               </svg>
               <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getWishlistCount()}</p>
            </Link>

            {/*Cart Icon Design Section */}
            <Link to='/cart' className='relative'>
               <img src={assets.cart_icon} alt="cart-icon" className='w-5 min-w-5' />
               <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
            </Link>

            {/* Profile / Auth */}
            {token ? (
               <div className='relative group'>
                  {/* Profile icon when logged in */}
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 24 24"
                     strokeWidth={1.5}
                     stroke="currentColor"
                     className="w-5 min-w-5 cursor-pointer"
                  >
                     <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                  </svg>
                  {/* Hover dropdown */}
                  <div className='absolute right-0 pt-2 hidden group-hover:block z-50'>
                     <div className='flex flex-col bg-white border border-gray-200 shadow-lg rounded text-sm min-w-[120px]'>
                        <p className='px-4 py-2 text-gray-500 border-b border-gray-100 text-xs'>Account</p>
                        <button
                           onClick={logout}
                           className='px-4 py-2 text-left text-gray-700 hover:bg-gray-50 hover:text-black transition-colors cursor-pointer'
                        >
                           Logout
                        </button>
                     </div>
                  </div>
               </div>
            ) : (
               <p
                  className='hidden sm:block cursor-pointer text-sm font-medium text-gray-700 hover:text-black transition-colors'
                  onClick={() => navigate('/login')}
               >
                  Login
               </p>
            )}

            {/**Side bar Menu icon for smaller screens */}
            <img onClick={() => setVisible(true)} src={assets.menu_icon} alt="sidebar-menu" className='w-5 cursor-pointer sm:hidden' />
         </div>

         {/*Sidebar Menu for Smaller screens */}
         <div className={`fixed top-0 right-0 h-screen overflow-hidden bg-white transition-all z-50 ${visible ? 'w-full' : 'w-0'}`}>
            <div className='flex flex-col text-gray-600'>
               <div className="flex items-center p-3 gap-4 cursor-pointer" onClick={() => setVisible(false)}>
                  <img src={assets.dropdown_icon} alt="sidebar-dropdown" className='h-4 rotate-180' />
                  <p>Back</p>
               </div>

               <NavLink to='/' className='py-2 pl-6 border' onClick={() => setVisible(false)}>Home</NavLink>
               <NavLink to='/collection' className='py-2 pl-6 border' onClick={() => setVisible(false)}>Collection</NavLink>
               <NavLink to='/about' className='py-2 pl-6 border' onClick={() => setVisible(false)}>About</NavLink>
               <NavLink to='/contact' className='py-2 pl-6 border' onClick={() => setVisible(false)}>Contact</NavLink>
               <NavLink to='/orders' className='py-2 pl-6 border' onClick={() => setVisible(false)}>My Orders</NavLink>

               {/* Auth link in mobile sidebar */}
               {token
                  ? <button
                     className='py-2 pl-6 border text-left text-red-600 cursor-pointer'
                     onClick={() => { setVisible(false); logout(); }}
                  >
                     Logout
                  </button>
                  : <NavLink to='/login' className='py-2 pl-6 border' onClick={() => setVisible(false)}>Login</NavLink>
               }
            </div>
         </div>

      </div>
   )
}

export default Navbar
