import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem'

const LatestCollection = () => {

   const { products } = useContext(ShopContext);
   const [latestProducts, setLatestProducts] = useState([]);

   useEffect(() => {
      setLatestProducts(products.slice(0, 10));
   }, [products])

   return (
      <div className='mb-10 mt-3'>
         {/*Latest Collection Heading section */}
         <div className='text-3xl py-8 text-center'>
            <Title text1={'Latest'} text2={'collection'} />
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam in neque, repellendus cum, magnam dolores
            </p>
         </div>

         {/*Latest Collection Array - rendering products*/}
         <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {
               latestProducts.map((item, index) => (
                  <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} discount={item.discount} bestseller={item.bestseller} />
               ))
            }

         </div>
      </div>
   )
}

export default LatestCollection
