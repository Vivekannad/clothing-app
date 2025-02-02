import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, redirect, useParams } from 'react-router-dom'
import { addToCart, setTotalCartedItems } from '../Slices/cartSlice';

import { toast } from 'react-toastify';

const ProductDescription = () => {
    const [color, setColor] = useState("");
    const [displayImg , setDisplayImg] = useState("");
    const [amount , setAmount] = useState(1);
    const [productDetails , setProductDetails] = useState({
        id : null,
        title : null,
        price : null,
        image : null,
        amount : null,
        color : null,
    });
    const params = useParams().id;

    const selectedColor = color === 'red' ? 'red' : color === 'green' ? 'green' : color === 'blue' ? 'blue' : '';
    const dispatch = useDispatch();

    useEffect(() => {
        setDisplayImg(item.images[0]);
    }, [])

    const allItems = useSelector(state => state.products.allItems);
    const cartedItems = useSelector(state => state.cart.cartedItems)
    const item = allItems.find(product => product.id === Number(params));


    function addToCartHandler(){
        
        if(color === ""){
            toast.error("Add all details first" );

            return;
        }
        const isItemPresent = cartedItems.find((item) => item.id === Number(params))
        if(isItemPresent){
            toast.error("Item already added to cart" , {
                position : 'top-center'
            });
            return;
        }
        dispatch(addToCart({
            id : item.id,
            title : item.title,
            price : item.price,
            image : item.images[0],
            amount : amount,
            color : selectedColor,
        }));
        console.log("Added to cart");
        toast.success("Added to cart" , {
            position : 'top-center'
        });
        dispatch(setTotalCartedItems(Number(amount)))
        // setColor("");
        // setAmount(1)
    }

  return (
    <div className='page pad-start my-10'>
    <div className="navigation flex gap-1">
        <Link to="/">Home</Link>
        <p className='text-gray-400'> &gt; </p>
        <Link to="/products">Products</Link>
    </div>
    <div className='description flex mt-4 gap-10 '>
        <div className="col w-[40%] ">
            <div className="main-image ">
            <img src={displayImg} alt="" className='rounded-2xl ' />
            </div>
        </div>
        <div className="col w-[40%] flex flex-col gap-2 justify-center">
            <h1 className='font-bold text-2xl'>{item.title}</h1>
            <p className='italic'>${item.price}</p>
            <p>{item.description}</p>
            <p>Colors</p>
            <div className="colors flex gap-1">
                <button
                 className='colorsin bg-red-700 '
                 onClick={() => setColor("red")}
                 style={{"outline" : selectedColor === "red" && "2px solid black"}}
                 ></button>
                <button
                 className='colorsin bg-green-700'
                 onClick={() => setColor("green")}
                 style={{"outline" : selectedColor === "green" && "2px solid black" }}
                 ></button>
                <button
                 className='colorsin bg-blue-700'
                 onClick={() => setColor("blue")}
                 style={{"outline" : selectedColor === "blue" && "2px solid  black"}}
                 ></button>
            </div>
            <h3 className="amount">Amount</h3>
            <input type="number" min={1} max={99} step={1} className='input' defaultValue={1} onChange={(e) => setAmount(e.target.value)} />
            <div 
            className="addToBag bg-purple-400 p-2 rounded-xl w-28 cursor-pointer text-white text-center hover:bg-purple-600 transition-all "
            onClick={addToCartHandler}
            >Add To Bag</div>
        </div>
    </div>
    <div className="image-options flex  items-end gap-4 mt-2 ml-2">
                <div className="image-option h-[100%]" >
                    <img src={item.images[0]} alt={item.description} className=' h-[80px] w-[80px] cursor-pointer' onClick={() => setDisplayImg(item.images[0])} />
                </div>
                <div className="image-option h-[100%]" >
                    <img src={item.images[1]} alt="" className=' h-[80px] w-[80px] cursor-pointer' onClick={() => setDisplayImg(item.images[1])} />
                </div>
                <div className="image-option h-[100%]" >
                    <img src={item.images[2]} alt="" className=' h-[80px] w-[80px] cursor-pointer' onClick={() => setDisplayImg(item.images[2])} />
                </div>
            </div>
    </div>
  )
}

export default ProductDescription