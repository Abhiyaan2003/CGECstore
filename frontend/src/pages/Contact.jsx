import React from 'react'
import Title from '../components/Title'
import {assets} from '../assets/assets'
import NewsLetter from '../components/NewsLetter'
const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl border-t pt-10'>
        <Title text1={'Contact'} text2={'us'}/>
      </div>

      <div className='my-10 flex flex-col md:flex-row justify-center gap-10 mb-28'>
        <img src= {assets.contact_img} alt="contact-image" className='w-full md:max-w-[480px]'/>
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-gray-600 text-xl'>Our Store</p>
          <p className='text-gray-500'>735101, Jalpaiguri <br />West Begal, India</p>
          <p className='text-gray-500'>Tel: +8617374285 <br />dbrpn07cse@gmail.com</p>
          <p className='text-gray-600 text-xl font-semibold'>Careers at Forever</p>
          <p className='text-gray-500'>Learn more about our teams and job openings</p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500 cursor-pointer'>Explore Jobs</button>
        </div>
      </div>
      
      
    </div>
  )
}

export default Contact
