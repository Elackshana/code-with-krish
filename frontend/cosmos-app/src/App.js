
import './App.css';
import OrderManagement from './components/order-management';
import CustomerManagement from './components/customer-management';
import ProductManagement from './components/product-management';
import {Route, BrowserRouter, Routes, Link } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <div>
          <nav>
            <Navigation nav={"Order Management"} url="/order-management"/>
            <Navigation nav={"Customer Management"} url="/customer-management"/>
            <Navigation nav={"Product Management"} url="/product-management"/>
          </nav>
        </div>
        <Routes>
          <Route path="/order-management" element={<OrderManagement/>}></Route>
          <Route path="/customer-management" element={<CustomerManagement/>}></Route>
          <Route path="/product-management" element={<ProductManagement/>}></Route>
        </Routes>
      </BrowserRouter>
    
    </>
  );
}


function Navigation({nav, url}){
  return (
    <li>
      <Link to={url}>{nav}</Link>
    </li>
  )
}

export default App;
