import React, { useEffect, useContext } from "react";
import { UserContext } from "../App";

const Logout = () => {
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    fetch(process.env.REACT_APP_USER_SIGNOUT, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        dispatch({ type: "USER", payload: false });
        if (!res.status !== 200) {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <>
      <h1>Logout ka page</h1>
    </>
  );
};
export default Logout;
