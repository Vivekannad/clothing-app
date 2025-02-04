import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllBrands, getAllCategories, getCategoryItems, setCategory, setCurrentPage, setFilterOrder, setItemSearch, setNameFilter, setSelectedBrand, sortByBrand, sortByPriceAsc, sortByPriceDesc, sortByTitleAsc, sortByTitleDesc } from '../Slices/getItemsSlice';
import { IoIosArrowDropdown, IoIosArrowDropup } from 'react-icons/io';
import { useDebouncedCallback } from 'use-debounce';


const FilterSection = () => {
    const [isMobile , setIsMobile] = useState(window.innerWidth <= 768);
    const [seeFilters , setSeeFilters] = useState(!isMobile);
    
    const [filtersApply, setFiltersApply] = useState(false);
    const dispatch = useDispatch();
    const category = useSelector(state => state.products.category);
    const allBrands = useSelector(state => state.products.allBrands);
    const selectedBrand = useSelector(state => state.products.selectedBrand);
    const filterOrder = useSelector(state => state.products.filterOrder);
    const itemSearch = useSelector(state => state.products.itemSearch);

    
    const resize = useDebouncedCallback(() => {
        const mobile = window.innerWidth <= 768;
        setIsMobile(mobile);
        setSeeFilters(!mobile);
    },250);
    useEffect(() => {
        dispatch(getAllCategories());
        window.addEventListener('resize', resize);
        return () => {
            window.removeEventListener('resize', resize);
        }
    }, [])
    
    useEffect(() => {
        dispatch(getAllBrands());
    },[category])

    useEffect(() => {
        console.log("category", category);
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
        dispatch(sortByBrand(selectedBrand))
        filtersApply && dispatch(setCurrentPage(1));

        setFiltersApply(false);
    }, [filtersApply, dispatch])

    const categor = useSelector(state => state.products);
    const categories = categor.allCategories;

    const resetFilters = () => {
        dispatch(setFilterOrder(''));
        dispatch(setItemSearch(''));
        dispatch(setCategory(''));
        dispatch(setSelectedBrand(''));
        setFiltersApply(true);
    }

    return (
        <>
            <p className='md:hidden' >Filters{
              isMobile && !seeFilters ? <IoIosArrowDropdown className='inline cursor-pointer text-2xl ml-1' onClick={() => setSeeFilters(true)} /> : <IoIosArrowDropup className='inline cursor-pointer text-2xl ml-1' onClick={() => setSeeFilters(false)} /> 
                }  </p>
                { seeFilters && 
        <div className="filter-section flex flex-col p-5 rounded-2xl  bg-base-200 gap-10 flex-wrap" >
            <div className="first flex md:justify-between md:items-center flex-wrap md:flex-row  flex-col ">
                <div className="search-input input-parent md:w-[20%] min-w-36 w-full">
                    <label htmlFor="search">Search Product</label>
                    <input type="text" id='search' className='input ' value={itemSearch} onChange={(e) => dispatch(setItemSearch(e.target.value))} />
                </div>
                <div className="brands input-parent md:w-[20%] min-w-36 w-full" >
                    <label htmlFor="category">Select Brand</label>
                    <select name="" id="brands" className='input ' value={selectedBrand} onChange={(e) => dispatch(setSelectedBrand(e.target.value))} >
                        <option value="">All</option>
                        {allBrands.map((brand,index) => (
                            <option value={brand} key={index}>{brand}</option>
                        ))}
                    </select>
                </div>
                <div className="category input-parent md:w-[20%] min-w-36 w-full">
                    <label htmlFor="options">Select category</label>
                    <select name="" id="options" className='input' value={category} onChange={(e) => {
                        dispatch(setCategory(e.target.value))
                        dispatch(setSelectedBrand(''))
                    }}>
                        <option value='' >all</option>
                        {categories.map((category,index) => (
                            <option value={category} key={index}>{category}</option>
                        ))}
                    </select>
                </div>
                <div className="sort input-parent md:w-[20%]  w-full">
                    <label htmlFor="">Sort by</label>
                    <select name="" id="" className='input' value={filterOrder} onChange={(e) => dispatch(setFilterOrder(e.target.value))}>
                        <option value="a-asc">a-z</option>
                        <option value="a-desc">z-a</option>
                        <option value="desc" >Price(high to low)</option>
                        <option value="asc" >Price(low to high)</option>
                    </select>
                </div>
            </div>
            <div className="second flex md:justify-around md:flex-row flex-col items-center ms:gap-0 gap-3">
                {/* <div className="input-parent w-[25%]">
                    <label htmlFor="range" className='flex justify-between w-full' >
                        <span>Select price</span>
                        <span>$10000</span>
                    </label>
                    <input type="range" name="" id="range" min={0} max={10000} value={10000} step={-1000} className='input w-full cursor-pointer' />
                    <div className="prices flex justify-between w-full">
                        <span>0</span>
                        <span>Max:$1,000.00</span>
                    </div>
                </div> */}
                <button className='button h-10 w-3xs py-0 bg-blue-500 hover:bg-blue-700' onClick={() => setFiltersApply(true)}>Search</button>
                <button className='h-10 w-3xs button bg-pink-500 hover:bg-pink-700' onClick={resetFilters}>Reset</button>
            </div>
        </div>
}
        </>
    )
}

export default FilterSection