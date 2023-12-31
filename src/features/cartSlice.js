import { createSlice } from "@reduxjs/toolkit";
import {toast} from 'react-toastify'

const initialState = {
    cartItems: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems')) 
    : [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState ,
    reducers: {
        addToCart(state, action){
            const itemIndex = state.cartItems.findIndex(
                (item) => item.id === action.payload.id
            );
            if(itemIndex >= 0) {
                state.cartItems[itemIndex].cartQuantity += 1;
                toast.info(`Increased ${state.cartItems[itemIndex].name} Quantity in Cart`, {
                    position: 'top-center',
                })
            } else {
                const tempProduct = { ...action.payload, cartQuantity: 1};
                state.cartItems.push(tempProduct);
                toast.success(` ${action.payload.name} Added To Cart`, {
                    position: 'top-center',
                })
            }

            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        removeFromCart(state, action){
            const nextCartItem = state.cartItems.filter(
                cartItem => cartItem.id !== action.payload.id
            )

            state.cartItems = nextCartItem;
            localStorage.setItem('cartItem', JSON.stringify(state.cartItems))

            toast.error(`${action.payload.name} removed from Cart`, {
                position: 'top-center'
            })
        },
        decreaseCart(state, action){
            const itemIndex = state.cartItems.findIndex(
                cartItem => cartItem.id === action.payload.id
            )

            if(state.cartItems[itemIndex].cartQuantity > 1){
                state.cartItems[itemIndex].cartQuantity -= 1

                toast.info(`Decreased ${action.payload.name} from Cart`, {
                    position: 'top-center',
                })
            } else if(state.cartItems[itemIndex].cartQuantity === 1) {
                const nextCartItem = state.cartItems.filter(
                    cartItem => cartItem.id !== action.payload.id
                )
    
                state.cartItems = nextCartItem;
                
    
                toast.error(`${action.payload.name} removed from Cart`, {
                    position: 'top-center'
                }) 
            }
            localStorage.setItem('cartItem', JSON.stringify(state.cartItems))
        },
        clearCart(state, action){
            state.cartItems = [];
            toast.error('Everything is removed from cart', {
                position: 'top-center',
            })
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        getTotals(state, action) {
       let { total, quantity } = state.cartItems.reduce((cartTotal, cartItem) => {
        const { price, cartQuantity} = cartItem;
        const itemTotal = price * cartQuantity;

        cartTotal.total += itemTotal;
        cartTotal.quantity += cartQuantity

        return cartTotal
       }, {
        total: 0,
        quantity: 0,
       })

       state.cartTotalQuantity = quantity;
       state.cartTotalAmount = total;
        }
    },
});

export const {addToCart, removeFromCart, decreaseCart, clearCart, getTotals } = cartSlice.actions;
export default cartSlice.reducer;