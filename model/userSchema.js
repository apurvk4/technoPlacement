const jwt =require("jsonwebtoken");
const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");
//Creating a schema
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        required:true,
    },
    work:{
        type:String,
        required:true,
    },
    
    password:{
        type:String,
        required:true,
    },
    cpassword:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now
    },
    messages:[{
        name:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
        },
        phone:{
            type:Number,
            required:true,
        },
         message:{
            type:String,
            required:true,
        },
      }
    ],
   tokens:[
       {
           token:{
            type:String,
            required:true,
           }
       }
   ]  
})


//we are hashing the password
//it is the middleware between req.body and save method
userSchema.pre("save",async function(next){                       //pre method(before save function, what to implement)

    if(this.isModified("password")) {                                  //only if user password is modified
       this.password=await bcrypt.hash(this.password, 12);
       this.cpassword= await bcrypt.hash(this.cpassword, 12);
   }                            
   next();
});


  //we are generating a token
  userSchema.methods.generateAuthToken=async function(){
      try{
               
             let token =jwt.sign({_id:this._id},process.env.SECRET_KEY);
             this.tokens=this.tokens.concat({token:token});
             await this.save();
             return token;
             
       }catch(err){
          console.log(err);
      }
  }
  //storing the message
  userSchema.methods.addMessage=async function(name,email,phone,message){
      try{ 
          this.messages=this.messages.concat({name,email,phone,message});
          await this.save();
          return this.messages;

      }catch(err){
          console.log(err);
      }

  }

//creating a collection
const User= mongoose.model('User', userSchema);
module.exports=User;