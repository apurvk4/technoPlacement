const express = require("express");
const handleError = require("../handleError");
const AuthenticateAdmin = require("../middleware/authenticateAdmin");
const bcrypt = require("bcryptjs");
const Admin = require("../model/adminSchema");
const cookieParser = require("cookie-parser");
const router = express.Router();
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
router.use(cookieParser());
// http://localhost:5500/api/admin/signin
router.post("/register", async (req, res) => {
  const { name, email, phone, password, cpassword } = req.body; // Taking data form user by Destructuring objects

  if (!name || !email || !phone || !password || !cpassword) {
    // All fields should be filled
    return res
      .status(422)
      .json({ error: "Please fill all the fields properply" });
  }
  try {
    const adminExist = await Admin.findOne({ email: email });

    if (adminExist) {
      return res.status(422).json({ error: "Email already exist" }); //client side error(starts from 400)
    } else if (password != cpassword) {
      return res.status(422).json({ error: "Password are not matching" });
    }
    const admin = new Admin({ name, email, phone, password, cpassword }); //then creating a document by destructuring
    //before saving data ,password to be hashed.(pre save method)

    await admin.save();
    res.status(201).json({ message: " admin registerd successfully " });
  } catch (err) {
    res.status(401).send(handleError(err));
    console.log(err); //if findOne function doesn't execute
  }
});

router.post("/signin", async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "please fill the data properly" });
    }
    const adminLogin = await Admin.findOne({ email: email });
    //   console.log(adminLogin);
    if (adminLogin) {
      const isMatch = await bcrypt.compare(password, adminLogin.password);

      if (!isMatch) {
        res.status(400).json({ error: "Invalid Credentials" });
      } else {
        //Generating jwt token and store cookie after the password match
        token = await adminLogin.generateAuthToken();
        console.log(token);

        res.cookie("jwtoken", token, {
          //  name-value
          expires: new Date(Date.now() + 25892000000),
          httpOnly: true, //after 30 days
        });

        res.json({ message: "Signin successfully" });
      }
    } else {
      res.status(400).json({ error: "Invalid Credentials" });
    }
  } catch (err) {
    res.status(400).send(handleError(err));
    console.log(err);
  }
});

router.patch("/update", AuthenticateAdmin, async (req, res) => {
  try {
    let doc = {};
    if ("name" in req.body) {
      doc["name"] = req.body.name;
    }
    if ("email" in req.body) {
      doc["email"] = req.body.email;
    }
    if ("phone" in req.body) {
      doc["phone"] = req.body.phone;
    }
    Admin.findOneAndUpdate({ _id: req.adminID }, { $set: doc }).exec(
      (err, adm) => {
        if (err) {
          res.status(400).send(handleError(err));
        } else {
          res.status(201).send(adm);
        }
      }
    );
  } catch (err) {
    res.status(400).send(handleError(err));
  }
});
router.get("/signout", AuthenticateAdmin, async (req, res) => {
  try {
    console.log("hello my logout page");
    await req.rootadmin.tokens.pull(ObjectId(req.token));
    await req.rootadmin.save();
    res.clearCookie("jwtoken", { path: "./" });
    res.status(200).send("user Logout");
  } catch (err) {
    res.status(400).send(handleError(err));
  }
});
module.exports = router;