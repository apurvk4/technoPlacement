import React, { useState,useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import login from "../images/login.png"; 
import { UserContext } from "../App";

const Login=()=>{

 const {state, dispatch} = useContext(UserContext);
  const history=useHistory();
  const [email, setEmail]=useState("");
  const [password, setPassword]=useState("");

  const loginUser= async (e)=>{
    e.preventDefault();
    const url = process.env.REACT_APP_USER_SIGNIN;
     const  res=await fetch(url,{
       method:"POST",
       credentials : "include",
       headers:{
         "Content-Type":"application/json"
        },  body:JSON.stringify({
          email,password
        })
     });
     const data=await res.json();          // To get the pending stage data
     if(!data||res.status===400){
       window.alert("Invalid Credentials");
     }else{
       dispatch({type:"USER",payload:true})
       window.alert("Login successful");
       history.push("./");
     }
  }


  return(
    <>
{

/*
			<div class="other" id="other">
				<div class="instead">
					<h3>or</h3>
				</div>
				<button class="connect" onclick="google()">
					<img src="images/icon/google.png"><span>Sign in with Google</span>
				</button>
			</div>
     */}

     <div className="form-box">
     <div class="button-box">
				<div id="btn"></div>
        <NavLink to="/login" className="toggle-btn text-capitalize log " >Login </NavLink>
        <NavLink to="/signup" className="toggle-btn text-capitalize reg"  >Register</NavLink>
		 </div>
			
    
              <form  method="POST" className="input-group" id="register-form">
                 
                   <div className="inp">
                        <label htmlFor="email">
                          <i class="zmdi zmdi-email material-icons-name"></i>
                        </label>
                      <input type="text" name="email" id="email" className="input-field"
                      value={email}
                      onChange={(e)=>setEmail(e.target.value)}
                      autoComplete="off" placeholder="Email"></input>
                   </div>
                   
                   <div className="inp">
                     <label htmlFor="password">
                      <i class="zmdi zmdi-lock material-icons-name"></i>
                     </label>
                     <input type="password" name="password" id="password" autoComplete="off" className="input-field"  
                     value={password}
                     onChange={(e)=>setPassword(e.target.value)}
                     placeholder="Password"></input>
                   </div>
                   
                   <div className="submit-btn">
                       <input type="submit" name="signin" 
                       onClick={loginUser}
                       className="btn" value="Log in"/>
                   </div>
             </form>

             <div className="other" id="other">
				<div className="instead">
					<h3>or</h3>
				</div>
				<button className="connect" onclick="google()">
					<span>Sign in with Google</span>
				</button>
			</div>
      </div>
  </>
  );
}
export default Login;