import React from 'react'
import Category from './Category.js';
import coding from "../images/coding.png"
import brainbooster from "../images/brainbooster.png";
import papers from "../images/papers.jpg";
const categories = [
	{
	  id: 1,
	  img: coding,
	  title: "Coding Questions",
	  route: "coding",
	},
	{
	  id: 2,
	  img: brainbooster,
	  title: "MCQ's for OA",
	  route: "mcqs",
	},
	{
	  id: 3,
	  img: papers,
	  title: " Top Articles",
	  route: "article",
	},
  ];
  



const Categories=()=> {
  return (
    <>
    <div className="service-swipe">
		<div className="diffSection" id="services_section">
		<center><p style={{fontSize: "50px", padding: "100px", paddingBottom: "40px", color: "#fff"}}>Services</p></center>
		</div>
		{ categories.map((item)=>(
			<Category item={item}/>
		))}
	</div>
    
    </>
  )
}

export default Categories;