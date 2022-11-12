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
				<img src={logo}  style={{width:"200px"}}/>
				<div className="logo"></div>

				<p className="rights-text">Copyright © 2021 Created By Roshan Kumar, Abhishek Dulat All Rights Reserved.</p>
				<br/><p><img src={location}/> Lovely Professional University<br/>Phagwara, Punjab-144401</p><br/>
				<p><img src={phone}/> +91-1234-567-890<br/><img src={location}/>&nbsp; learnedonline9419@gmail.com</p>
			</div>
			<div className="right-col">
				<h1 >Our Newsletter</h1>
				<div className="border"></div><br/>
				<p>Enter Your Email to get our News and updates.</p>
				{/* <form className="newsletter-form">
					<input className="txtb" type="email" placeholder="Enter Your Email">
					<input className="btn" type="submit" value="Submit">
				</form> */}
			</div>
		</div>
        </div>
    </>
  )
};

export default Footer;