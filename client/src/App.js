import React, { createContext,useReducer } from "react";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import About from "./components/About";
import Admin from "./components/Admin";
import "./App.css";
import ErrorPage from "./components/ErrorPage";
import Logout from "./components/Logout";
import { initialState, reducer } from "./reducer/useReducer";
import Coding from "./components/Coding";
import Article from "./components/Article";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Mcq from "./components/Mcq";

//context Api
export const UserContext = createContext();

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/about" element={<About />} />

          <Route path="/admin" element={<Admin />} />
          <Route path="/article" element={<Article />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/coding" element={<Coding />} />
          <Route path="/mcqs" element={<Mcq />} />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
};
export default App;