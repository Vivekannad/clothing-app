import React from 'react'

const More = () => {
  return (
    <>
        <div className="input-parent w-[25%]">
            <label htmlFor="range" className='flex justify-between w-full' >
                <span>Select price</span>
                <span>$10000</span>
            </label>
            <input type="range" name="" id="range" min={0} max={10000} value={10000} step={1000} className='input w-full' />
            <div className="prices flex justify-between w-full">
                <span>0</span>
                <span>Max:$1,000.00</span>
            </div>
        </div>
        <button className='button h-10 w-3xs py-0'>Search</button>
        <button className='button h-10 w-3xs bg-pink-500  p-0'>Reset</button>
    </>
  )
}

export default More