import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
// import image from '../assets/image-1.webp'

const Card = ({items , selectedView = 0}) => {
  return (
    <>
        <div className={selectedView === 1 ? 'flex flex-col items-center justify-center w-full rounded-lg bg-conic-210 cursor-pointer  flex-wrap  gap-4 mt-10' : 'flex items-center justify-center  rounded-lg bg-conic-210 cursor-pointer  flex-wrap  gap-4 mt-10'} >
      {items.length > 0 ? items.map((item,index) => {
        return(
        <Link className={selectedView === 1 ? "flex justify-between items-center w-full rounded-lg bg-conic-210 cursor-pointer  shadow-sm hover:shadow-2xl transition-all duration-300 shadow-black px-2" : "flex flex-col items-center w-[23%] rounded-lg bg-conic-210 cursor-pointer  shadow-sm hover:shadow-2xl transition-all duration-300 shadow-black" } key={item.id} to={`/products/${item.id}`}>
          
          <img src={item.images[index % 3]}  className={selectedView === 0  ? ' w-full object-cover rounded-lg h-72' : ' object-cover rounded-lg w-[12%] h-30'} />
          <h2 className="title py-2">{item.title.substring(0,30)}...</h2>
          <p className="price pb-2">${item.price}</p>

        </Link>
      )}
    ) : <h1 className='mx-auto font-bold text-4xl'>No items found</h1>
    }
    </div>
    </>
  )
}

export default Card