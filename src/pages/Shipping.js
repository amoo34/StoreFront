import React,{useState,useEffect} from 'react'
import Navbar from '../Component/Navbar'
import {useSelector,useDispatch} from 'react-redux'
import Cookie from 'js-cookie'
import './Shipping.css'
import store from '../store'
import {order} from '../actions/orderAction'
import {withRouter} from 'react-router-dom'
import Footer from '../Component/footer'
function Shipping(props) {
  
    const {cartItems,total} = useSelector(state=>state.cartReducer)
    const {userInfo} = useSelector(state=>state.userSignin)
    const {orderDetail} = useSelector(state=>state.orderConfirm)
    console.log(store.getState().cartReducer)
    const dispatch = useDispatch()
    const presrc = "http://localhost:3005/";
    const [orderData,setOrderData] = useState({})
    useEffect(()=>{
        var d = new Date();
        var dateobj =  new Date(d.getTime() + (d.getTimezoneOffset() + 300) * 60000);
        console.log(dateobj)
        setOrderData({Uname:userInfo.name,
                      Uemail:userInfo.email,
                      UID:userInfo._id,
                      productsOrder:cartItems,
                      delivery:"COD",
                      totalPrice:total
                    })
                    console.log(orderData)
    },[])
    console.log(orderData)
    const handler=(e)=>{
        e.preventDefault()
        console.log("handle")
        const copyOrderData = {...orderData}
        copyOrderData[e.currentTarget.name] = e.currentTarget.value
        setOrderData(copyOrderData)
        console.log(orderData)
    }

    const Ship=(e)=>{
        e.preventDefault()
            dispatch(order(orderData))
            console.log(store.getState())
           
    }
    return (
        <div>
         <Navbar/>
         <div className="Shipping row" >
            <div className="Shipping_Products col-lg-8 col-sm-12">

            <table  className="table" style={{marginTop:'40px',clear:"both"}} >
                     <thead>
                     <tr >
                     <th > <p> Image </p></th>
                     <th  ><p> Product Name</p></th>
                     <th > <p> Price </p></th>
                     <th  ><p> Quantity</p></th>
                     <th  ><p> Total</p></th>
                     </tr>
                     </thead>
                     <tbody>
                     {
                 cartItems.map((prod,index)=>
                     (
                         <tr key={prod.id} >
                           <td > <img src={presrc+prod.productImage} style={prodImg}/></td>
                           <td >  <p>{prod.name}</p> </td>
                           <td  >  <p><span style={{color:'darkgrey'}}>  Rs {prod.salePrice ? prod.salePrice :prod.price}     </span> </p>  </td>
                           <td  > {prod.qty}</td>
                          <td > Rs {prod.salePrice?prod.salePrice * prod.qty : prod.price * prod.qty}</td>
                           </tr>
                     )
                 )
             }
                    </tbody>
                    <div style={totalPrice}>
                <h5 style={totalPriceHead}>Total Price</h5>             
    <h4 style={totalPriceVal}> Rs{total}</h4>
    </div> 
                    </table>

            </div>
            
            <div className="Shipping_Information col-lg-4 col-sm-12">
            <form onSubmit={Ship}>
            <div className="form-group" id="emails">
     <label>Shipping Address:</label>
  <input required type="text" id="email" onChange={handler}  className="form-control" name="address" placeholder="Shipping Address"  autofocus="" />
 </div>

  <div className="form-group">
  <label>Phone Number</label>
        <input required  type="text" id="pass" onChange={handler} className="form-control" name="phoneNumber" placeholder="Number" />      
    </div> 
    <div className="form-group">
  <label>Delivery: </label>
    <select value="COD" name="delivery" className="ml-2" onChange={handler}>
        <option>COD</option>
    </select>
        </div> 
    <button type="submit" className="btn btn-warning" style={{fontWeight:'500'}} > Confirm Order</button>
            </form>
            </div>
         </div>
         <Footer/>
        </div>
    )
}

export default withRouter(Shipping)
const prodImg=
{
   width:'80px'
}
const totalPrice={
    float:"right",
    marginRight:"30px",
    display:"inline"
    }
    const totalPriceHead={
        display:"inline",
        marginRight:"130px",
        fontSize:"15px" 
    }
    const totalPriceVal=
    {
        fontFamily:"Comic Sans MS",
        fontSize:"19px",
        display:"inline",
        marginRight:"50px"
    }

const PagePath=
{
    float:'right',
    fontSize:'17px',
    marginRight:"40px",
    paddingTop:'30px'
}
