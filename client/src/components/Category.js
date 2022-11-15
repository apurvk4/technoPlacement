import React from 'react'
import { Link } from "react-router-dom";
import Coding from './Coding';

 
const  Category=({item})=> {
  return (
    <>
      <Link to={"/" + item.route}>
        <div className="s-card">
          <img src={item.img} />
          <p>{item.title}</p>
        </div>
      </Link>
    </>
  );
}

export default Category;
