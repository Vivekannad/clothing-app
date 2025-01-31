import React from 'react'
import More from './More'

const FilterSection = () => {
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
                <option value="tables" >tables</option>
                <option value="chairs" >Chairs</option>
                <option value="sofas" >Sofas</option>
            </select>
        </div>
        <div className="company input-parent">
            <label htmlFor="company">Select company</label>
            <select name="" id="company" className='input'>
                <option value="all" >all</option>
                <option value="ikea" >ikea</option>
                <option value="liddy" >Liddy</option>
                <option value="marcos" >Marcos</option>
                <option value="johns" >Johns</option>
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