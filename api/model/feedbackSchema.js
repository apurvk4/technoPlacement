const mongoose = require("mongoose");
//Creating a schema
const feedbackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is needed"],
  },
  email: {
    type: String,
    required: [true, "email is needed"],
  },
  phone: {
    type: Number,
    required: [true, "phone number is needed"],
  },
  message: {
    type: String,
    required: [true, "message is required"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

//creating a collection
const Feedback = mongoose.model("Feedback", feedbackSchema);
module.exports = Feedback;
