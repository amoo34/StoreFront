import axios from 'axios'
import { ORDERFAIL,ORDERREQUEST,ORDERSUCCESS} from '../actiontypes'
import { history } from '../App'
import Cookie from 'js-cookie'
export const order=(orderData)=>async(dispatch)=>{
    console.log(orderData.timeStamp)
    try{
        dispatch({type:ORDERREQUEST})
        const {data} = await axios.post("http://localhost:3005/api/order",{
        Uname:orderData.Uname,
        Uemail:orderData.Uemail,
        UID:orderData.UID,
        productsOrder:orderData.productsOrder,
        address:orderData.address,
        phoneNumber:orderData.phoneNumber,
        delivery:orderData.delivery,
        totalPrice:orderData.totalPrice
      })
       orderData.productsOrder.map(async(prod)=>{

       console.log(prod.id)
       console.log(prod.qty)
      const {data} = await axios.put("http://localhost:3005/api/products/"+prod.id,{
        qty:prod.qty
     
      })
    })
    Cookie.remove('cartItems');
    Cookie.remove('total');
    history.push('/')
        dispatch({type:ORDERSUCCESS,payload:data})
    }
    catch(error)
    {
        dispatch({type:ORDERFAIL,payload:"Error while Uploading"})
    }
}