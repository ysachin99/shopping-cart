import './App.css';
import 'react-toastify/dist/ReactToastify.css'
import {Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Cart from './components/Cart';
import NotFound from './components/NotFound'
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <ToastContainer/>
     <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/cart' element={<Cart/>} />
      <Route path="*" element={<NotFound/>} />
     </Routes>
    </div>
  );
}

export default App;
