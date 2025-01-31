import React, { useEffect, useState } from 'react'
import More from './More'
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories } from '../Slices/getItemsSlice';

const FilterSection = () => {
    const [category , setCategory] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllCategories())
    },[])
    const categories = useSelector(state => state.products.allCategories);
    console.log(categories);

  return (
    <div className="filter-section flex flex-col p-5 rounded-2xl  bg-gray-200 gap-10">
        <div className="first flex justify-between">
        <div className="search-input input-parent">
            <label htmlFor="search">Search Product</label>
            <input type="text" id='search' className='input' />
        </div>
        <div className="category input-parent">
            <label htmlFor="options">Select category</label>
            <select name="" id="options" className='input'>
                <option value="all" >all</option>
                {categories.map((category) => (
                    <option value={category.name} key={category.id}>{category.name}</option>
                ))}
            </select>
        </div>
        <div className="sort input-parent">
            <label htmlFor="">Sort by</label>
            <select name="" id="" className='input'>
                <option value="all" >all</option>
                <option value="price-high" >Price(high to low)</option>
                <option value="price-low" >Price(low to high)</option>
            </select>
        </div>
        </div>
        <div className="second flex justify-between">

        <More />
        </div>
    </div>
  )
}

export default FilterSection