import Axios from "axios"
import Cookies from 'js-cookie'
import { history } from '../App'
import {USER_SIGNIN_FAIL,USER_SIGNIN_REQUEST,USER_SIGNIN_SUCCESS,
    USER_SIGNUP_FAIL,USER_SIGNUP_REQUEST,USER_SIGNUP_SUCCESS,USER_SIGNOUT} from '../actiontypes'
export const signin=(email,password)=>async(dispatch,getState)=>{
    dispatch({type:USER_SIGNIN_REQUEST,payload:{email,password} })

    try{
        const {data} = await Axios.post("http://localhost:3005/api/user/signin",{email,password})
        dispatch({type:USER_SIGNIN_SUCCESS,payload:data});
        console.log(data)
        const {userSignin:{userInfo}} = getState()
        Cookies.set("userInfo",JSON.stringify(userInfo))
        console.log(data)
        
    }
    catch(error){
        console.log(error)
        dispatch({type:USER_SIGNIN_FAIL,payload:error.message})
    }
}

export const Register=(name,email,password,number)=>async(dispatch,getState)=>{
    dispatch({type:USER_SIGNUP_REQUEST,payload:{name,email,password} })

    try{
        const {data} = await Axios.post("http://localhost:3005/api/user/signup",{name,email,password,number})
        dispatch({type:USER_SIGNUP_SUCCESS,payload:data});
        console.log("sas")
        console.log(history)
        history.push('/signin')
        console.log("sasss")
        
    }
    catch(error){
        console.log(error)
        dispatch({type:USER_SIGNUP_FAIL,payload:error.message})
    }
}

export const Signout=()=>dispatch=>{
      console.log("hh")
       const data = Cookies.remove('userInfo')
       console.log(data)
        dispatch({type:USER_SIGNOUT,payload:null})
    
}