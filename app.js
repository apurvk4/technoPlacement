const express=require("express");
const dotenv=require("dotenv");
const app= express();
const cookieParser=require("cookie-parser");
app.use(cookieParser());

dotenv.config({path:"./config.env"});              //To secure the code we install dotenv

require("./db/conn");
app.use(express.json());                         //middleware to understand json format for our application

app.use(require('./router/auth'));               //we link the router files to our route easy
const PORT=process.env.PORT || 5000;                   


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
app.get("/signup",(req,res)=>{
    res.send(`Hello registration world from the server`);
});


//3rd step heruku
 if(process.env.NODE_ENV === "production"){
     app.use(express.static("client/build"));
     
 }


app.listen(PORT, ()=>{
    console.log(`server is listening at port no ${PORT}`);
});



