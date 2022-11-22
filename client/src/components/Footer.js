import React from 'react'
import phone from "../images/phone.png";
import logo from "../images/logo.png";
import location from "../images/location.png";


const Footer=()=> {
  return (
    <>
      <div className="footer">
        <div className="footer-container" style={{ marginLeft: "51px" }}>
          <div className="left-col">
            <img src={logo} style={{ width: "200px" }} />
            <div className="logo"></div>

            <p className="rights-text">
              Copyright © 2022 Created By Anjali Jain, Ankit Mathur , Apurv
              kumar and Bharat Kumar All Rights Reserved.
            </p>

            <p>
              <img src={location} /> SKIT Jaipur,Rajasthan-302017
            </p>

            <p>
              <img src={location} />
              &nbsp; technoplacement@gmail.com
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;