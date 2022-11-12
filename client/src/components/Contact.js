import React,{useEffect,useState} from "react";



const Contact=()=>{
  const [userData, setUserData]= useState({name:"",email:"",phone:"",message:""});
    const userContact= async()=>{
    
     try{
           const res= await fetch("http://localhost:5500/getdata", {
             method: "GET",
             headers:{
                "Content-Type":"application/json"
              },
           });
           const data=await res.json();
           console.log(data);
           setUserData({...userData,name:data.name, email:data.email,phone:data.phone});
           if(!res.status===200){
             const error= new Error(res.error);
             throw error; 
           }

     }catch(e){
       console.log(e);
     }
   };
  useEffect(() => {
    userContact();
    
  },[]);

  //we are storing data in states

  const handleInputs=(e)=>{
 
      const name=e.target.name;
      const value=e.target.value;
      setUserData({...userData, [name]:value});
  };

  //sending data to backend

  const contactForm=async(e)=>{
    e.preventDefault();
console.log("contanct page me aagya");
    const {name,email,phone,message}=userData;
     const res= await fetch("/contact",{
       method:"POST",
       headers:{
         "Content-Type":"application/json",
       },
       body:JSON.stringify({
           name,email,phone,message
       })
     });
     const data= await res.json();

     if(!data){
       console.log("message not sent");
     }else{
       alert("message sent sucessfully");
       setUserData({...userData,message:""});
     }


  }

    return(
     <>
       <div className="title2" id="feedBACK">
		      <span>Give Feedback</span>
		      <div class="shortdesc2">
			      <p>Please share your valuable feedback to us</p>
		      </div>
	     </div>

	<div className="feedbox">
		<div className="feed">
			<form method="POST" enctype="text/plain">
				
        <label>Your Name</label><br/>
				<input type="text" id="contact_form_name" 
               name="name"
               onChange={handleInputs}
               value={userData.name}
               placeholder="Your Name"
               required="true">
        </input>

				<label>Email</label><br/>
				<input type="email" id="contact_form_email" 
               name="email"
               onChange={handleInputs}
               value={userData.email}
               placeholder="Your Email" required="true">
        </input>
        <label>your Phone No.</label><br/>
        <input type="number" id="contact_form_phone "
               name="phone"
               onChange={handleInputs}
               value={userData.phone}
               placeholder="Phone Number" required="true">
         </input>
             

				<label>Additional Details</label><br/>
        <textarea 
              name="message"
              onChange={handleInputs}
              value={userData.message}
              placeholder="Type Your Message Here" cols="30" rows="5">
        </textarea>
        <button type="submit" id="csubmit" 
             onClick={contactForm}>
             Send
        </button>
			</form>
		</div>
	</div>
</> 
);
}
export default Contact;