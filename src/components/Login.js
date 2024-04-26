import React,{useState,useContext} from 'react'
import { useNavigate } from "react-router-dom";
import noteContext from '../context/notecontext';


const Login = (props) => {
    const [userdata, setuserdata] = useState({email:"",passsword:""});
    const login=useContext(noteContext)
    const {setlogin}=login
    let history=useNavigate();


    const handlesubmit= async(e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYxMzk5Y2E3MWM0YTY2YzMwYjViZDBjIn0sImlhdCI6MTcxMjU2Mjc5MX0.YV_G7CMaDPC0cucbbi7a_KISzntU3pWVcSmZXCOdXYY"
            },
            body:JSON.stringify(userdata)

          });
          const json=await response.json();
          console.log(json)
          if(json.success){
            localStorage.setItem('token',json.authtoken)
            history('/');
            setlogin(true)
            props.showalert("login successfull","success")

          }
          else{
            props.showalert("login unsuccessfull","danger")

          }
        }
        const updateuserdata=(e)=>{
            setuserdata({...userdata,[e.target.name]:e.target.value})
        }
  return (
<>
<form onSubmit={handlesubmit} className=' container my-5'>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email</label>
    <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={updateuserdata}/>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name='password' onChange={updateuserdata}/>
  </div>
  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
</>
  )
}


export default Login
