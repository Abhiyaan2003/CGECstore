import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {

  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [department, setDepartment] = useState([]);
  const [sortType, setSortType] = useState('relevent')

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value))
    }
    else {
      setCategory(prev => [...prev, e.target.value])
    }
  }

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value))
    }
    else {
      setSubCategory(prev => [...prev, e.target.value])
    }
  }

  const toggleDepartment = (e) => {
    if (department.includes(e.target.value)) {
      setDepartment(prev => prev.filter(item => item !== e.target.value))
    } else {
      setDepartment(prev => [...prev, e.target.value])
    }
  }

  {/**Function to apply filter */ }
  const applyFilter = () => {

    let productsCopy = products.slice();

    if (showSearch && search) {
      // product name & search query in lower case
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }


    // Category & subcategory logic
    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
    }
    if (department.length > 0) {
      productsCopy = productsCopy.filter(item => department.includes(item.department));
    }
    setFilterProducts(productsCopy)
  }

  /* useEffect(() => {
     setFilterProducts(products);
   }, []);*/

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a, b) => (a.price - b.price)));
        break;
      case 'high-low':
        setFilterProducts(fpCopy.sort((a, b) => (b.price - a.price)));
        break;
      case 'best-seller':
        setFilterProducts(fpCopy.sort((a, b) => (b.bestseller === a.bestseller ? 0 : b.bestseller ? 1 : -1)));
        break;

      default:
        applyFilter();
        break;
    }
  }

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, department, search, showSearch, products]);

  useEffect(() => {
    sortProduct();
  }, [sortType])

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>

      {/**Filter Section */}
      <div className='min-w-60 sm:sticky sm:top-4 self-start'>
        <p onClick={() => setShowFilter(!showFilter)} className='my-2 gap-2  text-xl  flex items-center cursor-pointer'>Filters
          <img src={assets.dropdown_icon} alt="dropdown-icon" className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} />
        </p>

        {/**Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>Categories</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Men'} onChange={toggleCategory} /> Men
            </p>

            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Women'} onChange={toggleCategory} /> Women
            </p>
          </div>
        </div>

        {/**Sub Ctaegory Filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>Type</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Topwear'} onChange={toggleSubCategory} /> Top Wear
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Winterwear'} onChange={toggleSubCategory} /> Winter wear
            </p>
          </div>
        </div>

        {/**Department Filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>Departments</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            {['CSE', 'ECE', 'EE', 'ME', 'CE'].map(dept => (
              <p key={dept} className='flex gap-2'>
                <input type="checkbox" className='w-3' value={dept} onChange={toggleDepartment} /> {dept}
              </p>
            ))}
          </div>
        </div>
      </div>


      {/**Products section */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'All'} text2={'Products'} />

          {/**Product Sort */}
          <select className='border-2 border-gray-300 text-sm px-2' onChange={(e) => setSortType(e.target.value)}>
            <option value="relevent">Sort by: Relevent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
            <option value="best-seller">Sort by: Best Seller</option>
          </select>
        </div>

        {/**Map Products */}

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
            filterProducts.map((item, index) => (
              <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} discount={item.discount} bestseller={item.bestseller} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Collection
