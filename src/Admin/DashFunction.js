import axios from 'axios'
const DashFunction =async()=>{
    const allData ={totalOrders:0,totalProducts:0,totalRevenue:0,saleData:[],daysdata:[]}
let Revenue = 0
console.log("inside")
      const order = await  axios.get("http://localhost:3005/api/order")
      const products = await axios.get("http://localhost:3005/api/products")
      console.log("inside")
      await axios.all([order,products])
      .then(axios.spread((...res)=> {
      
        res[0].data.map((order=> Revenue+=order.totalPrice))
     
       
      
        let sortedOrders = res[0].data.sort((a, b) => new Date(b.timeStamp) - new Date(a.timeStamp));        
    
        var ourDate = new Date();
    
        const currentDate = ourDate.getMonth()+1+'/'+ourDate.getDate()+'/'+ourDate.getFullYear()
        const sixthDay = ourDate.getMonth()+1+'/'+(ourDate.getDate()-1)+'/'+ourDate.getFullYear()
        const fifthDay = ourDate.getMonth()+1+'/'+(ourDate.getDate()-2)+'/'+ourDate.getFullYear()
        const forthDay = ourDate.getMonth()+1+'/'+(ourDate.getDate()-3)+'/'+ourDate.getFullYear()
        const thridDay = ourDate.getMonth()+1+'/'+(ourDate.getDate()-4)+'/'+ourDate.getFullYear()
        const secondDay = ourDate.getMonth()+1+'/'+(ourDate.getDate()-5)+'/'+ourDate.getFullYear()
        const firstDay = ourDate.getMonth()+1+'/'+(ourDate.getDate()-6)+'/'+ourDate.getFullYear()
      
        
        const currentDayOrder = sortedOrders.filter(order=>order.timeStamp === currentDate)
        const sixthDayOrder = sortedOrders.filter(order=>order.timeStamp === sixthDay)
        const fifthDayOrder = sortedOrders.filter(order=>order.timeStamp === fifthDay)
        const forthDayOrder = sortedOrders.filter(order=>order.timeStamp === forthDay)
        const thirdDayOrder = sortedOrders.filter(order=>order.timeStamp === thridDay)
        const secondDayOrder = sortedOrders.filter(order=>order.timeStamp === secondDay)
        const firstDayOrder = sortedOrders.filter(order=>order.timeStamp === firstDay)

        let currentDayRevenue = 0
        console.log(currentDayOrder[0].totalPrice)
         currentDayOrder.map(order=>
            
            currentDayRevenue += order.totalPrice
            )
        
        let sixthDayRevenue = 0
         sixthDayOrder.map(order=>
            sixthDayRevenue += order.totalPrice
            
            )

        let fifthDayRevenue = 0 
         fifthDayOrder.map(order=>
            fifthDayRevenue += order.totalPrice
                )
        
        let forthDayRevenue = 0
         forthDayOrder.map(order=>
            forthDayRevenue += order.totalPrice
            )

        let thirdDayRevenue = 0
         thirdDayOrder.map(order=>
            thirdDayRevenue += order.totalPrice
                )

        let secondDayRevenue = 0
         secondDayOrder.map(order=>
            secondDayRevenue += order.totalPrice
                )

        let firstDayRevenue = 0
        firstDayOrder.map(order=>
            firstDayRevenue += order.totalPrice
                )

        const revenueData = [firstDayRevenue,secondDayRevenue,thirdDayRevenue,forthDayRevenue,fifthDayRevenue,sixthDayRevenue,currentDayRevenue]

        console.log(revenueData)
        let actualIndex = 0
        let day = []
        var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
        [...Array(7)].map((val,index)=>{
          let dayIs 
          actualIndex = ourDate.getDay() - index
          console.log("inside")
          if(actualIndex < 0)
          {
            console.log("inside If")
            dayIs = days[actualIndex + 7]
          }
          else
          {
            console.log("inside else")
             dayIs =  days[actualIndex]
          }
            day.push(dayIs)
            console.log(day)
        })
  
        
        let sale = []
        sale.push(firstDayOrder.length,secondDayOrder.length,thirdDayOrder.length,forthDayOrder.length,fifthDayOrder.length,sixthDayOrder.length,currentDayOrder.length)
        console.log(res[0].data.length)
      
            allData.totalOrders = res[0].data.length
            allData.totalProducts = res[1].data.length
            allData.totalRevenue = Revenue
            allData.saleData = sale
            allData.daysdata = day.reverse()
            allData.revenueData = revenueData
            console.log(allData)
      }))
      .catch(error=>{

      })
      return allData
      }

      export default DashFunction