import React, { useEffect, useState } from 'react'
import { IoCartOutline, IoMoon } from 'react-icons/io5'
import { useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import PageLink from './PageLink'
import { GiHamburgerMenu } from 'react-icons/gi'

const Navbar = () => {
  const cartedItems = useSelector(state => state.cart.totalCartedItems)
  const [navLinksVisible , setNavLinksVisible] = useState(true);

  useEffect(() => {
    const width = window.innerWidth;
    (width < 768) && setNavLinksVisible(false)
  }, [])
  

  return (
    <nav className='navbar flex md:justify-between md:items-center md:flex-row flex-col items-start relative'>
        <div className="logo  md:w-auto flex items-center md:pb-0 pb-2 ">
            <h1 className='px-4 py-2 rounded-2xl bg-blue-700 text-white text-3xl'>V</h1>
            <GiHamburgerMenu onClick={() => setNavLinksVisible(!navLinksVisible)} className='cursor-pointer absolute right-0 md:sr-only' />
        </div>
        <ul className = { navLinksVisible ? "links flex justify-between md:items-center gap-2 md:flex-row items-start flex-col" : 'sr-only' }>
            <PageLink link='Home' to='/' />
            <PageLink link='About' to='/about' />
            <PageLink link= "Products" to="/products" />
            <PageLink link='Cart' to='/cart' />
        </ul>
        <div className = { navLinksVisible ? "icons flex justify-between items-center gap-2 relative" : 'sr-only' }>
        <IoMoon className='cursor-pointer text-2xl'/>
        <Link to='/cart'>
        <IoCartOutline className='cursor-pointer text-4xl hover:bg-base-300 rounded-4xl py-1' />
        </Link>
        {/* <IoCartOutline className='cursor-pointer text-4xl hover:bg-gray-100 rounded-4xl py-1' /> */}
        <span className='bg-blue-600 absolute px-1 rounded-2xl text-xs text-white right-0 bottom-5'>{cartedItems}</span>
        </div>
        
    </nav>
  )
}

export default Navbar