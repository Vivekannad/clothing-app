import React, { useEffect } from 'react'
import Button from './Button'
import image from '../assets/image-1.webp'
import image2 from '../assets/image-2.webp'
import image3 from '../assets/image-3.webp'
import image4 from '../assets/image-4.webp'
import Card from './Card'
import { fetchProduct, getFeaturedItems } from '../Slices/getItemsSlice'
import { useDispatch, useSelector } from 'react-redux'

const Hero = () => {
  const dispatch = useDispatch();
    useEffect(() => {
      dispatch(fetchProduct()).then(() => {
        dispatch(getFeaturedItems());
      })
    },[])
    const items = useSelector(state => state.products.featuredItems);
  return (
    <main className='flex flex-col gap-4 pad-start mt-10'>
        <section className='flex justify-between items-start gap-8'>
        <div className="col w-[45%] flex flex-col gap-8">
            <h1 className='text-6xl font-bold '>We are changing the way people shop</h1>
            <p className='text-gray-500 text-xl'>Get your products delivered to your doorstep</p>
            <button className='button w-[40%]'>Shop now</button>
        </div>
        <div className="col w-[45%] h-96 bg-blue-800 ">
            <div className="carousel">
                <img src={image} alt=""  className='carousel-item'/>
                <img src={image2} alt=""  className='carousel-item'/>
                <img src={image3} alt=""  className='carousel-item'/>
                <img src={image4} alt=""  className='carousel-item'/>
            </div>
        </div>
        </section>
        <section className='mt-10 py-10 pb-20'>
        <h2 className='text-5xl my-5'>Featured Products</h2>
        <hr />
        <Card items = {items}/>
        </section>
    </main>
  )
}

export default Hero