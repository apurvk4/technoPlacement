require("dotenv").config(); //To secure the code we install dotenv
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const userRoutes = require("./router/user");
const adminRouter = require("./router/admin");
const courseRouter = require("./router/course");
const handleError = require("./handleError");
const Feedback = require("./model/feedbackSchema");

function corsMiddleWare(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
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