import React from 'react'
import { Link } from "react-router-dom";

 
const  Category=({item})=> {
  return (
    <>
    <a href="#"><div className="s-card"><img src={item.img}/><p>{item.title}</p></div></a>
    </>
  )
}

export default Category;
