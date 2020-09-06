import React,{useState,useEffect} from 'react'
import  {Products} from  '../data'
import { BrowserRouter as withRouter } from "react-router-dom";
import Product from '../Component/Product'
import Grid from '@material-ui/core/Grid'
import store from '../store'
import {useSelector,useDispatch} from 'react-redux'
import {listProduct} from '../actions/productActions'
import Cookie from 'js-cookie'
import Navbar from '../Component/Navbar'
import Footer from '../Component/footer'
function Homepage(props) {
 
    const [prod , setProd] = useState([])
    
    const productList = useSelector(state=>state.productList)
    const { products, loading, error} = productList
    console.log(loading)
    useEffect(()=>{
        store.dispatch(listProduct())
       
    },[])

    const prodDetail=(product)=>{
        console.log(product)
     
      } 
      console.log(products)
      console.log(Cookie.getJSON("userInfo"))
    return (
        <div>
        <Navbar/>
      {  loading ? <div>Loading...</div>:
      
        <div   style={{marginTop:'70px'}}>
        <div className="container-fluid" style={{paddingRight:'40px',paddingLeft:'40px'}} >
        
      
        <Grid container spacing={3}>
         
            {
             products !== undefined ?     products.map((product)=>{
               return <Product product={product}  prodDetail={prodDetail} key={product.id} />
            }) :""
            }
     </Grid>
  
        </div>
        </div> }
        <Footer/>
        </div>  
    )
}

export default Homepage
