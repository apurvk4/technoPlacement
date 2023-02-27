import React from 'react'
import { createSearchParams, useNavigate } from "react-router-dom";

 
const  Category=({item})=> {
  const navigate = useNavigate();
  return (
    <>
      <a
        onClick={() => {
          if (item.route != "playground") {
            navigate({
              pathname: item.route,
              search: createSearchParams({
                skip: 0,
                limit: 5,
              }).toString(),
            });
          } else {
            navigate({
              pathname: item.route,
            });
          }
        }}
      >
        <div className="s-card">
          <img src={item.img} />
          <p>{item.title}</p>
        </div>
      </a>
    </>
  );
}

export default Category;
