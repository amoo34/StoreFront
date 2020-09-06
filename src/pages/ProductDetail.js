import React,{useEffect,useState} from 'react'
import {withRouter} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import './ProductDetail.css'
import {detailsProduct} from '../actions/productActions'
import store from '../store'
import Grid from '@material-ui/core/Grid';
import Navbar from '../Component/Navbar'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Footer from '../Component/footer'
const useStyles = makeStyles((theme) => ({
    root: {
   
    
    },
    details: {
    
    },
    content: {
      
    },
    cover: {
   
    },

  }));
function ProductDetail(props) {
    const classes = useStyles();
    const theme = useTheme();
    const productDetails = useSelector(state=>state.productDetails)
    const {loading,error,productDetail} = productDetails
   
    useEffect(() => {
        store.dispatch(detailsProduct(props.match.params.id))
        
    }, [])
 
    const [qty,setQty] = useState(1)
    const handleAddToCart=()=>{
       props.history.push("/cart/"+props.match.params.id+"?qty="+qty)
    }
    const presrc = "http://localhost:3005/";
   
    
    if(loading == undefined){
         return "loading"
     }
    return (
        <div>
            <Navbar/>
       { loading ? <div>Loading...</div>:
        error ? <div>{error}</div>:
        <div className="container-fluid">
              <Grid container spacing={4} className="mt-4" >
               
          <Grid item md={4} xs={12}>
                <div className="productDetail_img">
                    <img src={presrc+productDetail.productImage} />
                </div>
                </Grid>
                <Grid item md={4} xs={6}>
                <div className="productDetail_info">
                <h5> {productDetail.name}</h5>
                <p>Price: <span style={{color:'red'}}>  Rs {productDetail.salePrice ? productDetail.salePrice :productDetail.price}     {productDetail.salePrice ?  <span style={{ textDecoration:"line-through",fontSize:'12px',color:'black'}}>  Rs {productDetail.price}</span> :""}</span>  </p>
                <p> Brand: {productDetail.brand}</p>
                <p> Category: {productDetail.category}</p>
                
                </div>
                </Grid>
                <Grid item md={4} xs={6}>
                <div className="productDetail_cart">
                    <div className="card">
                    <p>Price: <span style={{color:'red'}}>  Rs {productDetail.salePrice ? productDetail.salePrice :productDetail.price}     {productDetail.salePrice ?  <span style={{ textDecoration:"line-through",fontSize:'12px'}}>  Rs {productDetail.price}</span> :""}</span>
      </p>
      {
          productDetail.stock >5 ?
    <div className="p-2">
      <p className="mb-3">State: InStock</p>
                  QTY:
                    <select value={qty} className="ml-4" onChange={e=>setQty(e.target.value)}>
                         <option>1</option>
                         <option>2</option>
                         <option>3</option>
                         <option>4</option>
                         <option>5</option>
                    </select>
                    <br/>
                    <button className="btn btn-warning mt-2 w-100" onClick={handleAddToCart}>Add to Cart</button>
                    </div>
              :  <p>This Product is low in Stock</p>
            }
</div>
                </div>
           
            </Grid>
           </Grid>
                <Grid container spacing={4} className="container-fluid mt-4" >
                    <Grid item xs={12} md={7} className="">
                
                <Card className={classes.root}>
                <div className="ProductDetail_detail">
                <h3>Product Details:</h3>
               
                </div>
      <Grid container spacing={2}>
          <Grid item lg={8} md={7} xs={12}>
        <CardContent className={classes.content}>
          <Typography component="p" variant="p">
          {productDetail.details}
          </Typography>
         
        </CardContent>
        </Grid>
        <Grid item lg={4} md={5} xs={12}>
            <img src={presrc+productDetail.productImage} className="detailImg"/>
     
      </Grid>
      </Grid>
    </Card>
    </Grid>
    <Grid item md={5} xs={12} className="deliveryDetail">
               <center> <h3 class="mt-2"> Delievery Options</h3></center>
             <div class="row"> 
             <div class="col-6 mt-4">
                <h6>Our Location</h6>
                <p>Lahore, Pakistan</p>
                </div>
                <div class="col-6 mt-4">
                <h6>Home Delievery</h6>
                <p>Handle within 5 to 7 woking Days</p>
                </div>
                </div>
                <div class="row mt-4">
                <div class="col-6 mt-4">
                <h6>How to Buy</h6>
                <p>Cash on Delivery Available all across the Pakistan region</p>
                </div>
             
               
             <div class="col-6 mt-4">
                <h6>Returns and Warranty</h6>
                <p>7 Days Returns</p>
                </div>
                </div>
                <div class="row mt-4"> 
                <div class="col-6 mt-4">
                <h6>Change of mind is not applicable</h6>
                <p>Warranty available for New Product</p>
                </div>
                <div class="col-6 mt-4">
                <h6>Product Status</h6>
                <p>Available</p>
                </div>
                </div>
                 
                    
    </Grid>
    </Grid>
        </div>}
        <Footer/>
        </div>
    )
}

export default withRouter(ProductDetail)
