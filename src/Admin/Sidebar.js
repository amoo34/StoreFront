import React,{useEffect} from 'react'
import "./Sidebar.css"
import {Signout} from '../actions/userActions'
import { useMediaQuery } from 'react-responsive'
import DashboardSharpIcon from '@material-ui/icons/DashboardSharp';
import StoreSharpIcon from '@material-ui/icons/StoreSharp';
import ListAltSharpIcon from '@material-ui/icons/ListAltSharp';
import SettingsApplicationsSharpIcon from '@material-ui/icons/SettingsApplicationsSharp';
import ExitToAppSharpIcon from '@material-ui/icons/ExitToAppSharp';
import {Link,withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {useSelector,useDispatch} from 'react-redux'
function Sidebar(props) {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 700px)' })
    const userSignin = useSelector(state=>state.userSignin)
    const dispatch = useDispatch()
    const {userInfo} = userSignin
    useEffect(() => {
        console.log(userInfo)
        if(userInfo)
        {
            console.log(userInfo)
            if(userInfo.isAdmin)
            {
           
            }
            else
            {
                props.history.push("/")
            }
        }
        else{
            props.history.push("/")
        }
    }, [userInfo])
    const logout=()=>{
        console.log("sad")
        dispatch(Signout())
       
    }
    return (
        
        <div className="Sidebar">

            <div className="Sidebar_Header">
            <h3>Abdul's Store</h3>
    
            </div>
            <div className="Sidebar_List" >
                <ul>
                    <li><Link to="/admin"> <span> <DashboardSharpIcon/></span>Dashboard</Link></li>
                    <li><Link to="/addProduct"><span><StoreSharpIcon/></span>Add Products</Link> </li>
                    <li><Link to="/showProduct"><span><SettingsApplicationsSharpIcon/></span>My Products</Link> </li>
                    <li><Link to="/orderList"><span><ListAltSharpIcon/></span>Orders</Link></li>
                  
                    <li onClick={logout}><Link ><span><ExitToAppSharpIcon /></span>Logout</Link></li>
                </ul>
            </div>
        </div>
     
    )
}

export default withRouter(Sidebar)
