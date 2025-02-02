import React from 'react'
import { Link } from 'react-router-dom'
// import image from '../assets/image-1.webp'

const Card = ({ items }) => {
  return (
    <>
        <div className="cards flex justify-center flex-wrap items-center gap-4 mt-10" >
      {items.length > 0 && items.map((item) => (
        <div className="card h-72 shadow-sm hover:shadow-2xl transition-all duration-300 shadow-black" key={item.id}>
          <Link to={`/products/${item.id}`}>
          <img src={item.images[0]} alt={item.description.substring(0,10)} className='w-full object-cover rounded-lg h-40' />
          <h2 className="title">{item.title}</h2>
          <p className="price">${item.price}</p>
        </Link>
        </div>
      )
    )}
    </div>
    </>
  )
}

export default Card