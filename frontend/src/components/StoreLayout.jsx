import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import SearchBar from './SearchBar'

const StoreLayout = () => (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
        <Navbar />
        <SearchBar />
        <Outlet />
        <Footer />
    </div>
)

export default StoreLayout
