// const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
// const bcrypt = require("bcryptjs");
//Creating a schema
const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "course name is required"],
  },
  courseType: {
    type: String,
    enum: ["Article", "Mcq", "Coding"],
  },
  articleBody: {
    type: String,
  },
  details: {
    type: String,
  },
  codingExamples: {
    type: [
      {
        example: {
          type: String,
          required: [true, "Example is required !!"],
        },
      },
    ],
  },
  codingLinks: {
    type: [
      {
        link: {
          type: String,
          required: [true, "Coding Links are required !!"],
        },
      },
    ],
  },
  author: {
    type: ObjectId,
    required: [true, "authors id is required !!"],
  },
  tags: {
    type: [
      {
        type: String,
        required: [true, "topic tags are required !!"],
      },
    ],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  mcqs: {
    type: [
      {
        question: {
          type: String,
          required: [true, "question body is required"],
        },
        option1: {
          type: String,
          required: [true, "option1 is required"],
        },
        option2: {
          type: String,
          required: [true, "option2 is required"],
        },
        option3: {
          type: String,
          required: [true, "option3 is required"],
        },
        option4: {
          type: String,
          required: [true, "option4 is required"],
        },
        answer: {
          type: String,
          enum: ["option1", "option2", "option3", "option4"],
        },
      },
    ],
  },
});

//we are hashing the password
//it is the middleware between req.body and save method
// courseSchema.pre("save", async function (next) {
//   //pre method(before save function, what to implement)

//   if (this.isModified("password")) {
//     //only if user password is modified
//     this.password = await bcrypt.hash(this.password, 12);
//     this.cpassword = await bcrypt.hash(this.cpassword, 12);
//   }
//   next();
// });

//we are generating a token
// courseSchema.methods.generateAuthToken = async function () {
//   try {
//     let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
//     this.tokens = this.tokens.concat({ token: token });
//     await this.save();
//     return token;
//   } catch (err) {
//     console.log(err);
//   }
// };
//   //storing the message
//   userSchema.methods.addMessage=async function(name,email,phone,message){
//       try{
//           this.messages=this.messages.concat({name,email,phone,message});
//           await this.save();
//           return this.messages;

//       }catch(err){
//           console.log(err);
//       }

//   }

//creating a collection
const Course = mongoose.model("course", courseSchema);
module.exports = Course;