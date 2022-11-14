import React from 'react'
import { Link } from "react-router-dom";
import Coding from './Coding';

 
const  Category=({item})=> {
  return (
    <>
    
   <a> <div className="s-card"><img src={item.img}/><p>{item.title}</p></div></a>
  
    </>
  )
}

export default Category;
