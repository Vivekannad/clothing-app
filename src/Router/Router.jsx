import React from 'react'
import { Route, Routes, Outlet } from 'react-router-dom'
import Home from '../Page/Home'
import About from '../Page/About'
import Products from '../Page/Products'
import Cart from '../Page/Cart'
import Header from '../Components/Header'

const Router = () => {
    return (
        <Routes>
            <Route path='/' element={<Header/>} >
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="products" element={<Products />} />
                <Route path="cart" element={<Cart />} />
            </Route>

        </Routes>
    )
}

export default Router