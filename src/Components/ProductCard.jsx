import React from 'react'
import Card from './Card'


const ProductCard = ({items}) => {
  return (
    <>
    {
      items.length > 0 ?     <Card items = {items}/> : <h1 className='mx-auto font-bold text-4xl'>No items found</h1>
    }

    </>
  )
}

export default ProductCard