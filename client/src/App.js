// import React from "react";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import About from "./components/About";
import Admin from "./components/Admin";
import "./App.css";
import ErrorPage from "./components/ErrorPage";
import Logout from "./components/Logout";
// import { initialState, reducer } from "./reducer/useReducer";
import Coding from "./components/Coding";
import Article from "./components/Article";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Mcq from "./components/Mcq";
import AdminLogin from "./components/AdminLogin";
import AdminSignup from "./components/AdminSignup";
import AdminHome from "./components/AdminHome";
import AdminLogout from "./components/AdminLogout";
import { useContext, useEffect } from "react";
import UserContext from "./contexts/userContext";
//context Api
// export const UserContext = createContext();

const App = () => {
  // const [state, dispatch] = useReducer(reducer, initialState);
  const { setData, setLogin, setLevel } = useContext(UserContext);
  async function verifyToken() {
    try {
      const res = await fetch(process.env.REACT_APP_VERIFY_TOKEN, {
        credentials: "include",
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });
      if (res.status === 200) {
        const data = await res.json();
        setData(data.value);
        setLevel(data.level);
        setLogin(true);
      }
    } catch (err) {
      alert(err.message);
    }
  }
  useEffect(() => {
    verifyToken();
  }, []);
  return (
    <>
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
        <Route path="/adminSignup" element={<AdminSignup />} />
        <Route path="/adminHome" element={<AdminHome />} />
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route path="/adminSignout" element={<AdminLogout />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};
export default App;
