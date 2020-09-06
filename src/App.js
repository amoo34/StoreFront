import React from 'react';
import './App.css';
import {useSelector} from 'react-redux'
import {BrowserRouter as Router, Switch, Route,Link } from 'react-router-dom'
import Homepage from './pages/Homepage'
import 'bootstrap/dist/css/bootstrap.css'
import ProductDetails from './pages/ProductDetail'
import CartScreen from './pages/CartScreen'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Dash from './Admin/Dash'
import AddProduct from './Admin/pages/Addproduct'
import Shipping from './pages/Shipping'
import OrderList from './Admin/pages/OrderList'
import Profile from './pages/Profile'
import createBrowserHistory from 'history/createBrowserHistory'
import ShowProduct from './Admin/pages/ShowProduct'
export const history = createBrowserHistory({forceRefresh:true})
function App() {
  
  const {userInfo} = useSelector(state=>state.userSignin)
  

  
  return (
  
    
    <Router history={history}>
       
        <Switch>
      <Route path="/" exact>
        <Homepage />
        </Route>
      <Route path="/productDetails/:id">
        <ProductDetails/>
      </Route>
      <Route path="/shipping">
        <Shipping/>
      </Route>
      <Route path="/profile">
        <Profile/>
      </Route>
      <Route path="/showProduct">
        <ShowProduct/>
      </Route>
      <Route path="/cart/:id?">
       <CartScreen />
      </Route>
      <Route path="/signup">
       <Signup/>
      </Route>
      <Route path="/signin">
        <Signin/>
      </Route>
      <Route path="/admin">
        <Dash/>
      </Route>
      <Route path="/addProduct">
        <AddProduct/>
      </Route>
      <Route path="/orderList">
        <OrderList/>
      </Route>
        </Switch>
        </Router>  
  
  );
}

export default App;
