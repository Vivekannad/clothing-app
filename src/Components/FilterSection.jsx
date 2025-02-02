import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories, getCategoryItems, setCategory, setFilterOrder, setItemSearch, setNameFilter, sortByPriceAsc, sortByPriceDesc, sortByTitleAsc, sortByTitleDesc } from '../Slices/getItemsSlice';

const FilterSection = () => {

    const [filtersApply, setFiltersApply] = useState(false);
    const dispatch = useDispatch();
    const category = useSelector(state => state.products.category);
    const filterOrder = useSelector(state => state.products.filterOrder);
    const itemSearch = useSelector(state => state.products.itemSearch);


    useEffect(() => {
        dispatch(getAllCategories());
        // dispatch(setFilterOrder('a-asc'));
        // dispatch(getCategoryItems(category))
    }, [])

    useEffect(() => {

        dispatch(setNameFilter(itemSearch.trim()));
        dispatch(getCategoryItems(category))
        if (filterOrder !== '') {
            if (filterOrder === 'a-asc') {
                dispatch(sortByTitleAsc());

            } else if (filterOrder === 'a-desc') {
                dispatch(sortByTitleDesc());

            } else if (filterOrder === 'desc') {
                dispatch(sortByPriceDesc());

            } else if (filterOrder === 'asc') {
                dispatch(sortByPriceAsc());

            }
        }

        setFiltersApply(false);
    }, [filtersApply, dispatch])

    const categor = useSelector(state => state.products);
    const categories = categor.allCategories;
    console.log(categor);

    const resetFilters = () => {
        dispatch(setFilterOrder(''));
        dispatch(setItemSearch(''));
        dispatch(setCategory(''))
        setFiltersApply(true);
    }

    return (
        <div className="filter-section flex flex-col p-5 rounded-2xl  bg-gray-200 gap-10" >
            <div className="first flex justify-between">
                <div className="search-input input-parent">
                    <label htmlFor="search">Search Product</label>
                    <input type="text" id='search' className='input' value={itemSearch} onChange={(e) => dispatch(setItemSearch(e.target.value))} />
                </div>
                <div className="category input-parent">
                    <label htmlFor="options">Select category</label>
                    <select name="" id="options" className='input' value={category} onChange={(e) => dispatch(setCategory(e.target.value))}>
                        <option value='0' >all</option>
                        {categories.map((category) => (
                            <option value={category.id} key={category.id}>{category.name}</option>
                        ))}
                    </select>
                </div>
                <div className="sort input-parent">
                    <label htmlFor="">Sort by</label>
                    <select name="" id="" className='input' value={filterOrder} onChange={(e) => dispatch(setFilterOrder(e.target.value))}>
                        <option value="a-asc">a-z</option>
                        <option value="a-desc">z-a</option>
                        <option value="desc" >Price(high to low)</option>
                        <option value="asc" >Price(low to high)</option>
                    </select>
                </div>
            </div>
            <div className="second flex justify-between">
                <div className="input-parent w-[25%]">
                    <label htmlFor="range" className='flex justify-between w-full' >
                        <span>Select price</span>
                        <span>$10000</span>
                    </label>
                    <input type="range" name="" id="range" min={0} max={10000} value={10000} step={-1000} className='input w-full cursor-pointer' />
                    <div className="prices flex justify-between w-full">
                        <span>0</span>
                        <span>Max:$1,000.00</span>
                    </div>
                </div>
                <button className='button h-10 w-3xs py-0' onClick={() => setFiltersApply(true)}>Search</button>
                <button className='h-10 w-3xs rounded-sm bg-pink-600 hover:bg-pink-700 cursor-pointer text-white  p-0' onClick={resetFilters}>Reset</button>
            </div>
        </div>
    )
}

export default FilterSection