import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetter from '../components/NewsLetter'
const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'About'} text2={'Us'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img src={assets.about_img} alt="about-image" className='w-full md:max-w-[450px]' />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consectetur, culpa quo! Autem sint ex, recusandae iusto officiis necessitatibus commodi fugit? Officia laudantium est cum, perspiciatis nulla dignissimos velit, harum inventore eos sapiente quos eius nam omnis ullam ea, blanditiis esse.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque eos, explicabo dicta nobis porro minus cumque provident laudantium sunt voluptatum repudiandae? Corrupti fuga placeat quae rem recusandae esse autem temporibus, blanditiis, sapiente, officiis mollitia expedita officia! Consectetur provident nam ratione.</p>

          <b className='text-gray-800'>Our Mission</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure eius aspernatur temporibus consectetur accusantium ad ipsum, minima odit est natus nostrum cupiditate ipsa culpa! Animi maiores quos rerum est enim?</p>
        </div>
      </div>


      <div className='text-2xl py-4'>
        <Title text1={'Why'} text2={'choose us'} />
      </div>
      <div className='flex flex-col md:flex-row mb-20 text-sm'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance</b>
          <p className='text-gray-600'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequuntur delectus quod harum? Aliquam, ipsam quis!</p>
        </div>

        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience</b>
          <p className='text-gray-600'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequuntur delectus quod harum? Aliquam, ipsam quis!</p>
        </div>

        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service</b>
          <p className='text-gray-600'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequuntur delectus quod harum? Aliquam, ipsam quis!</p>
        </div>
      </div>
      <NewsLetter />

    </div>


  )
}

export default About
