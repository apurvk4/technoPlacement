import React,{useState} from "react";
import { NavLink ,useHistory} from "react-router-dom";

const SignUp=()=>{
  const history=useHistory();
  const [user, setUser] = useState({
   name:"",email:"", phone:"",work:"",password:"",cpassword:""});
 let name,value;
  const handleInputs=(e)=>{
    console.log(e);
    name=e.target.name;
    value=e.target.value;

    setUser({...user,[name]:value});
 }

const PostData = async(e)=>{
  e.preventDefault();
  const{name,email,phone,work,password,cpassword}=user;
   const res=await fetch("/register" ,{
     method:"POST",
     headers:{ "Content-Type": "application/json"},
     body:JSON.stringify({name,email,phone,work,password,cpassword
       })
   }); 

   const data = await res.json();
   if(data.status === 422|| !data){
     window.alert("Invalid Registration");
     console.log("Invalid Registration");
   }else{
    window.alert("Registration Successful");
    console.log("Registration Successful");
    history.push("/login");
   }
}

  return(
    <>
    
        <div className="form-box">
        <div class="button-box">
				<div id="btn"></div>
        <NavLink to="/login" className="toggle-btn text-capitalize log " >Login </NavLink>
        <NavLink to="/signup" className="toggle-btn text-capitalize reg"  >Register</NavLink>
			  </div>
 
            <form method="POST" className="input-group" id="register-form">
                  <div className="inp">
                      <label  htmlFor="name">
                        <i class="zmdi zmdi-account material-icons-name "></i>
                      </label>
                        <input type="text" name="name" id="name" autoComplete="off" className="input-field"
                        value={user.name}
                        onChange={handleInputs}
                        placeholder="Name"></input>
                  </div>

                  <div className="inp">
                       <label htmlFor="email">
                         <i class="zmdi zmdi-email material-icons-name"></i>
                       </label>
                         <input type="text" name="email" id="email" autoComplete="off" className="input-field"
                         value={user.email}
                         onChange={handleInputs}
                         placeholder="Email"></input>
                  </div>

                  <div className="inp ">
                       <label htmlFor="phone">
                         <i class="zmdi zmdi-phone-in-talk material-icons-name"></i>
                       </label>
                         <input type="text" name="phone" id="phone" autoComplete="off" className="input-field"
                         value={user.phone}
                         onChange={handleInputs}
                         placeholder="enter your phoneNo"></input>
                  </div>
                   
                  <div className="inp ">
                       <label htmlFor="password">
                         <i class="zmdi zmdi-lock material-icons-name"></i>
                       </label>
                         <input type="text" name="password" id="password" autoComplete="off" className="input-field"
                         value={user.password}
                         onChange={handleInputs}
                         placeholder="enter your password"></input>
                  </div>

                  <div className="inp ">
                       <label htmlFor="cpassword">
                         <i class="zmdi zmdi-lock material-icons-name"></i>
                       </label>
                         <input type="text" name="cpassword" id="cpassword" autoComplete="off" className="input-field"
                         value={user.cpassword}
                         onChange={handleInputs}
                         placeholder="confirm your password"></input>
                  </div>
                   
                   <div className="inp  submit-btn">
                         <input type="submit" name="signup" id="signup" className=" btn text-center"
                         onClick={PostData}
                         value="register"/>
                   </div>

             </form>
      
                                    
                  
           
        
    </div>  
    </>
  );
}
export default SignUp;