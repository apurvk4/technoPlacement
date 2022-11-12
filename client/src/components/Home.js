import React,{useState,useEffect} from "react";
import Footer from "./Footer";
import Contact from "./Contact";
import algo from "../images/algo.png";
import home1 from "../images/home1.jpg"
import book from "../images/book.png";
import d1 from "../images/d1.png";
import computer from "../images/computer.png";
import data from "../images/data.png";
import paper from "../images/paper.png";
import projects from "../images/projects.png";

const Home=()=>{
   const [show, setShow] = useState(false);
  const [userName, setUserName]= useState('');
  const userHomePage= async()=>{
  
   try{
         const res= await fetch("/getdata", {
           method: "GET",
           headers:{
              "Content-Type":"application/json"
            },
         });
         const data=await res.json();
         console.log(data);
         setUserName(data.name);
        setShow(true);
   }catch(e){
     console.log(e);
   }
 };
useEffect(() => {
  userHomePage();
  
},[]);

  return(
    <>
       <div className="head-container">
			<div className="quote">
				<p>The beautiful thing about learning is that nobody can take it away from you</p>
				<h5>Education is the process of facilitating learning, or the acquisition of knowledge, skills, values, beliefs, and habits. Educational methods include teaching, training, storytelling, discussion and directed research!</h5>
				{/* <div class="play">
					<img src="images/icon/play.png" alt="play"><span><a href="https://www.youtube.com/watch?v=KFyrgDO1WXk" target="_blank">Watch Now</a></span>
				</div> */}
			</div>
			<div className="svg-image">
				<img src={home1} alt="svg"/>
			</div>
		</div>
      <div className="title">
        <span>Popular Subjects on TechnoPlacement</span>
	    </div>
	    <br/><br/>
	     <div className="course">
		   <center><div className="cbox">
		      <div className="det"><a href="subjects/jee.html"><img src={book}/>JEE Preparation</a></div>
		      <div className="det"><a href="subjects/gate.html"><img src={d1}/>GATE Preparation</a></div>
		      <div className="det"><a href="subjects/jee.html#sample_papers"><img src={paper}/>Sample Papers</a></div>
		      <div className="det"><a href="subjects/quiz.html"><img src={d1}/>Daily Quiz</a></div>
		   </div></center>
		   <div className="cbox">
		      <div className="det"><a href="subjects/computer_courses.html"><img src={computer}/>Computer Courses</a></div>
		      <div className="det"><a href="subjects/computer_courses.html#data"><img src={data}/>Data Structures</a></div>
		      <div className="det"><a href="subjects/computer_courses.html#algo"><img src={algo}/>Algorithm</a></div>
		      <div className="det det-last"><a href="subjects/computer_courses.html#projects"><img src={projects
          }/>Projects</a></div>
		    </div>
	 </div>
   
   
   <div className="Contact-page">
    <Contact/>
   </div>
   <Footer/>        
 
    </>
  );
}
export default Home;