import React from 'react'
import phone from "../images/phone.png";
import logo from "../images/logo.png";
import location from "../images/location.png";


const Footer=()=> {
  return (
    <>
<<<<<<< HEAD
    <div className='footer'>
       <div className="footer-container">
			<div className="left-col">
			<h1 >Our Newsletter</h1>
				<img src={logo}  style={{width:"200px"}} />
				<h3  className="  m-0" style={{fontFamily:"monospace"}}>Techno Placement</h3>
				<div className="logo"></div>
				
			</div>
			<div className="right-col mb-0">
				
				<p className="rights-text">Copyright © 2022 Created By Apurv Kumar,Anjali Jain, Ankit Mathur,Bharat Kumar. All Rights Reserved.</p>
				<div className="border"></div><br/>
				<p><img src={phone}/> +91-1234-567-777<br/></p>
				<br/><p><img src={location}/>SKIT, Jaipur<br/>Jaipur, Rajasthan</p><br/>
				
			</div>
		</div>
=======
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
>>>>>>> c892a99d548a7baee4786c950f0ac35ccd4392a2
        </div>
      </div>
    </>
  );
};

export default Footer;