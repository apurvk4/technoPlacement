import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../adminStyle.css";
import AddCourse from "./AddCourse";
import Confirmation from "./Confirmation";
import Modal from "./Modal";
import UserContext from "../contexts/userContext";
// import { isAuthenticated } from "../auth";
const AdminHome = () => {
  const [courses, setCourses] = useState([{}]);
  const [update, setUpdate] = useState(0);
  const [deleteConfirmation, setdeleteConfirmation] = useState(false);
  const [showConfiramtion, setShowConfirmation] = useState(false);
  const [delId, setDelId] = useState("");
  const { data } = useContext(UserContext);
  const [addCourse, setAddCourse] = useState(false);
  const navigator = useNavigate();
  async function removeCourse() {
    if (!deleteConfirmation && !showConfiramtion) {
      setShowConfirmation(true);
    } else {
      // delete course then
      const res = await fetch(
        process.env.REACT_APP_COURSE_DELETE + "/" + delId,
        {
          credentials: "include",
          method: "DELETE",
          headers: {
            Accept: "application/json",
          },
        }
      );
      if (res.status === 400) {
        const data = await res.json();
        alert(data.message);
        return;
      }
      setUpdate(update + 1);
      setShowConfirmation(false);
    }
  }
  async function getCourses() {
    try {
      const res = await fetch(process.env.REACT_APP_ADMIN_ALL+"?limit=100", {
        credentials: "include",
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });
      const data = await res.json();
      if (res.status !== 200) {
        if (res.status === 401) {
          navigator("/");
        }
        alert(data.message);
      } else {
        setCourses(data);
        console.log(data);
      }
    } catch (err) {
      alert(err.message);
    }
  }
  useEffect(() => {
    getCourses();
  }, [update]);
  function displayCourses() {
    let res = [];
    if (!("items" in courses)) {
      return;
    }
    let items = courses["items"];
    if (items.length === 0) {
      return (
        <div className="d-flex text-dark justify-content-center align-items-center">
          <b>No Courses Added till Now</b>
        </div>
      );
    }
    for (let i = 0; i < items.length; i++) {
      let tag = (
        <div className="accordion" id={"accordion" + i}>
          <div className="card">
            <div className="card-header" id={"heading" + i}>
              <h2 className="mb-0 d-flex justify-content-between">
                <button
                  className="btn btn-link btn-block text-left"
                  type="button"
                  data-toggle="collapse"
                  data-target={"#collapse" + i}
                  aria-expanded="true"
                  aria-controls={"collapse" + i}
                  style={{ flexGrow: 2 }}
                >
                  {items[i]["name"]}
                </button>
                <button
                  style={{ flexGrow: 1 }}
                  className="btn btn-sm"
                  aria-label="remove this question"
                  title="remove this question"
                  data-id={items[i]["_id"]}
                  onClick={(e) => {
                    e.preventDefault();
                    let d = e.target.parentElement.dataset.id;
                    setDelId(d);
                    console.log(d);
                    removeCourse();
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-x"
                    viewBox="0 0 16 16"
                  >
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                  </svg>
                </button>
              </h2>
            </div>
            <div
              id={"collapse" + i}
              className="collapse"
              aria-labelledby={"heading" + i}
              data-parent={"#accordion" + i}
            >
              <div className="card-body flex-column align-items-start justify-content-center">
                <div className="d-flex justify-content-start align-items-center">
                  <b style={{ color: "black" }}>course Type : </b>
                  <b style={{ color: "black" }}>{items[i]["courseType"]}</b>
                </div>
                <div className="t2">
                  {items[i]["tags"].map((tag) => (
                    <span>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
      res.push(tag);
    }
    return res;
  }
  function getName() {
    if ("name" in data) {
      return data["name"];
    }
    return "Admin";
  }
  return (
    <div className="jumbotron ">
      <div className="title mt-3">
        <h2>{getName()}</h2>
        <h3> Happy to see you :)</h3>
      </div>
      <div
        className="container"
        style={{
          border: 0,
          marginTop: "67px",
        }}
      >
        <div
          className="d-flex justify-content-end align-items-center py-3 my-2"
          style={{ borderBottom: "1px solid rgba(0,0,0,0.125)" }}
        >
          <button
            className="btn btn-success"
            onClick={() => {
              setAddCourse(true);
            }}
          >
            Add Course
          </button>
        </div>
        {displayCourses()}
      </div>
      {showConfiramtion ? (
        <Confirmation
          header="confirm course deletion"
          message="This is a irreversible action and after performing this action. This course will be deleted forever"
          setConfirmation={setdeleteConfirmation}
          confimationMessage="don't show me this message again"
          action={removeCourse}
          close={() => setShowConfirmation(false)}
        />
      ) : (
        ""
      )}
      {addCourse ? (
        <Modal
          outsideclick="notallow"
          darken={true}
          header="Add Course"
          close={() => {
            setAddCourse(false);
          }}
        >
          <AddCourse />
        </Modal>
      ) : (
        " "
      )}
    </div>
  );
};
export default AdminHome;
