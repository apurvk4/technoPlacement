import React from "react";
import { Link } from "react-router-dom";
import "../adminStyle.css";
// import { isAuthenticated } from "../auth";


const AdminHome = () => {
//   const {
//     user: { _id, name, email, role },
//   } = isAuthenticated();

  const adminLinks = (
    <div className="card" style={{marginTop:"150px"}}>
      <h4 className="card-header" style={{color:"black"}}>Admin Links</h4>
      <ul className="list-group">
        <li className="list-group-item">
          <Link className="nav-link" to="/create/category">
            View Admins
          </Link>
        </li>
        <li className="list-group-item">
          <Link className="nav-link" to="/create/product">
            Delete Courses
          </Link>
        </li>
        <li className="list-group-item">
          <Link className="nav-link" to="/admin/orders">
          Add Courses
          </Link>
        </li>
        <li className="list-group-item">
          <Link className="nav-link" to="/admin/products">
          View Courses  
          </Link>
        </li>
      </ul>
    </div>
  );

  const adminInfo = (
    <div className="card mb-5" style={{marginTop:"150px"}}>
      <h3 className="card-header" style={{color:"black"}}>Admin Information</h3>
      <ul className="list-group">
        <li className="list-group-item">Anjali</li>
        <li className="list-group-item">anjali@gmail.com</li>
        <li className="list-group-item">Admin</li>
      </ul>
    </div>
  );

  return (
    <div className="jumbotron ">
        <div className="titile mt-3">
            <h2>Admin</h2>
            <h3> Happy to see you :)</h3>
        </div>
      <div className="row">
        <div className="col-3">{adminLinks}</div>
        <div className="col-9">{adminInfo}</div>
      </div>
      </div>  
  );
};
export default AdminHome;