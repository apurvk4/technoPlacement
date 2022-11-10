const jwt=require("jsonwebtoken");
const express = require("express");
const router=express.Router();
const bcrypt=require("bcryptjs");
require("../db/conn");
const User=require("../model/userSchema");
const authenticate=require("../middleware/authenticate");
const cookieParser=require("cookie-parser");
router.use(cookieParser());

router.get("/",(req,res)=>{
    res.send(`Hello from the server router js`);
});

//Using async await

router.post("/register",async(req,res)=>{
    
    const{name,email,phone,work,password,cpassword}=req.body;           // Taking data form user by Destructuring objects
    
    if(!name||!email||!phone||!work||!password||!cpassword){             // All fields should be filled
        return res.status(422).json({error:"Please fill all the fields properply"});
    }
    try{
       const userExist = await User.findOne({email:email});
       
        if(userExist){
            return res.status(422).json({error:"Email already exist"});    //client side error(starts from 400)
        }   else if(password!=cpassword){
            return res.status(422).json({error:"Password are not matching"}); 
        }
        const user=new User({name,email,phone,work,password,cpassword});      //then creating a document by destructuring
        //before saving data ,password to be hashed.(pre save method)
        
        await user.save();
        res.status(201).json({message:" user registerd successfully "});
        
    }catch(err){
        console.log(err);                                                   //if findOne function doesn't execute
    } 
   
});
  //login 
router.post("/signin", async(req,res)=>{
try{
    let token;
     const {email,password}=req.body;
     if(!email||!password){
         return res.status(400).json({error:"please fill the data properly"});
     }
     const userLogin=await User.findOne({email:email});
     //   console.log(userLogin);
     if(userLogin){
        const isMatch=await bcrypt.compare(password,userLogin.password);
       
    if(!isMatch){
        res.status(400).json({error:"Invalid Credentials"});
    }else{ 
         //Generating jwt token and store cookie after the password match
         token = await userLogin.generateAuthToken();
         console.log(token);
 
         res.cookie("jwtoken",token,{                               //  name-value
             expires:new Date(Date.now()+25892000000), 
             httpOnly:true                                         //after 30 days
         });
        
          res.json({message:"Signin successfully"});
         }
     }else{
        res.status(400).json({error:"Invalid Credentials"});
     }
     
  }catch(err){
     console.log(err);
}
});

//about us
        router.get("/about", authenticate ,(req,res)=>{
        res.send(req.rootUser);
    });

//get user data for contact and home page
router.get('/getdata',authenticate,(req,res)=>{
    res.send(req.rootUser);

});
 

//contact us page
router.post("/contact", authenticate,async(req,res)=>{
    try{
        const {name,email,phone,message}=req.body;
        if(!name||!email||!phone||!message){
            console.log("contact us page error")
            return res.json({error:"please fill the contact form"})
        }
        const userContact= await User.findOne({_id:req.userID});
        if(userContact){
            const userMessage= await userContact.addMessage(name,email,phone,message);
            await userContact.save();
            res.status(201).json({message:"user contacted successfully "});
        }

    }catch(e){
       console.log(e);
    }
});

//logout page
router.get("/logout",(req,res)=>{
    console.log("hello my logout page");
    res.clearCookie("jwtoken", {path:'./'});
    res.status(200).send("user Logout");
});











module.exports=router;