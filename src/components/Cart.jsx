import React, { useEffect } from 'react'
import '../styles/cart.css'
import { Link } from 'react-router-dom'
import {AiOutlineArrowLeft} from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, clearCart, decreaseCart, getTotals, removeFromCart } from '../features/cartSlice'

function Cart() {
  const cart = useSelector((state) => state.cart);
 const dispatch = useDispatch();

 useEffect(() => {
dispatch(getTotals())
 }, [cart, dispatch])

  const handleRemoveFromCart = (cartItem) => {
      dispatch(removeFromCart(cartItem));
  }

  const handleDecreaseCart = (cartItem) => {
    dispatch(decreaseCart(cartItem));
  }

  const handleIncreaseCart = (cartItem) => {
    dispatch(addToCart(cartItem));
  }

  const handleClearCart = () => {
    dispatch(clearCart());
  }

  return (
    <div className='cart'>
      <h2>Shopping Cart</h2>
      {cart.cartItems.length === 0 ? (
        <div className='cart-empty'>
          <p >Your Cart is empty</p> 
          <div className='start-shopping' style={{margin: 'auto'}}>
            <AiOutlineArrowLeft/>
            <Link to='/'>
           <button className='start-btn'>Start Shopping</button>
           </Link>
        </div>
        </div>
      ) : (
        <div>
          <div className='titles'>
            <h3 className='product-title'>Product</h3>
            <h3 className='price'>Price</h3>
            <h3 className='quantity'>Quantity</h3>
            <h3 className='total'>Total</h3>
            </div>
            <div className='cart-items'>
              {cart.cartItems?.map(cartItem => (
                <div className='cart-item' key={cartItem.id}>
                  <div className='cart-product'>
                    <img src={cartItem.image} alt={cartItem.name} />
                    <div>
                       <h3>{cartItem.name}</h3>
                       <button onClick={() => handleRemoveFromCart(cartItem)}>Remove</button>
                    </div>
                  </div>
                  <div className='cart-product-price'>₹{cartItem.price}</div>
                  <div className='cart-product-quantity'>
                    <button onClick={() => handleDecreaseCart(cartItem)}>-</button>
                    <div className='count'>
                      {cartItem.cartQuantity}
                    </div>
                    <button onClick={() => handleIncreaseCart(cartItem)}>+</button>
                  </div>
                  <div className='cart-product-total-price'>₹{cartItem.price * cartItem.cartQuantity}</div>
                </div>
              ))}
            </div>
              <div className='cart-summary'>
                <button className='clear-cart' onClick={() => handleClearCart()}>Clear Cart</button>
                <div className='cart-checkout'>
                <div className='subtotal'>
                  <span>Subtotal :</span>
                  <span className='amount'>₹{cart.cartTotalAmount}</span>
                </div>
                <button className='checkout-btn'>Check Out</button>
                <div className='continue-shopping'>
                <AiOutlineArrowLeft/>
                <Link to='/'>
                  <button className='continue-btn'>Continue Shopping</button></Link>
                
                </div>
              </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default Cart