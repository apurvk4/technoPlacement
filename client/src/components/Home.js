import React,{useState,useEffect} from "react";

const Home=()=>{
   const [show, setShow] = useState(false);
  const [userName, setUserName]= useState('');
  const userHomePage= async()=>{
  
   try{
         const res= await fetch("/getdata", {
           method: "GET",
           headers:{
              "Content-Type":"application/json"
            },
         });
         const data=await res.json();
         console.log(data);
         setUserName(data.name);
        setShow(true);
   }catch(e){
     console.log(e);
   }
 };
useEffect(() => {
  userHomePage();
  
},[]);

  return(
    <>
      <div className="home-page  ">
         <div className="home-div text-capitalize text-center">
               <p className="pt-5">WELCOME</p>
               <h1>{userName}</h1>
              <h2>{ show? "Happy To See You Back" :"WE ARE THE MERN DEVELOPERS"}</h2>
         </div>
      </div>

    </>
  );
}
export default Home;