import React,{useEffect,useState} from "react";
import  {useHistory} from "react-router-dom";
import aboutpic from "../images/login.png";
import ranupic from "../images/login.png";
const About=()=>{
 const [userData, setUserData]= useState({});
  console.log("call about page me aaagayyaa");
 const history=useHistory();
   const callAboutPage= async()=>{
    
     try{
       console.log("call about page me aaagayyaa");
           const res= await fetch("/about", {
             method: "GET",
             headers:{
              Accept:"application/json",
              "Content-Type":"application/json"
             },
             credentials:"include"
           });
           const data=await res.json();
           console.log(data);
           setUserData(data);
           if(!res.status===200){
             const error= new Error(res.error);
             throw error; 
           }

     }catch(e){
       console.log(e);
       history.push("/login");
     }
   };
  useEffect(() => {
    callAboutPage();
    
  },[]);

  return(
    <>
       <div className=" container emp-profile text-center">
         <form method="">
           <div className="row bg-white">
             <div className="col-md-4">
               <div className="profile-img m-5">
               <img className="img-fluid h-75 w-75 text-center" src={userData.name==="ranujain"?ranupic:aboutpic} alt="anjali"></img>
          </div>
             </div>

             <div className="col-md-6 mt-5">
               <div className="profile-head text-capitalize  text-center display-6">
                 <h5>{userData.name}</h5>
                 <h6> {userData.work}</h6>
                 <p className="profile-rating mt-3 mb-5"> Ranking<span> 10/10</span></p>
              {/* tabs */}
                 <ul className="nav nav-tabs " role="tablist">
                   <li className="nav-item">
                     <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab">Active</a>
                   </li>
                   <li className="nav-item">
                   <a className="nav-link " id="profile-tab" data-toggle="tab" href="#profile" role="tab">Timeline</a>
                   </li>
               </ul>
               </div>
             </div>
             
             <div className="col-md-2 my-auto">
               <input type="submit" className="profile-edit-btn btn btn-primary mt-5" name="btnAddMore" value="Edit Profile"></input>
             </div>
           </div>
           <div className="row">
             {/* left slide url */}
             <div className="col-md-4 col-12 text-center">
               <div className="profile-work">
                 <p className="display-6 mb-5"> Work Link</p>
                 <a href="/#" target="_blank">Youtube</a><br/>
                 <a href="/#" target="_blank">instagram</a><br/>
                 <a href="/#" target="_blank">Web developer</a><br/>
                 <a href="/#" target="_blank">Linkedin</a><br/>
                 <a href="/#" target="_blank">facebook</a><br/>
                 <a href="/#" target="_blank">Youtube</a><br/>
                 <a href="/#" target="_blank">Youtube</a><br/>
               </div>
             </div>
             {/* right side div */}
             <div class="col-md-8 pl-5 about_info text-capitalize my-5  ">
               <div class="tab-content profile-tab" id="myTabConntent">
                 <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                   <div class="row">
                       <div class="col-md-6">
                         <label className="f">USER ID</label>
                       </div>
                       <div class="col-md-6">
                         <p>60934817238974-189</p>
                       </div>
                      </div>
                      <div class="row">
                       <div class="col-md-6">
                         <label>NAME</label>
                       </div>
                       <div class="col-md-6">
                         <p>{userData.name}</p>
                       </div>
                      </div>
                      <div class="row mt-3">
                       <div class="col-md-6">
                         <label>Email</label>
                       </div>
                       <div class="col-md-6">
                         <p>{userData.email} </p>
                       </div>
                      </div>
                      <div class="row mt-3">
                       <div class="col-md-6">
                         <label>phone</label>
                       </div>
                       <div class="col-md-6">
                         <p>{userData.phone}</p>
                       </div>
                      </div>
                      <div class="row mt-3">
                       <div class="col-md-6">
                         <label>Education</label>
                       </div>
                       <div class="col-md-6">
                         <p>{userData.work}</p>
                       </div>
                      </div>
               </div>
                    <div class="tab-pane fade " id="profile" role="tabpanel" aria-labelledby="profile-tab">

                      <div class="row mt-3">
                       <div class="col-md-6">
                         <label>Experience</label>
                       </div>
                       <div class="col-md-6">
                         <p>Advance</p>
                       </div>
                      </div>
                      <div class="row mt-3">
                       <div class="col-md-6">
                         <label>Hourly Rate</label>
                       </div>
                       <div class="col-md-6">
                         <p>10$/hr</p>
                       </div>
                      </div>
                      <div class="row mt-3">
                       <div class="col-md-6">
                         <label>total projects</label>
                       </div>
                       <div class="col-md-6">
                         <p>5</p>
                       </div>
                      </div>  
               </div>
             </div>
            </div>
          </div>
         </form>
       </div>
    
    </>
  );
}
export default About;