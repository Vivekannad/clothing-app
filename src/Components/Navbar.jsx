import React from 'react'
import { IoCartOutline, IoMoon } from 'react-icons/io5'
import { useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'

const Navbar = () => {

  const cartedItems = useSelector(state => state.cart.totalCartedItems)
  return (
    <nav className='navbar flex justify-between items-center'>
        <div className="logo px-4 py-2 rounded-2xl bg-blue-700 text-white text-3xl">
            <h1>V</h1>
        </div>
        <ul className="links flex justify-between items-center gap-2">
              <NavLink to='/'  className={({isActive}) => isActive ? 'bg-gray-100 rounded-lg' : ''}>
            <li className='p-3 hover:bg-gray-100 transition-all rounded-lg duration-200 cursor-pointer'>
              Home
            </li>
              </NavLink>
              <NavLink to='/about' className={({isActive}) => isActive ? 'bg-gray-100 rounded-lg' : ''} >
            <li className='p-3 hover:bg-gray-100 transition-all rounded-lg duration-200 cursor-pointer'>
              About
              </li>
              </NavLink>
              <NavLink to='/products' className={({isActive}) => isActive ? 'bg-gray-100 rounded-lg' : ''} >
            <li className='p-3 hover:bg-gray-100 transition-all rounded-lg duration-200 cursor-pointer'>
              Products
            </li>
              </NavLink>
              <NavLink to='/cart' className={({isActive}) => isActive ? 'bg-gray-100 rounded-lg' : ''} >
            <li className='p-3 hover:bg-gray-100 transition-all rounded-lg duration-200 cursor-pointer'>
              Cart
              </li>
              </NavLink>
        </ul>
        <div className="icons flex justify-between items-center gap-2 relative">
        <IoMoon className='cursor-pointer text-2xl'/>
        <Link to='/cart'>
        <IoCartOutline className='cursor-pointer text-4xl hover:bg-gray-100 rounded-4xl py-1' />
        </Link>
        {/* <IoCartOutline className='cursor-pointer text-4xl hover:bg-gray-100 rounded-4xl py-1' /> */}
        <span className='bg-blue-600 absolute px-1 rounded-2xl text-xs text-white right-0 bottom-5'>{cartedItems}</span>
        </div>
    </nav>
  )
}

export default Navbar