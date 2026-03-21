import React, { useState, useEffect } from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom';

const heroImages = [
   assets.cse_banner,
   assets.ece_banner,
   assets.ce_banner,
   assets.ee_banner,
   assets.me_banner,
];

const Hero = () => {

   const [currentIndex, setCurrentIndex] = useState(0);

   useEffect(() => {
      const interval = setInterval(() => {
         setCurrentIndex(prev => (prev + 1) % heroImages.length);
      }, 5000);
      return () => clearInterval(interval);
   }, []);

   return (
      <div className='relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen overflow-hidden'>

         {/* Hidden placeholder to dictate height */}
         <img src={heroImages[0]} className='w-full h-auto invisible block' alt="placeholder" />

         {/* Background slideshow images */}
         {heroImages.map((src, i) => (
            <img
               key={i}
               src={src}
               alt={`hero-slide-${i + 1}`}
               className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[2000ms] ease-in-out ${i === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
            />
         ))}

         {/* Text content overlaid on top */}
         <div className='absolute inset-0 z-20 pointer-events-none'>

            {/* Dot indicators */}
            <div className='absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 pointer-events-auto'>
               {heroImages.map((_, i) => (
                  <button
                     key={i}
                     onClick={() => setCurrentIndex(i)}
                     className={`rounded-full transition-all duration-300 cursor-pointer ${i === currentIndex ? 'bg-white w-4 h-2' : 'bg-white/40 w-2 h-2'
                        }`}
                  />
               ))}
            </div>
         </div>
      </div>
   )
}

export default Hero
