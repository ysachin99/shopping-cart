import React from 'react'
import { useGetAllProductsQuery } from '../features/productsApi'
import {useDispatch} from 'react-redux'
import { addToCart } from '../features/cartSlice';
import {useNavigate} from 'react-router-dom'


function Home() {
  
  const {data, error, isLoading} = useGetAllProductsQuery();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
       dispatch(addToCart(product));
       navigate('/cart'); 
  }

  return (
    <div className='home'>
    {
      isLoading ? (<p>Loading ...</p>) : 
      error ? (<p>error occured ...</p>) :
      (<>
      <h2>Products</h2>
      <div className='products'>
        {data?.map( product => <div key={product.id} className='product'>
          <h3>{product.name}</h3>
          <img src={product.image} alt={product.name} />
          <h6 style={{textAlign: 'center'}}>₹{product.price}</h6>
          <button onClick={() => handleAddToCart(product)}>Add To Cart</button>
        </div>)}
      </div>
      </>)
    }
    </div>
  )
}

export default Home