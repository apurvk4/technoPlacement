import React from "react";
// import AddCourse from "./AddCourse";
// import Coding from "./Coding";
// import Modal from "./Modal";
import Footer from "./Footer";
import Contact from "./Contact";
import algo from "../images/algo.png";
import home1 from "../images/home1.jpg";
import book from "../images/book.png";
import d1 from "../images/d1.png";
import computer from "../images/computer.png";
import data from "../images/data.png";
import paper from "../images/paper.png";
import projects from "../images/projects.png";
import Categories from "./Categories";

const Home = () => {
  return (
    <>
      <div className="head-container">
        <div className="quote">
          <p>
            The beautiful thing about learning is that nobody can take it away
            from you.
          </p>
          <h5>
            Education is the process of facilitating learning, or the
            acquisition of knowledge, skills, values, beliefs, and habits.
            Educational methods include teaching, training, storytelling,
            discussion and directed research!
          </h5>
        </div>
        {/* <div class="play">
					<img src="images/icon/play.png" alt="play"><span><a href="https://www.youtube.com/watch?v=KFyrgDO1WXk" target="_blank">Watch Now</a></span>
				</div> */}

        <div className="svg-image">
          <img src={home1} alt="svg" />
        </div>
      </div>
      <Categories />

      <div className="title">
        <span>Popular subjects on TechnoPlacement</span>
      </div>
      <br />
      <br />
      <div className="course">
        <center>
          <div className="cbox">
            <div className="det">
              <a href="https://www.geeksforgeeks.org/articles-on-computer-science-subjects-gq/">
                <img src={book} /> IT Core Subjects
              </a>
            </div>
            <div className="det">
              <a href="https://www.geeksforgeeks.org/geeksforgeeks-school/?ref=shm">
                <img src={d1} />
                Courses{" "}
              </a>
            </div>
            <div className="det">
              <a href="https://www.geeksforgeeks.org/50-data-structures-mcqs-with-answers/">
                <img src={paper} />
                MCQ
              </a>
            </div>
            <div className="det">
              <a href="https://practice.geeksforgeeks.org/problem-of-the-day">
                <img src={d1} />
                Daily Question
              </a>
            </div>
          </div>
        </center>
        <div className="cbox">
          <div className="det">
            <a href="https://www.geeksforgeeks.org/company-interview-corner/">
              <img src={computer} />
              Interview Experience
            </a>
          </div>
          <div className="det">
            <a href="https://www.geeksforgeeks.org/data-structures/?ref=shm">
              <img src={data} />
              Data Structures
            </a>
          </div>
          <div className="det">
            <a href="https://www.geeksforgeeks.org/fundamentals-of-algorithms/?ref=shm">
              <img src={algo} />
              Algorithms
            </a>
          </div>
          <div className="det det-last">
            <a href="https://www.geeksforgeeks.org/computer-science-projects/?ref=sh">
              <img src={projects} />
              Project Ideas
            </a>
          </div>
        </div>
      </div>

      <div className="Contact-page" style={{ marginBottom: "100px" }}>
        <Contact />
      </div>
      <Footer />
    </>
  );
};
export default Home;
