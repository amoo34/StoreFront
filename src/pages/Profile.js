import React,{useEffect,useState} from 'react'
import Navbar from '../Component/Navbar'
import profile from '../Images/profile.jpg'
import './profile.css'
import Cookie from 'js-cookie'
import {useSelector,useDispatch} from 'react-redux'
import axios from 'axios'
import Grid from '@material-ui/core/Grid'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Pagination from "react-js-pagination";
import { createMuiTheme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import Footer from '../Component/footer'

function Profile() {
   
    const {userInfo} = useSelector(state=>state.userSignin)
    console.log(userInfo._id)
    console.log(userInfo.email)
    const [order,setOrder] = useState([])
    const [currentPage,setCurrentPage] = useState(1)
    const [postPerPage,setPostPerPage] = useState(5)
    useEffect(() => {
        const fetchData=async()=>{
            console.log(userInfo._id)
            const {data} =  await axios.get("http://localhost:3005/api/order/"+userInfo._id)
            console.log(data)
            const sortedCars1 = data.sort((a, b) => new Date(b.timeStamp) - new Date(a.timeStamp));
       
            setOrder(sortedCars1)
        }
        fetchData()
    }, [])
    const theme = createMuiTheme({
        palette: {
          primary: grey,
        },
      });
    const StyledTableCell = withStyles((theme) => ({
        head: {
          backgroundColor: theme.palette.text.secondary,
          color: theme.palette.common.white,
          borderRight:'1px solid lightGrey'
        },
        body: {
          fontSize: 14,
          borderRight:'1px solid lightGrey',
          borderBottom:'1px solid lightGrey'
        },
      }))(TableCell);
      const StyledTableCells = withStyles((theme) => ({
     
        body: {
          fontSize: 14,
          border:'none',

   
        },
      }))(TableCell);
      const StyledTableRow = withStyles((theme) => ({
        root: {
          '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
          },
        },
      }))(TableRow);
      const handlePageChange=(pageNumber)=> {
        console.log(`active page is ${pageNumber}`);
        setCurrentPage(pageNumber)
      
      }
      const indexOfLastPost =  currentPage * postPerPage
      const indexOfFirstPost =  indexOfLastPost - postPerPage
      const currentPosts = order.slice(indexOfFirstPost,indexOfLastPost)
    return (
        <div className="Profile">
            <Navbar/>
         <div className="container mt-5">
            <Grid container spacing={2}>
        <Grid item xs={12} md={6} >
                    <div className="card personalCardConfig" > 
                    <div className="card-header personalCard">
                    <h5>Personal Information</h5>
                    </div>
                    <div className="card-body personalCardBody">
                    <h5>Name: {userInfo.name}</h5>
                    <h5>Email: {userInfo.email}</h5>
                    </div>
                    </div>
                    </Grid>
                    <Grid item xs={12} md={6} >
                <div className="Profile__info__img">
                    <img src={profile}   />
                    </div>
                    </Grid>
                    </Grid>
        <h5>Recent Orders</h5>
                    <div className="Profile_Table">
            
<TableContainer component={Paper} style={{padding:'10px'}}>
           <Table aria-label="simple table">
           <TableHead>
<StyledTableRow >

<StyledTableCell align="left" >Order#</StyledTableCell>

<StyledTableCell align="left">Date</StyledTableCell>
<StyledTableCell align="left"> Product Name</ StyledTableCell>
  <StyledTableCell align="left">Quantity</StyledTableCell>
  <StyledTableCell align="left">Price</StyledTableCell>
  <StyledTableCell align="left">Total  </StyledTableCell>

               </StyledTableRow>
</TableHead>
<TableBody>

      {currentPosts.map((prod,index)=>(
         
         <StyledTableRow >
             

    <StyledTableCell align="left">{prod._id}</StyledTableCell>

<StyledTableCell align="left">{prod.timeStamp}</StyledTableCell>
    <StyledTableCell  align="left">  
    {prod.productsOrder.map(product=>{
    return    <TableRow >   
   <StyledTableCells > {product.name}</StyledTableCells>
   
   </TableRow>
    })}
  </StyledTableCell>


        <StyledTableCell  align="left">  
 {prod.productsOrder.map(product=>{
    return    <TableRow>
    <StyledTableCells > {product.qty}</StyledTableCells>
    </TableRow>
    })}
     </StyledTableCell>

     <StyledTableCell align="left" >  
 {prod.productsOrder.map(product=>{
    return    <TableRow>
    <StyledTableCells >
      PKR {product.salePrice ? product.salePrice *product.qty : product.price * product.qty}
         </StyledTableCells>
    </TableRow>
    })}
     </StyledTableCell>

     <StyledTableCell align="left"> PKR {prod.totalPrice} </StyledTableCell>


</StyledTableRow>
            
              
          
      ))}
      </TableBody>

      </Table>
  </TableContainer> 
  </div>
  <Pagination
activePage={currentPage}
itemsCountPerPage={5}
totalItemsCount={order.length}

onChange={handlePageChange}
itemClass="page-item"
linkClass="page-link "
/>
            </div>
            <Footer/>
        </div>
    )
}

export default Profile
