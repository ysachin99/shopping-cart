import React from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/navbar.css'
import { AiFillHome } from 'react-icons/ai'
import { BsFillCartFill } from 'react-icons/bs'
import { useSelector } from 'react-redux'

const Navbar = () => {
  const {cartTotalQuantity} = useSelector(state => state.cart)
  return (
    <div className='navbar'>
        <div className='left'>
           <NavLink to='/'>
           <AiFillHome className='home-icon'/>
            Shop
            </NavLink>
        </div>
        <div className='right'>
           <sup>{cartTotalQuantity}</sup>
           <NavLink to='/cart'>
            <BsFillCartFill className='cart-icon'></BsFillCartFill>
            Cart
            </NavLink>
        </div>

    </div>
  )
}

export default Navbar