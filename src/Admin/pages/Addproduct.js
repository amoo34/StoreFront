import React,{useState,useRef,useEffect } from 'react'
import {withRouter} from 'react-router-dom'
import "./Addproduct.css"
import { useMediaQuery } from 'react-responsive'
import Sidebar from '../Sidebar'
import ToggleSidebar from '../../Component/ToggleSidebar'
import MobSidebar from '../MobSidebar'
import axios from 'axios'
import Joi from 'joi-browser'
import SimpleReactValidator from 'simple-react-validator';
function AddProduct(props) {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1080px)' })
    const isLap = useMediaQuery({ query: '(min-width: 1081px)' })
    const [prod,setProd] = useState({})
    const [error,setError] = useState()
    const handleChange=(e)=>{
        e.preventDefault()
        const {value}= e.currentTarget
        console.log(e.currentTarget.type)
        const copyData = {...prod}
        console.log(e.currentTarget.file)
        const targetRes =  e.currentTarget.type == "file" ? e.currentTarget.files[0] : value
        copyData[e.currentTarget.name] = targetRes;
        setProd(copyData)
        console.log(prod)

    }
 
    const validation=()=>{
      console.log(prod)
      console.log(typeof(prod.stock))
      console.log(parseInt(prod.stock))
      if(parseInt(prod.stock) == NaN)
      {
        setError("Stock Values must be in Number")
        console.log("sas")
        return false
      }
      if(parseInt(prod.price) === 'undefined')
      {
        setError("Price must be in Number")
        console.log("sasss")
        return false
      }
      if(parseInt(prod.salePrice) === 'undefined')
      {
        console.log("sassss")
        setError("Sale Price must be in Number")
        return false
      }
      return true
    }
    const submitHandler=(event)=>{
        event.preventDefault()
      
      
      
        let formData = new FormData();
                formData.append("productImage", event.target.productImage.files[0]);
                formData.append('name', event.target.name.value);
                formData.append('brand', event.target.brand.value); 
                formData.append('stock', event.target.stock.value); 
                formData.append('details', event.target.details.value); 
                formData.append('price',event.target.price.value); 
                formData.append('salePrice',event.target.salePrice.value);
                formData.append('category',event.target.category.value);
                console.log(formData)
                console.log(event.target.brand.value)
                console.log(prod)
        axios.post("http://localhost:3005/api/products",formData)
        .then(res=>{
            console.log(res.data)
            props.history.push('/admin')
        })
        .catch(error=>{
            console.log(error)
            console.log(formData)
        })
   
      
    }
    const simpleValidator = useRef(new SimpleReactValidator())
    return (
        <div className="AddProduct">
                 {isLap &&          <Sidebar />}
          {isTabletOrMobile &&      <MobSidebar />}
          <div className="AddProduct__Screen">
            <div className="toggler">
          {isTabletOrMobile &&  <ToggleSidebar classIs=".DashScreen"/> } <p> Sidebar</p> 
          </div>
          <form className="AddForm" onSubmit={submitHandler} >   
    <center>  <h4 className="mb-3">Add Product</h4> </center>
  
     <div className="form-group" id="emails">
  <label>Name</label>
<input type="text" 

 id="email" required onChange={handleChange}
  className="form-control" name="name" placeholder="Name" 
   autofocus="" /></div>

<div className="form-group" id="emails">
  <label>Brand</label>
<input type="text" id="email" required onChange={handleChange} className="form-control" name="brand" placeholder="Brand"  autofocus="" />
</div>

<div className="form-group" id="emails">
  <label>Category</label>
<input type="text" id="email" required onChange={handleChange} className="form-control" name="category" placeholder="Category"  autofocus="" />
</div>

<div className="form-group" id="emails">
  <label>Stock</label>
<input type="text" pattern="[0-9]*" id="email" required onChange={handleChange} className="form-control" name="stock" placeholder="Stock"  autofocus="" />
</div>

<div className="form-group" id="emails">
  <label>Price</label>
<input type="text" pattern="[0-9]*" id="email" required onChange={handleChange} className="form-control" name="price" placeholder="Price"  autofocus="" />
</div>

<div className="form-group" id="emails">
  <label>Sale Price</label>
<input type="text" pattern="[0-9]*" id="email"  onChange={handleChange} className="form-control" name="salePrice" placeholder="Sale Price"  autofocus="" />
</div>
<div className="form-group" id="emails">
  <label>Product Details</label>
<textarea  id="email" required  onChange={handleChange} className="form-control" name="details" placeholder="Product Details"  autofocus="" />
</div>
<div className="form-group" id="emails">
  <label>Image</label>
<input type="file" id="email" required onChange={handleChange} className="form-control" name="productImage" placeholder=""  autofocus="" />
</div>

{error?<div>{error}</div>:""}
     <button className="btn  btn-primary btn-block "  type="submit">Add Product</button>   
   
</form>

          </div>
        </div>
    )
}

export default withRouter(AddProduct)
