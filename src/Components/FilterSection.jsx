import React, { useEffect, useState } from 'react'
import More from './More'
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories, getCategoryItems, setNameFilter, sortByPriceAsc, sortByPriceDesc, sortByTitleAsc, sortByTitleDesc } from '../Slices/getItemsSlice';

const FilterSection = () => {
    const [category, setCategory] = useState('0');
    const [sort, setSort] = useState('');
    const [search, setSearch] = useState('');
    const [filtersApply, setFiltersApply] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCategories());
    }, [])

    useEffect(() => {

        if (filtersApply) {

                dispatch(setNameFilter(search.trim()));

            dispatch(getCategoryItems(category))
            if (sort !== '') {
                if (sort === 'a-asc') {
                    dispatch(sortByTitleAsc());

                } else if (sort === 'a-desc') {
                    dispatch(sortByTitleDesc());

                } else if (sort === 'desc') {
                    dispatch(sortByPriceDesc());

                } else if (sort === 'asc') {
                    dispatch(sortByPriceAsc());

                }
            }
        }
        setFiltersApply(false);
    }, [filtersApply ])

    const categor = useSelector(state => state.products);
    const categories = categor.allCategories;
    console.log(categor);

    return (
        <div className="filter-section flex flex-col p-5 rounded-2xl  bg-gray-200 gap-10" >
            <div className="first flex justify-between">
                <div className="search-input input-parent">
                    <label htmlFor="search">Search Product</label>
                    <input type="text" id='search' className='input' value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
                <div className="category input-parent">
                    <label htmlFor="options">Select category</label>
                    <select name="" id="options" className='input' onChange={(e) => setCategory(e.target.value)}>
                        <option value='0' >all</option>
                        {categories.map((category) => (
                            <option value={category.id} key={category.id}>{category.name}</option>
                        ))}
                    </select>
                </div>
                <div className="sort input-parent">
                    <label htmlFor="">Sort by</label>
                    <select name="" id="" className='input' onChange={(e) => setSort(e.target.value)}>
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
                <button className='button h-10 w-3xs bg-pink-500  p-0'>Reset</button>
                {/* <More /> */}
            </div>
        </div>
    )
}

export default FilterSection