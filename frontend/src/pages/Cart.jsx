import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';
import { Link } from 'react-router-dom';


const Cart = () => {

  const { currency, products, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];

    for (const items in cartItems) {
      for (const item in cartItems[items]) {

        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item]
          })
        }
      }
    }
    //console.log(tempData) -> check log for cart entries
    setCartData(tempData);
  }, [cartItems, products])

  return cartData.length > 0 ? (
    <div className='border-t pt-14'>

      {/**Title Cart */}
      <div className='text-2xl mb-3'>
        <Title text1={'Your'} text2={'Cart '} />
      </div>

      {/**Products Entry */}
      <div>
        {
          cartData.map((item, index) => {
            const productData = products.find((product) => product._id === item._id);
            if (!productData) return null;


            return (
              <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
                <div className='flex items-start gap-6'>
                  <img src={productData.image[0]} alt="product-image" className='w-16 sm:w-20' />
                  <div>
                    <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>

                    <div className='flex items-center gap-5 mt-2'>
                      <p>{currency}{productData.price}</p>
                      <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.size}</p>
                    </div>
                  </div>
                </div>

                <input type="number" min={1} defaultValue={item.quantity} className='border max-w-10 sm:max-w-20 sm:px-2 py-1' onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))} />
                <img src={assets.bin_icon} alt="delete-icon" className='cursor-pointer w-4 mr-4 sm:w-5' onClick={() => updateQuantity(item._id, item.size, 0)} />
              </div>
            )
          })
        }
      </div>

      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px] '>
          <CartTotal />
          <div className='w-full text-end'>
            <button className='bg-black text-white text-sm my-8 py-3 px-8 cursor-pointer' onClick={() => navigate('/place-order')}>Proceed to Checkout</button>
          </div>
        </div>

      </div>

    </div>
  ) : (
    <div className='flex flex-col items-center justify-center min-h-[50vh] gap-4'>
      <div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center'>
        <img src={assets.cart_icon} alt="Empty Cart" className='w-8 h-8 opacity-40' />
      </div>
      <h2 className='text-2xl font-medium text-gray-700'>Your cart is empty</h2>
      <p className='text-gray-500'>Discover our curated collection of premium essentials.</p>
      <Link to="/collection" className='bg-black text-white px-8 py-3 text-sm uppercase tracking-wide rounded-sm hover:bg-gray-800 transition-colors mt-4'>
        Browse Collection
      </Link>
    </div>
  )
}

export default Cart
