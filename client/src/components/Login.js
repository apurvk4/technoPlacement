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
     const  res=await fetch('/signin',{
       method:"POST",
       headers:{
         "Content-Type":"application/json"
        },  body:JSON.stringify({
          email,password
        })
     });
     const data=res.json();          // To get the pending stage data
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
     <section className="sign-in  container">
      <div className="container mt-5">
        <div className="signin-content   w-75 mx-auto row container my-auto">
                  <div className="signin-image col-lg-6 col-md-6 col-12">
                     <figure className="w-50  mx-auto img-fluid">
                       <img className="w-100" src={login} alt="registration pic"/>
                       </figure>
                       <div className="image-link  my-5 text-center display-5">
                     <NavLink to="/signup" className="signin-image-link  my-5 display-6 text-center text-capitalize" >Create an account
                     </NavLink>
                     </div>
                 </div>
    
          <div className="signin-form col-lg-6 col-md-6 col-12">
                <div className=" form-title text-center text-capitalize display-3"> sign in</div>
              <form  method="POST" className="register-form  text-center" id="register-form">
                 
                   <div className="form-group  mx-auto mb-4">
                        <label htmlFor="email">
                          <i class="zmdi zmdi-email material-icons-name"></i>
                        </label>
                      <input type="text" name="email" id="email" 
                      value={email}
                      onChange={(e)=>setEmail(e.target.value)}
                      autoComplete="off" placeholder="enter your email"></input>
                   </div>
                   
                   <div className="form-group mx-auto mb-4">
                     <label htmlFor="password">
                      <i class="zmdi zmdi-lock material-icons-name"></i>
                     </label>
                     <input type="password" name="password" id="password" autoComplete="off"
                     value={password}
                     onChange={(e)=>setPassword(e.target.value)}
                     placeholder="enter your password"></input>
                   </div>
                   
                   <div className="form-group btn  pt-4 form-button">
                       <input type="submit" name="signin" id="signin" 
                       onClick={loginUser}
                       className="form-submit" value="Log in"/>
                   </div>
             </form>
         </div>
       </div>
     </div>
  </section>  
 </>
  );
}
export default Login;