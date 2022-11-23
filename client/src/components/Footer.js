import React from 'react'
import phone from "../images/phone.png";
import logo from "../images/logo.png";
import location from "../images/location.png";


const Footer=()=> {
  return (
    <>
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
        </div>
      
    </>
  );
};

export default Footer;