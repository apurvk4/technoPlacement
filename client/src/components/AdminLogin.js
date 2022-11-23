import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/userContext";
import google from "../images/google.png";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, level, setLevel, setLogin, setData } = useContext(UserContext);
  const navigate = useNavigate();
  const loginUser = async (e) => {
    e.preventDefault();
    const res = await fetch(process.env.REACT_APP_ADMIN_SIGNIN, {
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
      setLevel("admin");
      setData(data);
      setLogin(true);
      window.alert("Login successful");
      navigate("/adminHome");
    }
  };
  useEffect(() => {
    if (login) {
      let u = "someone";
      if (level === "admin") {
        u = "An Admin";
      } else if (level === "user") {
        u = "An User";
      }
      alert(u + " is already logged in . please logout to continue");
      navigate("/");
    }
  }, []);
  return (
    <>
      <div className="bodyPage">
        <div className="form-box">
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
                className="btn bg-inherit"
                value="Log in"
              />
            </div>
          </form>

          <div className="other" id="other">
            <div className="instead" style={{ marginTop: "70px" }}>
              <h3>or</h3>
            </div>
            <button className="connect" onclick="google()">
              <img src={google} />
              <span>Sign in with Google</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default AdminLogin;
