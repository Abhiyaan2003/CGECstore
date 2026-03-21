import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'
import { Link } from 'react-router-dom';

const Wishlist = () => {

    const { products, currency, wishlistItems, addToWishlist, addToCart, navigate } = useContext(ShopContext);
    const [wishlistData, setWishlistData] = useState([]);

    useEffect(() => {
        const tempData = [];
        for (const items in wishlistItems) {
            if (wishlistItems[items]) {
                const itemInfo = products.find((product) => product._id === items);
                if (itemInfo) {
                    tempData.push(itemInfo);
                }
            }
        }
        setWishlistData(tempData);
    }, [wishlistItems, products]);

    const moveToCart = (id) => {
        // Redirect to product page to select size
        window.scrollTo(0, 0);
        navigate(`/product/${id}`);
    }

    return wishlistData.length > 0 ? (
        <div className='border-t pt-14 min-h-[80vh]'>
            <div className='text-2xl mb-3'>
                <Title text1={'MY'} text2={'WISHLIST'} />
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {
                    wishlistData.map((item, index) => (
                        <div key={index} className="relative group">
                            <ProductItem id={item._id} image={item.image} name={item.name} price={item.price} discount={item.discount} bestseller={item.bestseller} />
                            <div className='p-2'>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault(); // Prevent navigating to product page
                                        moveToCart(item._id)
                                    }}
                                    className='w-full bg-black text-white text-xs px-3 py-2 opacity-100 transition-opacity cursor-pointer'
                                >
                                    Move to Cart
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    ) : (
        <div className='flex flex-col items-center justify-center min-h-[50vh] gap-4'>
            <div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center'>
                {/* Using SVG for heart icon if asset not available or consistent */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 opacity-40">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>
            </div>
            <h2 className='text-2xl font-medium text-gray-700'>Your wishlist is empty</h2>
            <p className='text-gray-500'>Save items you love to revisit later.</p>
            <Link to="/collection" className='bg-black text-white px-8 py-3 text-sm uppercase tracking-wide rounded-sm hover:bg-gray-800 transition-colors mt-4'>
                Browse Collection
            </Link>
        </div>
    )
}

export default Wishlist
