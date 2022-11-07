import React,{useEffect,useState} from "react";



const Contact=()=>{
  const [userData, setUserData]= useState({name:"",email:"",phone:"",message:""});
    const userContact= async()=>{
    
     try{
           const res= await fetch("/getdata", {
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
       {/* <div className="contact_info container h-25 ">
          <div className="container-fluid contact-part-1">
             <div className="row h-25">
               <div className="  offset-lg-1 cont d-flex justify-content-around"> */}
                  {/*  for phone no */}
                  {/* <div className="contact_info_item  my-3 h-25 col-lg-4 col-md-3 col-3 d-flex">
                       <img src={phone}  className=" contactImg img-fluid col-6" alt="phone"></img>
                         <div className="contact_info_content col-6">
                            <div className="contact_info_title"> Phone</div>
                            <div className="contact_info_text"> 6377673056 </div>
                         </div>
                  </div> */}

                    {/* for email */}
                    {/* <div className="contact_info_item  my-3 h-25 col-lg-4 col-md-3 col-3  d-flex">
                       <img src={email} classname=" img-fluid contactImg col-6 " alt="email"></img>
                         <div className="contact_info_content col-5">
                            <div className="contact_info_title text-center"> Email</div>
                            <div className="contact_info_text"> anjali@gmail.com</div>
                         </div>
                  </div> */}

                    {/* for address */}
                    {/* <div className="contact_info_item  my-3 h-25 col-lg-4 col-md-3 col-3   d-flex">
                      <img src={address} classname=" img-fluid contactImg col-6 "alt="address"></img>
                         <div className="contact_info_content col-5">
                            <div className="contact_info_title ">Address</div>
                            <div className="contact_info_text"> JAIPUR</div>
                         </div>
                  </div> */}
               {/* </div>
             </div>
          </div>
       </div>  */}

     
               {/* Contact us fdorm */}
               <div className="Contact_form  mt-5">
                 <div className="container con-page ">
                   <div className="row  ">
                       <div className="col-lg-10 d-flex  justify-content-around offset-lg-1">
                         <div className="contact_form_container row mt-5">
                           <div className="contact-form-title  text-center display-4">Get In Touch</div>
                           <form method="POST" id="contact_form">
                             <div className="contact_form_name row d-flex justify-content-around align-items-center">
                              <input type="text" id="contact_form_name" 
                              className="contact_form_name input_field col-lg-3 col-10 m-2 pr-1"
                             name="name"
                              onChange={handleInputs}
                              value={userData.name}
                             placeholder="your name" required="true"></input>

                              <input type="email" id="contact_form_email" 
                              className="contact_form_email  col-lg-3 col-10 m-2 pr-1 input_field"
                             name="email"
                              onChange={handleInputs}
                              value={userData.email}
                             placeholder="your email" required="true"></input>

                             <input type="number" id="contact_form_phone "
                             className="contact_form_phone col-lg-3 col-10 m-2 pr-1   input_field"
                             name="phone"
                             onChange={handleInputs}
                             value={userData.phone}
                             placeholder="your phone number" required="true"></input>
                             </div>
                           
                           <div className="contact_form_text row-cols-1 mt-5">
                             <textarea className="text_field   col-12 contact_form_message" 
                             name="message"
                             onChange={handleInputs}
                             value={userData.message}
                             placeholder="Type Your Message Here" cols="30" rows="5"></textarea>
                           </div>

                         <div className="contact_form_button  my-5 text-center ">
                           <button type="submit" className="button contact_form_submit_button btn btn-primary "
                           onClick={contactForm}>
                           Send
                           </button>
                           </div>   
                        </form>

                         </div>
                       </div>
                   </div>
                 </div>
               </div>
    </>
  );
}
export default Contact;