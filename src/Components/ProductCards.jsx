import React, { useState } from 'react'
import { FaGripHorizontal, FaGripVertical } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import Card from './Card';

const ProductCards = () => {
    const items = useSelector(state => state.products.items);
    const sortedItems = useSelector(state => state.products.sortedItems)
 
    const [selectedView , setSelectedView] = useState(0); // 0 == horizontal  1 == vertical
  return (
    <>
    <div className="overview flex justify-between items-center p-3">
    <p>{sortedItems.length} products</p>
    <div className="views flex gap-4">
        <div  onClick={() => setSelectedView(0)} className = {selectedView === 0 ? "bg-blue-600 rounded-2xl" : ''  } >
    <FaGripHorizontal className='py-1.5 h-8 w-8 cursor-pointer'   />
        </div>
        <div  onClick={() => setSelectedView(1)} className={selectedView === 1 ? "bg-blue-600 rounded-2xl" : ''  } >
    <FaGripVertical className='py-1.5 h-8 w-8 cursor-pointer'  />
        </div>
    </div>
    </div>
    <hr />
    <Card items = {items} selectedView = {selectedView} />
    </>
  )
}

export default ProductCards