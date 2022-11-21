import React, { useState } from "react";


const AdminSignup = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
    password: "",
    cpassword: "",
  });

  let name, value;
  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const PostData = async (e) => {
    e.preventDefault();
    const { name, email, phone, work, password, cpassword } = user;
    const res = await fetch(process.env.REACT_APP_USER_REGISTER, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone, work, password, cpassword }),
    });

    const data = await res.json();
    if (
      res.status === 422 ||
      res.status === 400 ||
      res.status === 401 ||
      !data
    ) {
      window.alert("Invalid Registration");
      console.log("Invalid Registration");
    } else {
      window.alert("Registration Successful");
      console.log("Registration Successful");
    }
  };

  return (
    <>
      <div className="bodyPage">
        <div className="form-box">
            <form method="POST" className="input-group">
              <div className="inp">
                <label htmlFor="name">
                  <i class="zmdi zmdi-account material-icons-name "></i>
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="off"
                  className="input-field"
                  value={user.name}
                  onChange={handleInputs}
                  placeholder="Name"
                ></input>
              </div>

              <div className="inp">
                <label htmlFor="email">
                  <i class="zmdi zmdi-email material-icons-name"></i>
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  autoComplete="off"
                  className="input-field"
                  value={user.email}
                  onChange={handleInputs}
                  placeholder="Email"
                ></input>
              </div>

              <div className="inp ">
                <label htmlFor="phone">
                  <i class="zmdi zmdi-phone-in-talk material-icons-name"></i>
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  autoComplete="off"
                  className="input-field"
                  value={user.phone}
                  onChange={handleInputs}
                  placeholder="enter your phoneNo"
                ></input>
              </div>

              <div className="inp ">
                <label htmlFor="password">
                  <i class="zmdi zmdi-lock material-icons-name"></i>
                </label>
                <input
                  type="text"
                  name="password"
                  id="password"
                  autoComplete="off"
                  className="input-field"
                  value={user.password}
                  onChange={handleInputs}
                  placeholder="enter your password"
                ></input>
              </div>

              <div className="inp ">
                <label htmlFor="cpassword">
                  <i class="zmdi zmdi-lock material-icons-name"></i>
                </label>
                <input
                  type="text"
                  name="cpassword"
                  id="cpassword"
                  autoComplete="off"
                  className="input-field"
                  value={user.cpassword}
                  onChange={handleInputs}
                  placeholder="confirm your password"
                ></input>
              </div>

              <div className="inp  submit-btn">
                <input
                  type="submit"
                  name="signup"
                  id="signup"
                  className=" btn text-center"
                  onClick={PostData}
                  value="Register"
                />
              </div>
            </form>        
         </div>
      </div>    
    </> 
  )
};
export default AdminSignup;
