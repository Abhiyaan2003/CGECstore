import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
   const { products } = useContext(ShopContext);
   const [bestSeller, setBestSeller] = useState([]);

   useEffect(() => {
      const bestProduct = products.filter((item) => (item.bestseller))
      setBestSeller(bestProduct.slice(0, 10));
   }, [products]);

   return (
      <div className='my-10'>
         {/*Best Seller Collection Heading*/}
         <div className='text-3xl py-4 text-center'>
            <Title text1={'Our'} text2={'Best Sellers'} />
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam in neque, repellendus cum, magnam dolores
            </p>
         </div>

         {/*Best Seller Products list*/}
         <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {
               bestSeller.map((item, index) => (
                  <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} discount={item.discount} bestseller={item.bestseller} />
               ))
            }
         </div>
      </div>
   )
}

export default BestSeller
