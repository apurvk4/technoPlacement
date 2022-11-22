import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import google from "../images/google.png";
import { UserContext } from "../App";

const Login = () => {
  const { state, dispatch } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();
    const res = await fetch(process.env.REACT_APP_USER_SIGNIN, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await res.json();
    if (!data || res.status === 400) {
      window.alert("Invalid Credentials");
    } else {
      dispatch({ type: "USER", payload: true });
      window.alert("Login successful");
    }
  };

  return (
    <>
      <div className="bodyPage">
        <div className="form-box">
          <ul
            className="nav nav-tabs "
            style={{
              marginTop: "35px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            role="tablist"
          >
            <li className="nav-item">
              <a
                className="nav-link active"
                id="login-tab"
                data-toggle="tab"
                href="#login"
                role="tab"
              >
                Login
              </a>
            </li>
            <li className="nav-item">
              <NavLink to="/signup">
                <a
                  className="nav-link"
                  id="signup-tab"
                  data-toggle="tab"
                  href="#signup"
                  role="tab"
                >
                  Register
                </a>
              </NavLink>
            </li>
          </ul>
          <div
            class="tab-pane fade show active"
            id="login"
            role="tabpanel"
            aria-labelledby="home-tab"
          >
            <form method="POST" className="input-group" id="register-form">
              <div className="inp">
                <label htmlFor="email">
                  <i class="zmdi zmdi-email material-icons-name"></i>
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="input-field"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="off"
                  placeholder="Email"
                ></input>
              </div>

              <div className="inp">
                <label htmlFor="password">
                  <i class="zmdi zmdi-lock material-icons-name"></i>
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="off"
                  className="input-field"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                ></input>
              </div>

              <div className="submit-btn">
                <input
                  type="submit"
                  name="signin"
                  onClick={loginUser}
                  className="btn"
                  value="Log in"
                />
              </div>
            </form>

            <div className="other" id="other">
              <div className="instead">
                <h3>or</h3>
              </div>
              <button className="connect" onclick="google()">
                <img src={google} />
                <span>Sign in with Google</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
