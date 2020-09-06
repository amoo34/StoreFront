import { PRODUCT_LIST_REQUEST,PRODUCT_LIST_FAIL,
    PRODUCT_LIST_SUCCESS,PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,PRODUCT_DETAILS_SUCCESS} from '../actiontypes'
import axios from 'axios'
export const listProduct = () =>async(dispatch)=>{
    try{
    dispatch({type:PRODUCT_LIST_REQUEST})
    
    const {data} = await axios.get("http://localhost:3005/api/products")
    console.log(data)
    dispatch({type:PRODUCT_LIST_SUCCESS,payload:data})
}
    catch(error){
    dispatch({type:PRODUCT_LIST_FAIL,payload:error.message})
    }
}

export const detailsProduct=(id)=>async(dispatch)=>{
    console.log(id)
    try{
    dispatch({type:PRODUCT_DETAILS_REQUEST})
    const {data} = await axios.get("http://localhost:3005/api/products/"+id)
    dispatch({type:PRODUCT_DETAILS_SUCCESS,payload:data})
    }
    catch(error){
    dispatch({type:PRODUCT_DETAILS_FAIL,payload:error.message})
    }
}
