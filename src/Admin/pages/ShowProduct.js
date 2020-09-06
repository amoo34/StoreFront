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

function ShowProduct() {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1080px)' })
    const isLap = useMediaQuery({ query: '(min-width: 1081px)' })

    const [products,setProducts] = useState([])
    const [currentPage,setCurrentPage] = useState(1)
    const [postPerPage,setPostPerPage] = useState(8)
    useEffect(()=>{
        const fetchData=async()=>{
            const {data} =  await axios.get("http://localhost:3005/api/products")
          
       
            setProducts(data)
            
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
      const currentPosts = products.slice(indexOfFirstPost,indexOfLastPost)
      const presrc = "http://localhost:3005/";
    return (
        <div className="OrderList">
        {isLap &&          <Sidebar />}
{isTabletOrMobile &&      <MobSidebar />}
<div className="OrderList_Screen">
<div className="toggler">
{isTabletOrMobile &&  <ToggleSidebar classIs=".DashScreen"/> } <p> Sidebar</p> 
</div>
<div className="OrdetList_Heading">
<h2>My Products</h2>
</div>
<div className="OrderList_Table">

<TableContainer component={Paper} style={{padding:'10px'}}>
    <Table aria-label="simple table">
    <TableHead>
<StyledTableRow >


<StyledTableCell align="center">Image</StyledTableCell>
<StyledTableCell align="center">Product Name</StyledTableCell>
<StyledTableCell align="center"> Brand</ StyledTableCell>
<StyledTableCell align="center">Stock</StyledTableCell>
<StyledTableCell align="center">Price</StyledTableCell>



        </StyledTableRow>
</TableHead>
<TableBody>

{currentPosts.map((order,index)=>(
  
  <StyledTableRow >
      

<StyledTableCell align="center"><img src={presrc+order.productImage} width="120px" height="100px" /></StyledTableCell>

<StyledTableCell align="center">{order.name}  </StyledTableCell>
<StyledTableCell align="center">{order.brand}</StyledTableCell>
<StyledTableCell  align="center"> {order.stock} </StyledTableCell>

<StyledTableCell align="center"> PKR {order.price} </StyledTableCell>




</StyledTableRow>
     
       
   
))}
</TableBody>

</Table>
</TableContainer> 
</div>
<div className="OrdetList_Pagination">
<Pagination
activePage={currentPage}
itemsCountPerPage={8}
totalItemsCount={products.length}

onChange={handlePageChange}
itemClass="page-item"
linkClass="page-link "
/>
</div>
</div>
</div>
    )
}

export default ShowProduct
