import React from 'react';
import Headers from "./Headers.js";
import search from "../images/search.png";
import Article from './Article.js';

const Coding=()=> {
  return (
    <>
     <Headers/>
       <div className='container-inner'>
        <div className='filters'>
        <div className='search-name'>
			<h2>  Search Tags</h2>
		</div>
        <div className="srch">
            <input type="text"
             className="search"
             placeholder="Search here..."/>
            <img src={search} alt="search" />
        </div>
        </div>
          <div className='table-list'>
            <div className='t1'>
                 <div className='quesHeading'>
                <div className='quesId'>1.</div>
                <p>Sum of Array Elements</p>
              </div>
              <div className='quesLinks'>
                <span><a href='#'>Link1</a></span>
                <span><a href='#'>Link2</a></span>
              </div>
            </div>
            <div className='t2'>
               <span>Array</span>
               <span>Sum</span>
            </div>
          </div>
        </div>
        
        
    </>
  )
}

export default Coding;