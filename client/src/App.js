import React, { createContext,useReducer } from "react";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { Route,Switch } from "react-router-dom";
import About from "./components/About";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Contact from "./components/Contact";
import "./App.css";
import ErrorPage from "./components/ErrorPage";
import Logout from "./components/Logout";
import { initialState,reducer } from "./reducer/useReducer";

 //context Api
 export const UserContext=createContext();

const App=()=>{

   const [state, dispatch] = useReducer(reducer, initialState)
 

  return(
    <>  
    <UserContext.Provider value={{state,dispatch}}> 
      <Navbar/> 
       <Switch>
     
     <Route  exact path="/" component={Home}/>
    
      <Route   exact path="/about">
       <About/>
      </Route>

      <Route exact path="/contact">
       <Contact/>
      </Route>
       
      <Route  exact path="/login">
       <Login/>
      </Route>

      <Route exact path="/signup">
       <SignUp/>
      </Route>

      <Route exact path="/logout">
       <Logout />
      </Route>
      
     
      <Route>
       <ErrorPage />    
      </Route>  
      </Switch>
      </UserContext.Provider>
    </>
  )
}
export default App;