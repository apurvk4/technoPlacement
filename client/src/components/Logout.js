import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/userContext";

const Logout = () => {
  const { setLevel, setLogin, setData } = useContext(UserContext);
  const navigate = useNavigate();
  async function logoutUser() {
    try {
      const res = await fetch(process.env.REACT_APP_USER_SIGNOUT, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
        },
      });
      if (res.status === 201) {
        setLevel(undefined);
        setLogin(false);
        setData({});
        navigate("/");
      } else {
        const data = await res.json();
        alert(data.message);
      }
    } catch (err) {
      alert(err.message);
    }
  }
  useEffect(() => {
    logoutUser();
  }, []);

  return (
    <>
      <h1>Logout ka page</h1>
    </>
  );
};
export default Logout;
