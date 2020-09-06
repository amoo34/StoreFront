import React,{useEffect,useState} from 'react'
import {withRouter} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import {addToCart,removeFromCart} from '../actions/cartActions'
import Navbar from '../Component/Navbar'
import {Link} from 'react-router-dom'
import Footer from '../Component/footer'
function CartScreen(props) {

    const id = props.match.params.id
    const qty = props.location.search? Number(props.location.search.split("=")[1]):""
 
    const dispatch = useDispatch()
    const {cartItems,total} = useSelector(state=>state.cartReducer)
   
    useEffect(() => {
       if(id)
       {
           dispatch(addToCart(id,qty)) 
       }
      
    }, [])
    
    const removeFromCartHandler=(id)=>{
        console.log(id)
        dispatch(removeFromCart(id))
    }
    const shop=()=>{
        props.history.push('/')
    }
    const checkout=()=>{
        props.history.push('/signin?redirect=shipping')
    }
    if(!cartItems)
    {
        return "loading"
    }
    console.log(cartItems)
     const presrc = "http://localhost:3005/";
    return (
        <div> <Navbar/> 
        <div className="cart" style={{marginBottom:'130px'}}>
            <div className="cart-list">
            <center>
                    <h3 style={{marginTop:'30px'}}>
                        Shopping Cart
                    </h3>
                    </center>
                {
                    cartItems.length == 0?
                    <center>
                        Cart is Empty
                    </center>:
                     <table  className="table" style={{marginTop:'40px',clear:"both"}} >
                     <thead>
                     <tr >
                     <th style={listDesign} > <p> Image </p></th>
                     <th   style={listDesign} ><p> Product Name</p></th>
                     <th style={listDesign}> <p> Price </p></th>
                     <th style={listDesign} ><p> Quantity</p></th>
                     <th style={listDesign}> <p>Action </p></th>
                     <th  style={listDesign}  ><p> Total</p></th>
                     </tr>
                     </thead>
                     <tbody>
                 {
                 cartItems.map((prod,index)=>
                     (
                         <tr key={prod.id} >
                           <td  style={listDesign}> <img src={presrc+prod.productImage} style={prodImg}/></td>
                           <td    style={{...listDesign,color:"#696767",fontSize:'15px'}}>  <p>{prod.name}</p> </td>
                           <td  style={{...listDesign,fontFamily:"Comic Sans MS",fontSize:"19px"}}> <p><span style={{color:'darkgrey'}}>  Rs: {prod.salePrice ? prod.salePrice :prod.price}     </span> </p>  </td>
                           <td  style={listDesign}> {prod.qty}</td>
                           <td   style={listDesign}><button className="btn" onClick={()=>removeFromCartHandler(prod.id)}> x</button> </td>
                           <td  style={{...listDesign, color:"red",fontFamily:"Comic Sans MS",fontSize:"19px"}}> Rs {prod.salePrice?prod.salePrice * prod.qty : prod.price * prod.qty}</td>
                           </tr>
                     )
                 )
             }
     </tbody>
 
              </table>
              
                }
                    <center>
     <div style={totalPrice}>
                <h5 >Total Price           
    Rs {total}</h5>
    </div> </center>
        <div style={{clear:"both",marginTop:"60px"}}>
           <Link> <button style={Continue} onClick={shop}> CONTINUE SHOPPING</button> </Link>
            <button style={Checkout} onClick={checkout}> CHECKOUT</button>
       </div>
            </div>
        </div>
        <div style={{marginTop:'400px'}}>
        <Footer/>
        </div>
        </div>
    )
}

export default withRouter(CartScreen)

const pageHead={
    display:'block',
  
    width:'100%',
    height:"80px",
    backgroundColor:"#F0EEEE"

}
const PageHeading=
{
    float:'left',
    fontSize:'17px',
    marginLeft:"50px",
    paddingTop:'30px'

}
const totalPrice={
    
    }
   
const PagePath=
{
    float:'right',
    fontSize:'17px',
    marginRight:"40px",
    paddingTop:'30px'
}
const Continue={
    float:"left",
    marginLeft:'50px',
    backgroundColor:"#FF4D00",
    color:"white",
    fontSize:'13px',
    padding:'12px',
    border:"0px",
    fontWeight:'bold'
}
const Checkout={
    float:"right",
    marginRight:'70px',
    backgroundColor:"#FF4D00",
    color:"white",
    fontSize:'13px',
    padding:'12px',
    border:"0px",
    fontWeight:'bold'
}

const listDesign=
{
    textAlign:"center",
        verticalAlign:"middle",
        width:'15%'
}
const prodImg=
{
   width:'80px'
}