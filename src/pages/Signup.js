import React,{useEffect,useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import './Signup.css'
import {withRouter,Link} from 'react-router-dom'
import {Register} from '../actions/userActions'
import Navbar from '../Component/Navbar'
import Cookie from 'js-cookie'
import Footer from '../Component/footer'
function Signup(props) {
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [number,setNumber] = useState("")
    const dispatch = useDispatch()
    const userRegister = useSelector(state=>state.userRegister)
    const {loading,userInfo,error,success} = userRegister
    const redirect = props.location.search?props.location.search.split('=')[1]:'/'
    const redirects = props.location.search?props.location.search.split('=')[0]:'/'
    useEffect(() => {
        console.log(userInfo)
        if(userInfo)
        {

        }
        console.log(loading)
    }, [userInfo])
    const submitHandler=(e)=>{
        e.preventDefault()
    
 dispatch(Register(name,email,password,number))
       
     
    }
    console.log(loading)
    console.log(userInfo)
    return (
        <div>
            <Navbar />
             <div className="signinPage">
      
      <form className="form-signin" onSubmit={submitHandler} >   
    <center>  <h4 className="mb-3">Create an Account</h4> </center>
     {loading && <div>Loading.....</div>}
     {error && <div>Invalid Email or Already registered</div>}
     <div className="form-group" id="emails">
  <label>Name</label>
<input type="text" id="email"  onChange={e=>setName(e.currentTarget.value)} className="form-control" name="name" placeholder="Name"  autofocus="" />
</div>
<div className="form-group" id="emails">
  <label>Email</label>
<input type="text" id="email"  onChange={e=>setEmail(e.currentTarget.value)} className="form-control" name="email" placeholder="Email Address"  autofocus="" />
</div>

<div className="form-group">
<label>Number</label>
     <input   type="text" id="pass" onChange={e=>setNumber(e.currentTarget.value)} className="form-control" name="number" placeholder="Phone Number" />      
 
     </div> 

<div className="form-group">
<label>Password</label>
     <input   type="password" id="pass" onChange={e=>setPassword(e.currentTarget.value)} className="form-control" name="password" placeholder="Password" />      
 
     </div> 
     <button className="btn  btn-primary btn-block siginB"  type="submit">Signup</button>   
     <div className="signin_not">
<p  >Already have an Account</p>
<button className="btn  btnjoin"  ><Link to={redirect === '/' ? 'signin' : 'signin?redirect='+redirect} >Signin</Link></button>   
</div>

</form>
     </div>
     <Footer/>
        </div>
    )
}

export default withRouter(Signup)
