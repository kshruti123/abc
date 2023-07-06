const jwt = require("jsonwebtoken");
const generateAutthToken = (_id, firstname, lastname, phoneNumber, isAdmin) => {
  return jwt.sign(
    { _id, firstname, lastname, phoneNumber, isAdmin },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "7h" }
  );
};
module.exports=generateAutthToken;