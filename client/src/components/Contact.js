import React,{useEffect,useState} from "react";
import Validate from "./validateInputs";

const Contact = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [valid, setValid] = useState({
    name: true,
    email: true,
    phone: true,
    message: true,
  });
  const userContact = async () => {
    try {
      const res = await fetch("http://localhost:5500/getdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      setUserData({
        ...userData,
        name: data.name,
        email: data.email,
        phone: data.phone,
      });
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    userContact();
  }, []);

  //we are storing data in states

  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({ ...userData, [name]: value });
    switch (name) {
      case "phone":
        setValid({ ...valid, phone: Validate.validatePhone(value) });
        break;
      case "email":
        setValid({ ...valid, email: Validate.validateEmail(value) });
        break;
      case "name":
        setValid({ ...valid, name: Validate.validateInp(value) });
        break;
      case "message":
        setValid({ ...valid, message: Validate.validateInp(value) });
        break;
      default:
        break;
    }
  };

  //sending data to backend

  const contactForm = async (e) => {
    e.preventDefault();
    const { name, email, phone, message } = userData;
    const res = await fetch(process.env.REACT_APP_FEEDBACK, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        message,
      }),
    });
    if (res.status === 400 || res.status === 422) {
      const data = await res.json();
      console.log("message not sent");
      alert(data.message);
    } else if (res.status === 201) {
      alert("message sent sucessfully");
      setUserData({ name: "", email: "", phone: "", message: "" });
    }
  };

  return (
    <>
      <div className="title2" id="feedBACK">
        <span>Give Feedback</span>
        <div class="shortdesc2">
          <p>Please share your valuable feedback to us</p>
        </div>
      </div>

      <div className="feedbox">
        <div className="feed">
          <form method="POST" enctype="text/plain">
            <label data-required="true">Your Name</label>
            <br />
            <input
              type="text"
              id="contact_form_name"
              name="name"
              onChange={handleInputs}
              value={userData.name}
              placeholder="Your Name"
              required="true"
              data-invalid={!valid.name}
            ></input>
            {!valid.name ? (
              <>
                <small style={{ color: "red" }}>invalid name</small>
                <br />
              </>
            ) : (
              ""
            )}
            <label data-required="true">Email</label>
            <br />
            <input
              type="email"
              id="contact_form_email"
              name="email"
              onChange={handleInputs}
              value={userData.email}
              placeholder="Your Email"
              required="true"
              data-invalid={!valid.email}
            ></input>
            {!valid.email ? (
              <>
                <small style={{ color: "red" }}>invalid email</small>
                <br />
              </>
            ) : (
              ""
            )}
            <label data-required="true">your Phone No.</label>
            <br />
            <input
              type="text"
              id="contact_form_phone "
              name="phone"
              onChange={handleInputs}
              value={userData.phone}
              placeholder="Phone Number"
              required="true"
              data-invalid={!valid.phone}
            ></input>
            {!valid.phone ? (
              <>
                <small style={{ color: "red" }}>invalid phone number</small>
                <br />
              </>
            ) : (
              ""
            )}
            <label data-required="true">Additional Details</label>
            <br />
            <textarea
              name="message"
              onChange={handleInputs}
              value={userData.message}
              placeholder="Type Your Message Here"
              cols="30"
              rows="5"
              data-invalid={!valid.message}
            ></textarea>
            {!valid.message ? (
              <>
                <small style={{ color: "red" }}>invalid message</small>
                <br />
              </>
            ) : (
              ""
            )}
            <button
              type="submit"
              disabled={
                !valid.email || !valid.message || !valid.name || !valid.phone
              }
              id="csubmit"
              onClick={contactForm}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default Contact;