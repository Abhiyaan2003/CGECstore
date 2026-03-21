import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext.jsx'
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';

const ProductItem = ({ id, image, name, price, discount, bestseller }) => {

   const { currency, addToCart, addToWishlist, wishlistItems, navigate } = useContext(ShopContext);

   const isInWishlist = wishlistItems[id];

   const handleAddToCart = (e) => {
      e.preventDefault();
      navigate(`/product/${id}`);
      window.scrollTo(0, 0);
   }

   const handleAddToWishlist = (e) => {
      e.preventDefault();
      addToWishlist(id);
   }

   return (
      <Link to={`/product/${id}`} className='text-gray-700 cursor-pointer relative group'>
         <div className='overflow-hidden relative aspect-[4/5]'>
            <img src={image[0]} alt="" className='w-full h-full object-cover hover:scale-110 transition ease-in-out' />
            {/* Badges */}
            <div className='absolute top-2 left-2'>
               {bestseller && (
                  <p className='bg-black text-white text-[8px] sm:text-[10px] uppercase font-bold px-1 py-0.5 sm:px-2 sm:py-1 rounded-sm shadow-sm leading-none'>Best Seller</p>
               )}
            </div>
            {/* Action Buttons */}
            <div className='absolute bottom-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>

               {/* Wishlist Button */}
               <button onClick={handleAddToWishlist} className='bg-white p-2 rounded-full shadow hover:bg-gray-100 transition cursor-pointer'>
                  {isInWishlist ? (
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-red-500">
                        <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752 0 0 1-.704 0l-.003-.001Z" />
                     </svg>
                  ) : (
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                     </svg>
                  )}
               </button>

               {/* Cart Button */}
               <button onClick={handleAddToCart} className='bg-white p-2 rounded-full shadow hover:bg-gray-100 transition cursor-pointer'>
                  <img src={assets.cart_icon} alt="cart" className='w-4 h-4' />
               </button>
            </div>
         </div>
         <p className='pt-3 pb-1 text-sm '>{name}</p>
         {/* Ratings - Mocked as requested */}
         <div className='flex items-center gap-1 mb-1'>
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_dull_icon} alt="" className="w-3 5" />
            <p className='text-xs text-gray-500'>(122)</p>
            {discount && (
               <p className='text-[#FF414D] text-[10px] sm:text-xs font-bold bg-[#ffebeb] px-1.5 py-0.5 rounded-sm ml-2'>
                  -{discount}% off
               </p>
            )}
         </div>
         <p className='text-sm font-medium'>{currency}{price}</p>
      </Link>
   )
}

export default ProductItem
