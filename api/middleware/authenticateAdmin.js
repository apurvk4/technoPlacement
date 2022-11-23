const admin = require("../model/adminSchema");
const jwt = require("jsonwebtoken");

const AuthenticateAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.jwtoken; //getting the token
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY); //Verifying token
    //vertifyToken have all the info(collection)
    const rootadmin = await admin.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    }); //checking if token exist

    if (!rootadmin) {
      res.status(401).send({ message: "admin not found!!" });
      return;
    }
    req.token = token;
    req.rootadmin = rootadmin; //rootadmin have the document
    req.adminID = rootadmin._id; //fetching id of that particular document from rootadmin
    console.log(rootadmin);

    next();
  } catch (err) {
    res.status(401).send({ message: "unauthorised:no Token provided" });
  }
};
module.exports = AuthenticateAdmin;
