import {ORDERFAIL,ORDERREQUEST,ORDERSUCCESS} from '../actiontypes'
export const orderConfirm=(state={},action)=>{
    switch (action.type){
        case ORDERREQUEST:
            return {loading:true}
        case ORDERSUCCESS:
            return {loading:false, orderDetail:action.payload}
        case ORDERFAIL:
            return {loading:false,error:action.payload}
        default:
            return state
}
}