require("dotenv").config(); //To secure the code we install dotenv
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const userRoutes = require("./router/user");
const adminRouter = require("./router/admin");
const courseRouter = require("./router/course");
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
app.get("/signup", (req, res) => {
  res.send(`Hello registration world from the server`);
});

//3rd step heruku
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.listen(PORT, () => {
  console.log(`server is listening at port no ${PORT}`);
});
