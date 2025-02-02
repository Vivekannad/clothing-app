import React from 'react'
import { IoCartOutline, IoMoon } from 'react-icons/io5'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

const Navbar = () => {

  const cartedItems = useSelector(state => state.cart.totalCartedItems)
  return (
    <nav className='navbar flex justify-between items-center'>
        <div className="logo px-4 py-2 rounded-2xl bg-blue-700 text-white text-3xl">
            <h1>V</h1>
        </div>
        <ul className="links flex justify-between items-center gap-2">
            <li className='p-3 hover:bg-gray-100 transition-all rounded-lg duration-200 cursor-pointer'>
              <NavLink to='/' >Home</NavLink>
            </li>
            <li className='p-3 hover:bg-gray-100 transition-all rounded-lg duration-200 cursor-pointer'>
              <NavLink to='/about' >About</NavLink>
              </li>
            <li className='p-3 hover:bg-gray-100 transition-all rounded-lg duration-200 cursor-pointer'>
              <NavLink to='/products' >Products</NavLink>

            </li>
            <li className='p-3 hover:bg-gray-100 transition-all rounded-lg duration-200 cursor-pointer'>
              <NavLink to='/cart' >Cart</NavLink>
              </li>
        </ul>
        <div className="icons flex justify-between items-center gap-2 relative">
        <IoMoon className='cursor-pointer text-2xl'/>
        <IoCartOutline className='cursor-pointer text-4xl' />
        <span className='bg-blue-600 absolute px-1 rounded-2xl text-xs text-white right-0 bottom-5'>{cartedItems}</span>
        </div>
    </nav>
  )
}

export default Navbar