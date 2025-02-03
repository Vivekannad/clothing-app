import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'

const Header = () => {
  return (
    <>
    <header className='bg-base-200 pad-start'>
        <Navbar/>
    </header>
        <Outlet/>
    
    </>
  )
}

export default Header