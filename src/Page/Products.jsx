import React, { useEffect, useState } from 'react'
import FilterSection from '../Components/FilterSection'
import ProductCard from '../Components/ProductCard'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct, sortByTitleAsc , setCurrentPage } from '../Slices/getItemsSlice';
import Spinner from '../Components/Spinner';

const Products = () => {
    // const [items , setItems] = useState([]);
    // const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();
    const items = useSelector(state => state.products.items);
    const allItems = useSelector(state => state.products.allItems)
    const currentPage = useSelector(state => state.products.currentPage);

    useEffect(() => {
        dispatch(fetchProduct())
    },[]);
    
    useEffect(() => {
        dispatch(sortByTitleAsc());
    }, [currentPage, dispatch]);

    const handlePageChange = (page) => {
        if(items.length < 15) {
            dispatch(setCurrentPage(1));
            return;
        };
        if(page === 0){
            if(items.length < 15) {
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
                <ProductCard items = {items} />
            <div className="pages flex justify-end gap-1 my-10 items-center">
                <div className="page-item">
                    <button
                     className="page-link border-2 px-2 border-black hover:bg-gray-200 cursor-pointer "
                     style={{backgroundColor: currentPage === 1 && 'lightgreen' }}
                     onClick={() => {handlePageChange(1)}}
                     > 1</button>
                </div>
                <div className="page-item">
                    <button
                     className="page-link border-2 px-2 border-black hover:bg-gray-200 cursor-pointer"
                     style={{backgroundColor: currentPage === 2 && 'lightgreen' }}
                     onClick={() => {handlePageChange(2)}}>2
                     </button>
                </div>
                <div className="page-item">
                    <button
                     className="page-link border-2 px-2 border-black hover:bg-gray-200 cursor-pointer"
                     style={{backgroundColor: currentPage === 3 && 'lightgreen' }}
                     onClick={() => {handlePageChange(3)}}
                     >3</button>
                </div>
                <div className="page-item">
                    <button
                     className="page-link border-2 px-2 border-black hover:bg-gray-200 cursor-pointer"
                     onClick={() => {handlePageChange(0)}}
                     >Next</button>
                </div>
            </div>
            </section>
             </>
        )
      : <Spinner/>}
    </>
  )
}

export default Products