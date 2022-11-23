import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/userContext";

const AdminLogout = () => {
  const { setLevel, setLogin, setData } = useContext(UserContext);
  const navigate = useNavigate();
  async function logoutAdmin() {
    try {
      const res = await fetch(process.env.REACT_APP_ADMIN_SIGNOUT, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
        },
      });
      if (res.status === 200) {
        setLevel("none");
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
    logoutAdmin();
  }, []);

  return (
    <>
      <h1>Logout ka page</h1>
    </>
  );
};
export default AdminLogout;
