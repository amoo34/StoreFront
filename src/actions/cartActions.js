import Axios from "axios"
import {ADD_TO_CART,REMOVE_FROM_CART} from '../actiontypes'
import Cookie from 'js-cookie'
export const addToCart=(id,qty)=>async(dispatch,getState)=>{

    try{
        console.log("hh")
        const {data} = await Axios.get("http://localhost:3005/api/products/"+id)
        const newProd={ id:data.id,
            name:data.name,
            productImage:data.productImage,
            price:data.price,
            salePrice:data.salePrice,
            qty}
            const {cartReducer:{cartItems,total}} = getState()
            
          const copyCartItems = [...cartItems]
        const product = cartItems.find(x=>x.id  === newProd.id)

        console.log(product)
        if(product){
            console.log(product)
            console.log("hh")
           const NewcopyCartItems = cartItems.map(x=>x.id === product.id?newProd:x)
            console.log(NewcopyCartItems)
          
            let price = 0
            NewcopyCartItems.map(prod=>prod.salePrice? price+=prod.salePrice * prod.qty :price+= prod.price * prod.qty)
            console.log(price)
           const newState = {
                total:price,
                cartItems:NewcopyCartItems
           }
          {
              dispatch({
                  type:ADD_TO_CART,payload:newState
              })
          }
          Cookie.set("cartItems",JSON.stringify(NewcopyCartItems))
          Cookie.set("total",JSON.stringify(price))
       

    }
         else{   
             console.log(newProd)
             console.log(copyCartItems)
            const newcopyCartItems = copyCartItems.concat(newProd)
             console.log(newcopyCartItems)
             
             let price = 0
             newcopyCartItems.map(prod=>prod.salePrice? price+=prod.salePrice * prod.qty :price+= prod.price * prod.qty)
             console.log(price)
            const newPState = {
                 total:price,
                 cartItems:newcopyCartItems
            }
             dispatch({
                type:ADD_TO_CART,payload:newPState
            })
            Cookie.set("cartItems",JSON.stringify(newcopyCartItems))
            Cookie.set("total",JSON.stringify(price))
         }
      
}
    catch(error){

    }
}

export const removeFromCart=(id)=>(dispatch,getState)=>{
    const {cartReducer:{cartItems,total}} = getState()
    const data =  cartItems.filter(cart=>cart.id!==id)
    let price = 0
    data.map(prod=>prod.salePrice? price+=prod.salePrice * prod.qty :price+= prod.price * prod.qty)
    console.log(price)
   const newPState = {
        total:price,
        cartItems:data
   }
    dispatch({
        type:REMOVE_FROM_CART,
        payload:newPState
    })
   
    console.log(getState())
    Cookie.set("cartItems",JSON.stringify(cartItems))
}