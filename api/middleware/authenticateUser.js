const User = require("../model/userSchema");
const jwt = require("jsonwebtoken");

const AuthenticateUser = async (req, res, next) => {
  try {
    const token = req.cookies.jwtoken; //getting the token

    console.log(token);
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY); //Verifying token
    //vertifyToken have all the info(collection)
    const rootUser = await User.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    }); //checking if token exist

    if (!rootUser) {
      throw { message: "user not found" };
    }
    req.token = token;
    req.rootUser = rootUser; //rootuser have the document
    req.userID = rootUser._id; //fetching id of that particular document from rootUser
    console.log(rootUser);

    next();

    console.log("me andar aagya");
  } catch (err) {
    res.status(401).send({ message: "unauthorised:no Token provided" });
    console.log(err);
  }
};
module.exports = AuthenticateUser;
