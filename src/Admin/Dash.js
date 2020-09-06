import React,{useState,useEffect} from 'react'
import "./Dash.css"
import Sidebar from './Sidebar'
import MobSidebar from './MobSidebar'
import ToggleSidebar from '../Component/ToggleSidebar'
import Grid from '@material-ui/core/Grid';
import { useMediaQuery } from 'react-responsive'
import CardDash from '../Component/CardDash'
import StoreSharpIcon from '@material-ui/icons/StoreSharp';
import ListAltSharpIcon from '@material-ui/icons/ListAltSharp';
import SettingsApplicationsSharpIcon from '@material-ui/icons/SettingsApplicationsSharp';
import ExitToAppSharpIcon from '@material-ui/icons/ExitToAppSharp';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import SmsFailedIcon from '@material-ui/icons/SmsFailed';
import Chart from 'react-apexcharts'
import CardGraph from '../Component/CardGraph'
import axios from 'axios'
import Moment from 'react-moment';
import moment from 'moment'
import DashFunction from './DashFunction'
function Dash() {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1080px)' })
    const isLap = useMediaQuery({ query: '(min-width: 1081px)' })
    const [totalOrders,setTotalOrders] = useState()
    const [totalProducts,setTotalProducts] = useState()
    const [totalRevenue,setTotalRevenue] = useState(0)
    const [totalFailedDeliveries,setTotalFailedDeliveries] = useState(0)
    const [saleData,setSaleData] = useState([])
    const [daysdata,setDaysdata] = useState([])
    const [revenueData,setRevenueData] = useState([])
    useEffect(()=>{
     const fetchData=async()=>{

     
     const {totalOrders,totalProducts,totalRevenue,saleData,daysdata,revenueData} =  await DashFunction()
     
      setTotalOrders(totalOrders)
      setTotalProducts(totalProducts)
      setTotalRevenue(totalRevenue)
      setRevenueData(revenueData)
      setSaleData(saleData)
      setDaysdata(daysdata)
     }
     fetchData()
    },[])

    const Saleoptions = {
        chart: {
          id: 'apexchart-example'
        },
        xaxis: {
          categories: daysdata,
          labels: {
          style: {
            colors: '#FFFFFF',
            fontSize: '12px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 400,
            cssClass: 'apexcharts-xaxis-label',
        }
    }
        },
        yaxis:{
            labels: {
                style: {
                  colors: '#FFFFFF',
                  fontSize: '12px',
                  fontFamily: 'Helvetica, Arial, sans-serif',
                  fontWeight: 400,
                  cssClass: 'apexcharts-xaxis-label',
              }
          }
        },
        fill: {
            colors: '#FFFFFF'
          },
          markers: {
            colors: 'yellow'
         },
         dataLabels: {
            enabled:false

}
      }
     const  Saleseries = [{
        name: 'Sales',
        data: saleData,
       
      }]
   


      const Revenueoptions = {
        chart: {
          id: 'apexchart-example'
        },
        xaxis: {
          categories:daysdata,
          labels: {
          style: {
            colors: '#FFFFFF',
            fontSize: '12px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 400,
            cssClass: 'apexcharts-xaxis-label',
        }
    }
        },
        yaxis:{
            labels: {
                style: {
                  colors: '#FFFFFF',
                  fontSize: '12px',
                  fontFamily: 'Helvetica, Arial, sans-serif',
                  fontWeight: 400,
                  cssClass: 'apexcharts-xaxis-label',
              }
          }
        },
        fill: {
            colors: '#FFFFFF'
          },
          markers: {
            colors: 'blue'
         },
         dataLabels: {
            enabled:false

},
    colors:['#FFFFFF']
      }
     const  Revenueseries = [{
        name: 'Revenue',
        data: revenueData,
       
      }]
     
      const Subscription = {
        chart: {
          id: 'apexchart-example'
        },
        xaxis: {
          categories: daysdata,
          labels: {
          style: {
            colors: '#FFFFFF',
            fontSize: '12px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 400,
            cssClass: 'apexcharts-xaxis-label',
        }
    }
        },
        yaxis:{
            labels: {
                style: {
                  colors: '#FFFFFF',
                  fontSize: '12px',
                  fontFamily: 'Helvetica, Arial, sans-serif',
                  fontWeight: 400,
                  cssClass: 'apexcharts-xaxis-label',
              }
          }
        },
        fill: {
            colors: '#FFFFFF'
          },
          markers: {
            colors: 'yellow'
         },
         dataLabels: {
            enabled:false

}
      }
     const  Saleserie = [{
        name: 'Sales',
        data: [0,0,0,0,0,0,0],
       
      }]
   
    return (
        <div className="Dash">
          {isLap &&          <Sidebar />}
          {isTabletOrMobile &&      <MobSidebar />}
            <div className="DashScreen" >
            <div className="toggler">
          {isTabletOrMobile &&  <ToggleSidebar classIs=".DashScreen"/> }<p> Sidebar</p> 
          </div>
            <Grid container spacing={3} style={{marginTop:'50px'}}>
           
                <Grid item md={3} xs={12}>
            <CardDash detail="Total Orders are:" title="Orders" info={totalOrders} Color="#2E4295" Img={ListAltSharpIcon} />
            </Grid>
            <Grid item md={3} xs={12}>
            <CardDash detail="Registered Products are:" info={totalProducts} title="Products" Color="#EC9603" Img={StoreSharpIcon}/>
            </Grid>
            <Grid item md={3} xs={12}>
            <CardDash detail="Revenue Generated:" info={"Rs  "+totalRevenue} title="Revenue" Color="green" Img={MonetizationOnIcon}/>
            </Grid>
            <Grid item md={3} xs={12}>
            <CardDash detail="Failed Deliveries:" info={totalFailedDeliveries} title="Return" Color="#F24343" Img={SmsFailedIcon}/>
            </Grid>
            </Grid>
            <Grid container spacing={4} style={{marginTop:'50px'}}>
                <Grid item md={4} xs={12}>
               
            <CardGraph Graphoptions={Saleoptions}  Graphseries={Saleseries} Graphtype="bar"
                BackgroundColor="#40C363" title="Daily Sales"
            />
            </Grid>
            <Grid item md={4} xs={12}>
            <CardGraph Graphoptions={Revenueoptions} Graphseries={Revenueseries} Graphtype="line"
            BackgroundColor="#EC9603" title="Daily Revenue"
            />
            </Grid>
            <Grid item md={4} xs={12}>
            <CardGraph Graphoptions={Subscription} Graphseries={Saleserie} Graphtype="bar"
            BackgroundColor="#F24343"  title="Daily Subscriptions"
            />
            </Grid>
            </Grid>
            </div>
        </div>
    )
}

export default Dash
