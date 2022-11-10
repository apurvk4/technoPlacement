import React, { useEffect,useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../App";


const Logout=()=>{
 const {state,dispatch}=useContext(UserContext);

 const history =useHistory();
    useEffect(()=>{
    const url = process.env.REACT_APP_USER_SIGNOUT;
    // window.alert(url)
    fetch(url,{
        method: "GET",
        credentials: "include",
        headers:{
         Accept:"application/json",
         "Content-Type":"application/json"
        },
    }).then((res)=>{
        dispatch({type:"USER", payload:false})
        history.push("/login", {replace:true});
        if(!res.status!== 201){
            const error= new Error(res.error);
            throw error;
        }
    }).catch((err)=>{
        // console.log(res.status);
        window.alert(err.message);
        console.log(err);
    })
    });

    return(
        <> 
        <h1>Logout ka page</h1>
        </>
    )
};
export default Logout;