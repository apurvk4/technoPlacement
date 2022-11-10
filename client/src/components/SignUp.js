import React,{useState} from "react";
import { NavLink ,useHistory} from "react-router-dom";
import register from "../images/register.jpg";
const SignUp=()=>{
  const history=useHistory();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    cpassword: "",
  });
  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const PostData = async (e) => {
    e.preventDefault();
    console.log(process.env);
    const { name, email, phone, password, cpassword } = user;
    const url = process.env.REACT_APP_USER_REGISTER;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone, password, cpassword }),
    })

    const data = await res.json();
    if (res.status === 422 || res.status === 400 || !data) {
      window.alert("Invalid Registration");
      console.log(res.status);
      console.log(data);
    } else {
      window.alert("Registration Successful");
      console.log("Registration Successful");
      console.log(res.status);
      console.log(data);
      history.push("/login");
    }
  };

  return (
    <>
      <section className="signup  container">
        <div className="container w-75  mt-5">
          <div className="signup-content  row container mt-20">
            <div className="signup-form  col-lg-6 col-md-6 col-12 ">
              <h2 className="form-title text-center text-capitalize display-3">
                {" "}
                Sign up
              </h2>
              <form method="POST" className="register-form " id="register-form">
                <div className="form-group   ">
                  <label htmlFor="name">
                    <i class="zmdi zmdi-account material-icons-name "></i>
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="off"
                    value={user.name}
                    onChange={handleInputs}
                    placeholder="enter your name"
                  ></input>
                </div>

                <div className="form-group ">
                  <label htmlFor="email">
                    <i class="zmdi zmdi-email material-icons-name"></i>
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    autoComplete="off"
                    value={user.email}
                    onChange={handleInputs}
                    placeholder="enter your email"
                  ></input>
                </div>

                <div className="form-group ">
                  <label htmlFor="phone">
                    <i class="zmdi zmdi-phone-in-talk material-icons-name"></i>
                  </label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    autoComplete="off"
                    value={user.phone}
                    onChange={handleInputs}
                    placeholder="enter your phoneNo"
                  ></input>
                </div>

                <div className="form-group ">
                  <label htmlFor="password">
                    <i class="zmdi zmdi-lock material-icons-name"></i>
                  </label>
                  <input
                    type="text"
                    name="password"
                    id="password"
                    autoComplete="off"
                    value={user.password}
                    onChange={handleInputs}
                    placeholder="enter your password"
                  ></input>
                </div>

                <div className="form-group ">
                  <label htmlFor="cpassword">
                    <i class="zmdi zmdi-lock material-icons-name"></i>
                  </label>
                  <input
                    type="text"
                    name="cpassword"
                    id="cpassword"
                    autoComplete="off"
                    value={user.cpassword}
                    onChange={handleInputs}
                    placeholder="confirm your password"
                  ></input>
                </div>

                <div className="form-group btn form-button">
                  <input
                    type="submit"
                    name="signup"
                    id="signup"
                    className=" form-submit text-center"
                    onClick={PostData}
                    value="register"
                  />
                </div>
              </form>
            </div>
            <div className="signup-image col-lg-6 col-md-6 col-12  ">
              <figure className="img-fluid  ">
                <img class="w-50 mb-10" src={register} alt="Register pic" />
              </figure>
              <div className="image-link text-center">
                <NavLink
                  to="/login"
                  className="signup-image-link text-capitalize"
                >
                  I am already registered
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default SignUp;