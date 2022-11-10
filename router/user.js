const jwt = require("jsonwebtoken");
const express = require("express");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const router = express.Router();
const bcrypt = require("bcryptjs");
require("../db/conn");
const User = require("../model/userSchema");
const authenticateUser = require("../middleware/authenticateUser");
const cookieParser = require("cookie-parser");
const handleError = require("../handleError");
router.use(cookieParser());
router.get("/", (req, res) => {
  res.send(`Hello from the server router js`);
});

//Using async await
router.post("/register", async (req, res) => {
  const { name, email, phone, password, cpassword } = req.body; // Taking data form user by Destructuring objects

  if (!name || !email || !phone || !password || !cpassword) {
    // All fields should be filled
    return res
      .status(422)
      .json({ error: "Please fill all the fields properply" });
  }
  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ error: "Email already exist" }); //client side error(starts from 400)
    } else if (password != cpassword) {
      return res.status(422).json({ error: "Password are not matching" });
    }
    const user = new User({ name, email, phone, password, cpassword }); //then creating a document by destructuring
    //before saving data ,password to be hashed.(pre save method)

    await user.save();
    res.status(201).json({ message: " user registerd successfully " });
  } catch (err) {
    res.status(400).send(handleError(err));
    // console.log(err); //if findOne function doesn't execute
  }
});
//login
router.post("/signin", async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "please fill the data properly" });
    }
    const userLogin = await User.findOne({ email: email });
    //   console.log(userLogin);
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      if (!isMatch) {
        res.status(400).json({ error: "Invalid Credentials" });
      } else {
        //Generating jwt token and store cookie after the password match
        token = await userLogin.generateAuthToken();
        console.log(token);

        res.cookie("jwtoken", token, {
          //  name-value
          expires: new Date(Date.now() + 25892000000),
          httpOnly: true, //after 30 days
        });
        res.status(200).send({ message: "Signin successfully" });
      }
    } else {
      res.status(400).json({ error: "Invalid Credentials" });
    }
  } catch (err) {
    res.status(400).send(handleError(err));
  }
});

//about us
router.get("/about", authenticateUser, (req, res) => {
  res.send(req.rootUser);
});

//get user data for contact and home page
router.get("/getdata", authenticateUser, (req, res) => {
  res.send(req.rootUser);
});

//contact us page
router.post("/contact", authenticateUser, async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    if (!name || !email || !phone || !message) {
      console.log("contact us page error");
      return res.json({ error: "please fill the contact form" });
    }
    const userContact = await User.findOne({ _id: req.userID });
    if (userContact) {
      const userMessage = await userContact.addMessage(
        name,
        email,
        phone,
        message
      );
      await userContact.save();
      res.status(201).json({ message: "user contacted successfully " });
    }
  } catch (e) {
    console.log(e);
  }
});

//logout page
router.get("/signout", authenticateUser, async (req, res) => {
  try {
    console.log("hello my logout page");
    await req.rootUser.tokens.pull({ token: req.token });
    await req.rootUser.save();
    res.clearCookie("jwtoken", { path: "./" });
    res.status(201).send("user Logout");
  } catch (err) {
    res.status(400).send(handleError(err));
  }
});

module.exports = router;
