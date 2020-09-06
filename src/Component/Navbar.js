import React from 'react'
import '../App.css'
import { Form,Nav,NavDropdown } from 'react-bootstrap';
import {Signout} from '../actions/userActions'
import {usedispatch, useDispatch} from 'react-redux'
import {useSelector} from 'react-redux'
import {BrowserRouter as Router, Switch, Route,Link } from 'react-router-dom'
import './navbar.css'
const Navbar=()=> {
    const {userInfo} = useSelector(state=>state.userSignin)
    const dispatch = useDispatch()
    const ch=()=>{
        console.log(userInfo)
      }
      const openMenu = () => {
        console.log(document.querySelector('.sidebar').style)
        document.querySelector('.sidebar').style.display ='block';
      };
      const closeMenu = () => {
        document.querySelector('.sidebar').style.display ='none';
      };
      console.log(userInfo)
      const logout=()=>{
        console.log("sad")
        dispatch(Signout())
      }
    return (
        <div>
            
    <div className="App">
  
     <header className="header">
          <div className="brand ml-3">
   
            <Link to="/">   Abdul's Store</Link>
          </div>
          <div className="header-links">
            <Link to="/cart">Cart</Link>
            {userInfo ? 
              <div><Link to="/profile">{userInfo.name} </Link>
             <button onClick={logout} style={{backgroundColor:'rgb(19, 2, 43)',border:'none'}}> <Link to="/">Logout </Link> </button>  </div> 
            : (
              <Link to="/signin">Sign In</Link>
            )}
           
          </div>
        </header>
     
        </div>
        </div>
    )
}

export default React.memo(Navbar)