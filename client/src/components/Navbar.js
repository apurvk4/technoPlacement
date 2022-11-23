import React, { useContext, useRef } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { NavLink } from "react-router-dom";
import UserContext from "../contexts/userContext";
import logo from "../images/logo.png";
const Navbar = () => {
  const { level, login } = useContext(UserContext);
  const adminLinks = useRef(null);
  const userLinks = useRef(null);
  const RenderMenu = () => {
    return (
      <>
        <li className="nav-item active">
          <NavLink className="nav-link" style={{ borderRadius: 0 }} to="/">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <div className="btn-group">
            <button
              type="button"
              class={
                level === "user" && login
                  ? "btn dropdown-toggle nav-btn-active"
                  : "btn dropdown-toggle"
              }
              style={{ fontSize: "20px", fontWeight: "500" }}
              aria-expanded="false"
              onClick={() => {
                adminLinks.current.classList.toggle("admin-link-active");
              }}
            >
              User
            </button>
            <ul className="dropdown-menu" ref={adminLinks}>
              <li>
                <NavLink
                  className="dropdown-item"
                  style={{ borderRadius: 0 }}
                  to="/login"
                >
                  User Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="dropdown-item"
                  style={{ borderRadius: 0 }}
                  to="/signup"
                >
                  User SignUp
                </NavLink>
              </li>
              {level === "user" && login ? (
                <li>
                  <NavLink
                    className="dropdown-item"
                    style={{ borderRadius: 0 }}
                    to="/logout"
                  >
                    User Logout
                  </NavLink>
                </li>
              ) : (
                ""
              )}
            </ul>
          </div>
        </li>
        <li className="nav-item">
          <div className="btn-group">
            <button
              type="button"
              class={
                level === "admin" && login
                  ? "btn dropdown-toggle nav-btn-active"
                  : "btn dropdown-toggle"
              }
              aria-expanded="false"
              style={{ fontSize: "20px", fontWeight: "500" }}
              onClick={() => {
                userLinks.current.classList.toggle("admin-link-active");
              }}
            >
              Admin
            </button>
            <ul className="dropdown-menu" ref={userLinks}>
              {login && level === "admin" ? (
                <li>
                  <NavLink
                    className="dropdown-item"
                    style={{ borderRadius: 0 }}
                    to="/adminHome"
                  >
                    Dashboard
                  </NavLink>
                </li>
              ) : (
                ""
              )}
              <li>
                <NavLink
                  className="dropdown-item"
                  style={{ borderRadius: 0 }}
                  to="/adminLogin"
                >
                  Admin Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="dropdown-item"
                  style={{ borderRadius: 0 }}
                  to="/adminSignup"
                >
                  Admin SignUp
                </NavLink>
              </li>
              {level === "admin" && login ? (
                <li>
                  <NavLink
                    className="dropdown-item"
                    style={{ borderRadius: 0 }}
                    to="/adminSignout"
                  >
                    Admin Logout
                  </NavLink>
                </li>
              ) : (
                ""
              )}
            </ul>
          </div>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/about">
            About
          </NavLink>
        </li>
      </>
    );
  };
  return (
    <>
      <nav
        className="navbar w-5 navbar-expand-lg navbar-light bg-light"
        style={{
          boxShadow: "0px 0px 0px 1px black",
          position: "fixed",
          width: "100%",
          zIndex: "900",
          backgroundColor: "grey",
        }}
      >
        <NavLink className="navbar-brand " to="/#">
          <img
            src={logo}
            alt="technoplacement logo"
            style={{ width: "49px" }}
          />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <RenderMenu />
          </ul>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
