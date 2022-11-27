import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import {BrowserRouter} from "react-router-dom";
import UserProvider from "./contexts/userProvider";
import Loading from "./components/Loading";
const Apps = lazy(()=>import("./App"));
ReactDOM.render(
  <>
    <BrowserRouter>
      <UserProvider>
        <Suspense fallback={<Loading/>}>
        <Apps/>
        </Suspense>
      </UserProvider>
    </BrowserRouter>
  </>,
  document.getElementById("root")
);


