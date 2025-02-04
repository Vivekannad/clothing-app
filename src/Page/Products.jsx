import React, { useEffect, useState } from 'react'
import FilterSection from '../Components/FilterSection'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct, sortByTitleAsc, setCurrentPage } from '../Slices/getItemsSlice';
import Spinner from '../Components/Spinner';
import Card from '../Components/Card';
import ProductCards from '../Components/ProductCards';


const Products = () => {
 
    console.log(typeof import.meta.env.VITE_URL_ENDPOINT)
    const dispatch = useDispatch();
    const items = useSelector(state => state.products.items);
    const allItems = useSelector(state => state.products.allItems)
    const currentPage = useSelector(state => state.products.currentPage);

    useEffect(() => {
        dispatch(fetchProduct()).then((res) => {
            console.log(res);
        })
    }, []);

    useEffect(() => {
        dispatch(sortByTitleAsc());
    }, [currentPage, dispatch]);

    const handlePageChange = (page) => {
        if (items.length < 15) {
            dispatch(setCurrentPage(1));
            return;
        };
        if (page === 0) {
            if (items.length < 15) {
                dispatch(setCurrentPage(1));
                return;
            };
            dispatch(setCurrentPage(currentPage + 1));
            return;
        }
        dispatch(setCurrentPage(page));
    }

    return (
        <>
            {allItems.length > 0 ?
                (
                    <>
                        <section className='products pad-start mt-10'>
                            <FilterSection />
                            <ProductCards />
                            <div className={`pages flex justify-end gap-1 my-10 items-center  `}>
                                <div className="page-item">
                                    <button
                                        className={`page-link border-2 px-2 border-black hover:bg-green-700 cursor-pointer ${currentPage === 1 && 'bg-green-700 text-white'} `}
                                        onClick={() => { handlePageChange(1) }}
                                    > 1</button>
                                </div>
                                <div className="page-item">
                                    <button
                                        className={`page-link border-2 px-2 border-black  hover:bg-green-700 cursor-pointer ${currentPage === 2 && 'bg-green-700 text-white'} `}
                                        onClick={() => { handlePageChange(2) }}>2
                                    </button>
                                </div>
                                <div className="page-item">
                                    <button
                                        className={`page-link border-2 px-2 border-black hover:bg-green-700 cursor-pointer ${currentPage === 3 && 'bg-green-700 text-white'} `}
                                        onClick={() => { handlePageChange(3) }}
                                    >3</button>
                                </div>
                                <div className="page-item">
                                    <button
                                        className="page-link border-2 px-2 border-black hover:bg-green-700 cursor-pointer"
                                        onClick={() => { handlePageChange(0) }}
                                    >Next</button>
                                </div>
                            </div>
                        </section>
                    </>
                )
                : <Spinner />}
        </>
    )
}

export default Products