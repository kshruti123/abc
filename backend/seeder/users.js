const bcrypt = require("bcryptjs");
const {ObjectId}=require("mongodb");
const users = [
  {
    firstname: "admin",
    lastname: "admin",
    address: "Office",
    area: "office",
    pincode: "512067",
    password: bcrypt.hashSync("0000000000", 10),
    phoneNumber: "0000000000",
    isAdmin: true,
  },
  {
    _id: new  ObjectId("646bfc6e066b5a52cc46b461"),
    firstname: "Suresh",
    lastname: "Kumar",
    address: "flat 456, Sapphire Apartments",
    area: "Manikonda",
    pincode: "512067",
    password: bcrypt.hashSync("9876543210", 10),
    phoneNumber: "9876543210",
  },
];
module.exports = users;
