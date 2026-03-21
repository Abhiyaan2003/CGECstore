import React from 'react'
import { assets } from '../assets/assets'
const OurPolicy = () => {
   return (
      <div className='flex flex-col sm:flex-row justify-around gap-12 text-center py-10 text-xs sm:text-sm md:text-base text-gray-700'>
         <div>
            <img src={assets.exchange_icon} alt="exchange-icon" className='w-12 m-auto mb-5' />
            <p className='font-semibold'>Easy exchange policy</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
         </div>

         <div>
            <img src={assets.quality_icon} alt="quality-icon" className='w-12 m-auto mb-5' />
            <p className='font-semibold'>7 days return policy</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
         </div>

         <div>
            <img src={assets.support_img} alt="customer-support" className='w-12 m-auto mb-5' />
            <p className='font-semibold'>Best Customer support</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
         </div>
      </div>
   )
}

export default OurPolicy
