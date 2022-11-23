require("dotenv").config(); //To secure the code we install dotenv
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const userRoutes = require("./router/user");
const adminRouter = require("./router/admin");
const courseRouter = require("./router/course");
const handleError = require("../handleError");
const Feedback = require("./model/feedbackSchema");
const jwt = require("jsonwebtoken");
const User = require("./model/userSchema");
const Admin = require("./model/adminSchema");
function corsMiddleWare(req, res, next) {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://techno-placement11.vercel.app/"
  );
  res.removeHeader("X-powered-by");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,PATCH,POST,DELETE");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  if (req.method == "OPTIONS") {
    res.status(200);
    res.end();
  } else {
    next();
  }
}
app.use(cookieParser());
app.use(corsMiddleWare);
require("./db/conn");
app.use(express.json()); //middleware to understand json format for our application
app.get("/api/verifytoken", async (req, res) => {
  try {
    const token = req.cookies.jwtoken; //getting the token
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY); //Verifying token
    //vertifyToken have all the info(collection)
    const rootUser = await User.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    }); //checking if token exist

    if (rootUser) {
      req.token = token;
      req.rootUser = rootUser; //rootuser have the document
      req.userID = rootUser._id; //fetching id of that particular document from rootUser
      console.log(rootUser);
      res.status(200).send({
        level: "user",
        value: rootUser.toObject(),
      });
      return;
    }
    const rootAdmin = await Admin.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });
    if (rootAdmin) {
      res.status(200).send({
        level: "admin",
        value: rootAdmin.toObject(),
      });
      return;
    }
    res.clearCookie("jwtoken");
    res.status(400).send({ message: "invalid token" });
  } catch (err) {
    res.status(400).send(handleError(err));
    console.log(err);
  }
});
app.post("/api/feedback", async (req, res) => {
  try {
    let { name, email, phone, message } = req.body;
    if (
      !name ||
      name == "" ||
      !email ||
      email == "" ||
      !phone ||
      phone == "" ||
      !message ||
      message == ""
    ) {
      res.status(422).send({
        message: "invalid message.Either feilds not present or empty",
      });
      return;
    }
    const feedback = new Feedback({ name, email, phone, message });
    await feedback.save();
    res.status(201).send({ message: "message sent successfully" });
  } catch (err) {
    res.status(400).send(handleError(err));
  }
});
app.use("/api/user", userRoutes); //we link the router files to our route easy
app.use("/api/admin", adminRouter);
app.use("/api/course", courseRouter);
const PORT = process.env.PORT || 5500;

//this middleware will make sure if user have logged in or not.
//it works in between we visit the page and showing the about page ui
// app.get("/about",middleware,(req,res)=>{
//     res.send(`Hello from the about page`);
// });
// app.get("/contact",(req,res)=>{
//     res.send(`Hello from the the contact page`);
// });
// app.get("/signin",(req,res)=>{
//     res.send(`Hello login world from the the signin page`);
// });
app.listen(PORT, () => {
  console.log(`server is listening at port no ${PORT}`);
});
