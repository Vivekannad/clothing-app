import React, { useEffect, useState } from 'react'
import FilterSection from '../Components/FilterSection'
import ProductCard from '../Components/ProductCard'
import { useDispatch } from 'react-redux';
import { fetchProduct } from '../Slices/getItemsSlice';

const Products = () => {
    const [items , setItems] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchProduct()).then((res) => {
            setItems(res.payload);
        });
    },[])
    // const item = useSelector(state => state.products.items);
    console.log(items);
  return (
    <>
      {items.length > 0 ?
        (
            <>
            <section className='products pad-start mt-10'>
                <FilterSection />
                <ProductCard items = {items} />
            </section>
            <div className="pages flex ">
                <div className="page-item">
                    <button className="page-link">1</button>
                </div>
                <div className="page-item">
                    <button className="page-link">2</button>
                </div>
                <div className="page-item">
                    <button className="page-link">3</button>
                </div>
                <div className="page-item">
                    <button className="page-link">Next</button>
                </div>
            </div>
             </>
        )
      : <h1>Nothing in the items</h1>}
    </>
  )
}

export default Products