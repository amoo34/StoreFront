import React,{useState,useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import "./OrderList.css"
import { useMediaQuery } from 'react-responsive'
import Sidebar from '../Sidebar'
import ToggleSidebar from '../../Component/ToggleSidebar'
import MobSidebar from '../MobSidebar'
import axios from 'axios'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Pagination from "react-js-pagination";
function OrderList() {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1080px)' })
    const isLap = useMediaQuery({ query: '(min-width: 1081px)' })
    const [order,setOrder] = useState([])
    const [currentPage,setCurrentPage] = useState(1)
    const [postPerPage,setPostPerPage] = useState(6)
    useEffect(()=>{
        const fetchData=async()=>{
            const {data} =  await axios.get("http://localhost:3005/api/order")
            const sortedCars1 = data.sort((a, b) => new Date(a.timeStamp) - new Date(b.timeStamp));
       
            setOrder(sortedCars1.reverse())
            
        }
        fetchData()
    },[])
    const StyledTableCell = withStyles((theme) => ({
        head: {
          backgroundColor: theme.palette.primary.dark,
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
        <div className="OrderList">
                         {isLap &&          <Sidebar />}
          {isTabletOrMobile &&      <MobSidebar />}
          <div className="OrderList_Screen">
          <div className="toggler">
          {isTabletOrMobile &&  <ToggleSidebar classIs=".DashScreen"/> } <p> Sidebar</p> 
          </div>
        <div className="OrdetList_Heading">
            <h2>Orders</h2>
        </div>
        <div className="OrderList_Table">

          <TableContainer component={Paper} style={{padding:'10px'}}>
                     <Table aria-label="simple table">
                     <TableHead>
          <StyledTableRow >

          <StyledTableCell align="left" >Order ID</StyledTableCell>
          <StyledTableCell align="left">Customer Email</StyledTableCell>
          <StyledTableCell align="left">Date</StyledTableCell>
          <StyledTableCell align="left"> Product Name</ StyledTableCell>
            <StyledTableCell align="left">Quantity</StyledTableCell>
            <StyledTableCell align="left">Price</StyledTableCell>
            <StyledTableCell align="left">Total  </StyledTableCell>
            <StyledTableCell align="left">Delivery</StyledTableCell>
          
                         </StyledTableRow>
        </TableHead>
        <TableBody>

                {currentPosts.map((order,index)=>(
                   
                   <StyledTableRow >
                       
       
              <StyledTableCell align="left">{order._id}</StyledTableCell>

    <StyledTableCell align="left">{order.Uemail}  </StyledTableCell>
    <StyledTableCell align="left">{order.timeStamp}</StyledTableCell>
              <StyledTableCell  align="left">  
              {order.productsOrder.map(product=>{
              return    <TableRow >   
             <StyledTableCells > {product.name}</StyledTableCells>
             
             </TableRow>
              })}
            </StyledTableCell>


                    <StyledTableCell  align="left">  
           {order.productsOrder.map(product=>{
              return    <TableRow>
              <StyledTableCells > {product.qty}</StyledTableCells>
              </TableRow>
              })}
               </StyledTableCell>


               <StyledTableCell align="left" >  
           {order.productsOrder.map(product=>{
              return    <TableRow>
              <StyledTableCells >
                PKR {product.salePrice ? product.salePrice *product.qty : product.price * product.qty}
                   </StyledTableCells>
              </TableRow>
              })}
               </StyledTableCell>

               <StyledTableCell align="left"> PKR {order.totalPrice} </StyledTableCell>

  
              <StyledTableCell align="left" >  {order.delivery} </StyledTableCell>
           


 </StyledTableRow>
                      
                        
                    
                ))}
                </TableBody>

                </Table>
            </TableContainer> 
            </div>
            <div className="OrdetList_Pagination">
            <Pagination
          activePage={currentPage}
          itemsCountPerPage={6}
          totalItemsCount={order.length}
       
          onChange={handlePageChange}
          itemClass="page-item"
            linkClass="page-link "
        />
        </div>
        </div>
        </div>
    )
}

export default OrderList
