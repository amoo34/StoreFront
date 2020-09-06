import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import Sale from '../Image/sale.png'
import Avatar from '@material-ui/core/Avatar'
import {Link} from 'react-router-dom'
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
const useStyles = makeStyles({
    root: {
   
      height:350,
      backgroundColor:'#FFFFFF',
      '&:hover': {
        opacity:0.9,
        backgroundColor:'#F6F5F5'
        
     },
    },
    details:{
        height:350,
        
    },
    media: {
      margin:'auto',
      width:'90%',
      height:160,
      backgroundSize:'contain'

    },
  });
function Product({product,prodDetail}) {
    const classes = useStyles()
    const presrc = "http://localhost:3005/";
    console.log(presrc+product.productImage)
    return (
        <Grid item md={4} xl={2} lg={3} xs={12} sm={6} >
          <Link to={'/productDetails/'+product.id} style={{textDecoration:'none'}}> 
        <Card  className={classes.root}  >
            {product.salePrice?
              <CardHeader
              style={{width:'70px',height:'40px'}}
                avatar={<Avatar alt="Remy Sharp" src={Sale} style={{width:'50px',height:'50px',marginTop:'10px'}} />}
                />
            :<CardHeader
            style={{width:'50px',height:'40px'}}
            />}
        <CardMedia
          className={classes.media}  
              image={presrc+product.productImage}
                    title="Contemplative Reptile"
        />
        <CardContent >
  <Typography gutterBottom variant="p" align="center" component="h6" 
        style={{height:'40px',overflow:"hidden",textOverflow:'ellipsis',fontWeight:'349' }} > 
        <b>    {product.name}</b>
          </Typography>
   
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:'10px'}}>
          <Typography gutterBottom variant="body1" style={{color:'red',fontSize:'18px'}} align="center" component="p" > 
           Rs {product.salePrice ? product.salePrice :product.price}     {product.salePrice ?  <span style={{ textDecoration:"line-through",fontSize:'12px',color:'grey'}}>  Rs {product.price}</span> :""}
      
          </Typography>
      
      
    
      <CardActions>
      <Link to={'/productDetails/'+product.id}> 
          <button style={{fontSize:'17px',backgroundColor:'white',color:'#28639E',padding:'3px',borderRadius:'2px',border:'2px solid #28639E'}}>Details<DoubleArrowIcon/></button>
          </Link>
      </CardActions>
      </div>
      </CardContent>
        </Card>
        </Link> 
        </Grid>
    )
}

export default Product
