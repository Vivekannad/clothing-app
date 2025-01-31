import React from 'react'
import image from '../assets/image-1.webp'

const Card = () => {
  return (
    <>
    <div className="cards flex justify-center items-center gap-4 mt-10">
        <div className="card ">
            <img src={image} alt="" className='w-full object-cover rounded-lg h-40' />
            <h2 className="title">A Shop</h2>
            <p className="price">179.99</p>
        </div>
        <div className="card ">
            <img src={image} alt="" className='w-full object-cover rounded-lg h-40' />
            <h2 className="title">A Shop</h2>
            <p className="price">179.99</p>
        </div>
        <div className="card ">
            <img src={image} alt="" className='w-full object-cover rounded-lg h-40' />
            <h2 className="title">A Shop</h2>
            <p className="price">179.99</p>
        </div>
        </div>
    </>
  )
}

export default Card