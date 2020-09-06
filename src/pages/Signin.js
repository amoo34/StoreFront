import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import './Signin.css'
import {withRouter,Link} from 'react-router-dom'
import {signin} from '../actions/userActions'
import Navbar from '../Component/Navbar'
import Footer from '../Component/footer'
function Signin(props) {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const dispatch = useDispatch()
    const userSignin = useSelector(state=>state.userSignin)
    const {loading,userInfo,error} = userSignin
    console.log(props.location.search)
    const redirect = props.location.search?props.location.search.split('=')[1]:'/'
    useEffect(() => {
        console.log(userInfo)
        if(userInfo)
        {
            console.log(userInfo)
            if(userInfo.isAdmin)
            {
            props.history.push("/admin")
            }
            else
            {
                props.history.push(redirect)
            }
        }
    }, [userInfo])
    const submitHandler=(e)=>{
        e.preventDefault()
        console.log(email,password)
        dispatch(signin(email,password))
    }
    return (
        <div>
            <Navbar />
        
        <div className="signinPage">
      
         <form className="form-signin" onSubmit={submitHandler} >   
       <center>  <h4 className="mb-3">SignIn</h4> </center>
        {loading && <div>Loading.....</div>}
      

 <div className="form-group" id="emails">
     <label>Email</label>
  <input type="text" id="email"  onChange={e=>setEmail(e.currentTarget.value)} className="form-control" name="email" placeholder="Email Address"  autofocus="" />
 </div>

  <div className="form-group">
  <label>Password</label>
        <input   type="password" id="pass" onChange={e=>setPassword(e.currentTarget.value)} className="form-control" name="password" placeholder="Password" />      
    </div> 
        <button className="btn  btn-primary btn-block siginB"  type="submit">Login</button>   
       <center> {error && <div style={{marginTop:'20px',color:'red'}}>Invalid Email or Password</div>}</center>
        <div className="signin_not">
       
   <p  >New to MoizStore?</p>
   <button className="btn  btnjoin"  ><Link to={redirect === '/' ? 'signup' : 'signup?redirect='+redirect}>Create Account</Link></button>   
   </div>

</form>
        </div>
        <Footer/>
        </div>
    )
}

export default withRouter(Signin)