import React from 'react'
import { createSearchParams, useNavigate } from "react-router-dom";

 
const  Category=({item})=> {
  const navigate = useNavigate();
  return (
    <>
      <a
        onClick={() => {
          navigate({
            pathname: item.route,
            search: createSearchParams({
              skip: 0,
              limit: 5,
            }).toString(),
          });
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
