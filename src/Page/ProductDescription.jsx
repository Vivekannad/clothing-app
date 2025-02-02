import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'

const ProductDescription = () => {
    const [color, setColor] = useState("");
    const [displayImage , setDisplayImage] = useState(null);
    const params = useParams().id;

    const selectedColor = color === 'red' ? 'red' : color === 'green' ? 'green' : color === 'blue' ? 'blue' : '';
    // console.log(selectedColor);

    const allItems = useSelector(state => state.products.allItems);
    const item = allItems.find(product => product.id === Number(params));

    useEffect(() => {
        setDisplayImage(item.images[0]);
    },[]);


  return (
    <div className='description pad-start flex justify-center gap-10 my-10'>
        <div className="col w-[40%] h-[450x]">
            <div className="main-image h-[85%]">
            <img src={displayImage} alt="" className='rounded-2xl h-[100%]' />
            </div>
            <div className="image-options h-[15%] flex  items-end gap-4 mt-2 ml-2">
                <div className="image-option h-[100%]" >
                    <img src={item.images[0]} alt={item.description} className=' h-[100%] cursor-pointer' onClick={() => setDisplayImage(item.images[0])} />
                </div>
                <div className="image-option h-[100%]" >
                    <img src={item.images[1]} alt="" className=' h-[100%] cursor-pointer' onClick={() => setDisplayImage(item.images[1])} />
                </div>
                <div className="image-option h-[100%]" >
                    <img src={item.images[2]} alt="" className=' h-[100%] cursor-pointer' onClick={() => setDisplayImage(item.images[2])} />
                </div>
            </div>
        </div>
        <div className="col w-[40%] flex flex-col gap-2 justify-center">
            <h1 className='font-bold text-2xl'>{item.title}</h1>
            <p className='italic'>${item.price}</p>
            <p>{item.description}</p>
            <p>Colors</p>
            <div className="colors flex gap-1">
                <button
                 className='h-3 w-3 bg-red-700 rounded-4xl  cursor-pointer'
                 onClick={() => setColor("red")}
                 style={{"outline" : selectedColor === "red" && "2px solid black"}}
                 ></button>
                <button
                 className='h-3 w-3 bg-green-700 rounded-4xl  cursor-pointer'
                 onClick={() => setColor("green")}
                 style={{"outline" : selectedColor === "green" && "2px solid black" }}
                 ></button>
                <button
                 className='h-3 w-3 bg-blue-700 rounded-4xl  cursor-pointer'
                 onClick={() => setColor("blue")}
                 style={{"outline" : selectedColor === "blue" && "2px solid  black"}}
                 ></button>
            </div>
            <h3 className="amount">Amount</h3>
            <input type="number" min={1} max={99} step={1} className='input' />
            <div className="addToBag bg-purple-600 p-2 rounded-2xl w-28 cursor-pointer">Add To Bag</div>
        </div>
    </div>
  )
}

export default ProductDescription