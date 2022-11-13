import React from 'react'
import { categories } from '../data.js';
import Category from './Category.js';




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