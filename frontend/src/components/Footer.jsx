import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const Footer = () => {
   return (
      <div>

         <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            <div>
               <div className='mb-5'>
                  <img src={assets.new_logo} className='w-36' alt="logo" />
               </div>
               <p className='w-full md:w-2/3 text-gray-600'>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis sapiente repellendus fugit maiores amet omnis!
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo dicta, aspernatur sint ut illum quaerat?
               </p>
            </div>

            <div>
               <p className='font-medium text-xl mb-5'>Company</p>
               <ul className='flex flex-col gap-1 text-gray-600'>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/about">About us</Link></li>
                  <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                  <li><Link to="/return-policy">Return Policy</Link></li>
                  <li><Link to="/refund-policy">Refund Policy</Link></li>
                  <li><Link to="/disclaimer">Disclaimer</Link></li>
               </ul>
            </div>

            <div>
               <p className='font-medium text-xl mb-5'>Get in touch</p>
               <ul className='flex flex-col gap-1 text-gray-600'>
                  <li>9123613119</li>
                  <li>7811924306</li>
                  <li></li>
               </ul>
            </div>

         </div>

         <div className='border-t border-gray-300'>
            <p className='py-5 text-sm text-center'>Copyright 2026 @Lumatrix Solutions | All rights reserved</p>
         </div>
      </div>

   )
}

export default Footer
