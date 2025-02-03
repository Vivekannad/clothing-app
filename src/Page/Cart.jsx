import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { adjustQuantity, removeFromCart } from '../Slices/cartSlice';

const Cart = () => {

  const items = useSelector(state => state.cart.cartedItems);
  console.log(items);
  const dispatch = useDispatch();

  const removeItem = (id) => {
    dispatch(removeFromCart(id));
  }

  const adjustItemAmount = (amount , id) => {
    // console.log(typeof  Number(amount.target.value) , amount.target.value)
    dispatch(adjustQuantity({amount: Number(amount.target.value) , id : id}));
  } 
  const subTotal = items.reduce((acc, item) => acc + item.price * item.amount, 0);
  const tax = subTotal * 0.1;
  const total = subTotal + tax;

  return (
    <div className='cart pad-start'>
      <h1>Shopping Cart</h1>
      <hr />
      <main className="flex my-10 gap-5">
      <div className="col flex flex-col flex-3 gap-6">
        {items.length > 0 ? items.map(item => (
            <div className="item flex border-b-2 border-black h-[90px] py-2 justify-between " key={item.id}>
              <img src={item.image} alt="" className="h-[100%]" />
              <div className="item-details flex flex-col">
                <h1 className="title font-bold">{item.title}</h1>
                <p className="color">Color: <span className='colorsin bg-green-700'></span> </p>
              </div>
              <div className="item-amount flex flex-col items-center">
                <p>Amount</p>
                <input type="number" min={1} max={99} step={1} defaultValue={item.amount} className='input text-center' onChange={(e) => {adjustItemAmount(e,item.id)}} />
                <p className="remove hover:underline text-blue-400 cursor-pointer" onClick={() => {removeItem(item.id)}}>remove</p>
              </div>
              <p className="price">${item.price}</p>
            </div>
    
        ))
          : <p>No items in the cart</p>}
                  </div>
          <div className="col gap-2 flex flex-col flex-1 px-3 bg-gray-100 justify-center rounded-2xl h-[200px]">
              <div className="sub-total flex justify-between border-b-2 border-gray-200 py-2">
                <p>Subtotal:</p>
                <p>${subTotal}</p>
              </div>
              <div className="tax flex justify-between border-b-2 border-gray-200 py-2">
                <p>Tax:</p>
                <p>${tax.toFixed(1)}</p>
              </div>

              <div className="total flex justify-between border-b-2 border-gray-200 py-2">
                <p>Total:</p>
                <p>${total.toFixed(1)}</p>
              </div>
          </div>

      </main>
    </div>
  )
}

  export default Cart;