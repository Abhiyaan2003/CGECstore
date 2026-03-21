import React, { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {

  const { productId } = useParams();
  const { products, currency, addToCart, addToWishlist, wishlistItems, navigate } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('')
  const [size, setSize] = useState('M')
  const [quantity, setQuantity] = useState(1);

  const isInWishlist = wishlistItems[productData._id];

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item)
        setImage(item.image[0]);
        // get product details -> console.log(item)
        return null;
      }
    })
  }

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/**Product Data*/}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

        {/**  Product images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {/**Image Gallery option images */}
            {
              productData.image.map((item, index) => (
                <img onClick={() => setImage(item)} src={item} key={index} alt="product-image" className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' />
              ))
            }
          </div>
          {/**Image gallery display image */}
          <div className='w-full sm:w-[80%]'>
            <img src={image} alt="" className='w-full h-auto' />
          </div>
        </div>

        {/**Product info section */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-2 mt-2 flex-wrap'>
            {productData.bestseller && (
              <span className='bg-black text-white text-[10px] uppercase font-bold px-2 py-1 rounded-sm shadow-sm leading-none'>
                Best Seller
              </span>
            )}
            {productData.discount && (
              <span className='bg-[#FF414D] text-white text-[10px] uppercase font-bold px-2 py-1 rounded-sm shadow-sm leading-none'>
                -{productData.discount}% Off
              </span>
            )}
          </div>
          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} alt="star-icon" className="w-3 5" />
            <img src={assets.star_icon} alt="star-icon" className="w-3 5" />
            <img src={assets.star_icon} alt="star-icon" className="w-3 5" />
            <img src={assets.star_icon} alt="star-icon" className="w-3 5" />
            <img src={assets.star_dull_icon} alt="star-icon" className="w-3 5" />
            <p className='pl-2'>(122)</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>

          <div className='flex flex-col gap-4 my-8'>
            <p>Select size</p>
            <div className='flex gap-2'>
              {
                productData.sizes.map((item, index) => (
                  <button onClick={(() => setSize(item))} key={index} className={`border py-2 px-4 cursor-pointer ${item === size ? ' bg-black text-white border-black' : 'hover:bg-gray-200'
                    }`} >{item}</button>
                ))
              }
            </div>
          </div>

          <div className='flex flex-col gap-4 my-8'>
            <p>Quantity</p>
            <div className='flex items-center gap-4'>
              <div className='flex items-center border border-gray-300'>
                <button onClick={() => setQuantity(prev => (prev > 1 ? prev - 1 : 1))} className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>-</button>
                <p className='px-4 py-2 border-l border-r border-gray-300'>{quantity}</p>
                <button onClick={() => setQuantity(prev => prev + 1)} className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>+</button>
              </div>
            </div>
          </div>
          <div className='flex gap-4 items-center flex-wrap'>
            <button className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700 cursor-pointer w-full sm:w-auto uppercase tracking-wide' onClick={() => addToCart(productData._id, size, quantity)}>Add to Cart</button>

            <button className='bg-green-600 text-white px-8 py-3 text-sm active:bg-green-800 cursor-pointer w-full sm:w-auto uppercase tracking-wide hover:bg-green-700 transition-colors' onClick={() => { if (!size) { addToCart(productData._id, size, quantity); return; } addToCart(productData._id, size, quantity); navigate('/cart'); }}>Buy Now</button>

            <button onClick={() => addToWishlist(productData._id)} className='border border-gray-300 p-3 rounded hover:bg-gray-50 cursor-pointer'>
              {isInWishlist ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-red-500">
                  <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>
              )}
            </button>
          </div>
          <hr className='mt-8 sm:w-4/5' />

          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Original Product</p>
            <p>UPI payment available on this product</p>
            <p>Easy return & exchange policy within 7 days</p>
          </div>
        </div>
      </div>

      {/**Description & Review Section */}
      <div className='mt-20'>
        <div className='flex'>
          <b className='border border-gray-300 px-5 py-3 text-sm'>Description</b>
          <p className='border border-gray-300 px-5 py-3 text-sm'>Reviews (122)</p>
        </div>
        <div className='flex flex-col gap-4 border border-gray-300 px-6 py-6 text-sm text-gray-500'>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam provident corporis atque nulla! Ullam aut sunt eos reiciendis laborum? Cum dolore magni pariatur ut sapiente.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur dignissimos, ex enim sunt maxime quo aliquid a itaque excepturi ipsa fugiat minus, aut facere ratione.</p>
        </div>
      </div>

      {/**Related Products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />

    </div>
  ) : <div className='opacity-0'></div>
}

export default Product
