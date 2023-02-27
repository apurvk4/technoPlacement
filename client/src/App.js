// import React from "react";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import "./App.css";
// import { initialState, reducer } from "./reducer/useReducer";
import { lazy, Suspense, useContext, useEffect } from "react";
import UserContext from "./contexts/userContext";
import Loading from "./components/Loading";
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
      } else {
        setLevel(undefined);
      }
    } catch (err) {
      alert(err.message);
      setLevel(undefined);
    }
  }
  useEffect(() => {
    verifyToken();
  }, []);
  const AboutRoute = lazy(() => import("./components/About"));
  const AdminRoute = lazy(() => import("./components/Admin"));
  const ArticleRoute = lazy(() => import("./components/Article"));
  const LoginRoute = lazy(() => import("./components/Login"));
  const SignUpRoute = lazy(() => import("./components/SignUp"));
  const LogoutRoute = lazy(() => import("./components/Logout"));
  const CodingRoute = lazy(() => import("./components/Coding"));
  const McqRoute = lazy(() => import("./components/Mcq"));
  const AdminSignupRoute = lazy(() => import("./components/AdminSignup"));
  const AdminHomeRoute = lazy(() => import("./components/AdminHome"));
  const AdminLoginRoute = lazy(() => import("./components/AdminLogin"));
  const AdminLogoutRoute = lazy(() => import("./components/AdminLogout"));
  const ErrorRoute = lazy(() => import("./components/ErrorPage"));
  const Playground = lazy(() => import("./components/playground"));
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/about"
          element={
            <Suspense fallback={<Loading />}>
              <AboutRoute />
            </Suspense>
          }
        />
        <Route
          path="/admin"
          element={
            <Suspense fallback={<Loading />}>
              <AdminRoute />
            </Suspense>
          }
        />
        <Route
          path="/article"
          element={
            <Suspense fallback={<Loading />}>
              <ArticleRoute />
            </Suspense>
          }
        />
        <Route
          path="/login"
          element={
            <Suspense fallback={<Loading />}>
              <LoginRoute />
            </Suspense>
          }
        />
        <Route
          path="/signup"
          element={
            <Suspense fallback={<Loading />}>
              <SignUpRoute />
            </Suspense>
          }
        />
        <Route
          path="/logout"
          element={
            <Suspense fallback={<Loading />}>
              <LogoutRoute />
            </Suspense>
          }
        />
        <Route
          path="/coding"
          element={
            <Suspense fallback={<Loading />}>
              <CodingRoute />
            </Suspense>
          }
        />
        <Route
          path="/mcqs"
          element={
            <Suspense fallback={<Loading />}>
              <McqRoute />
            </Suspense>
          }
        />
        <Route
          path="/adminSignup"
          element={
            <Suspense fallback={<Loading />}>
              <AdminSignupRoute />
            </Suspense>
          }
        />
        <Route
          path="/adminHome"
          element={
            <Suspense fallback={<Loading />}>
              <AdminHomeRoute />
            </Suspense>
          }
        />
        <Route
          path="/adminLogin"
          element={
            <Suspense fallback={<Loading />}>
              <AdminLoginRoute />
            </Suspense>
          }
        />
        <Route
          path="/playground"
          element={
            <Suspense fallback={<Loading />}>
              <Playground />
            </Suspense>
          }
        />
        <Route
          path="/adminSignout"
          element={
            <Suspense fallback={<Loading />}>
              <AdminLogoutRoute />
            </Suspense>
          }
        />
        <Route
          path="/*"
          element={
            <Suspense fallback={<Loading />}>
              <ErrorRoute />
            </Suspense>
          }
        />
      </Routes>
    </>
  );
};
export default App;
