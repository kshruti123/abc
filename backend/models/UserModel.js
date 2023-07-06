const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: true, // compulsonry property
  },
  lastname: {
    type: String,
    required: true, // compulsonry property
  },
  // email: {
  //   type: String,
  //   required: true, // compulsonry property
  //   unique: true,
  // },
  phoneNumber: {
    type: String,
    required: true, // compulsonry property
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  // district: {
  //   type: String,
  //   required: true,
  // },
  pincode: {
    type: String,
    required: true,
  },
  // state:{
  //   type: String,
  //   required: true,
  // },
  password:{
    type: String,
    required: true,
  },
  isAdmin:{
    type:Boolean,
    required: true,
    default: false,
  },
},
{
  timestamps: true,
});
const User = mongoose.model("User", userSchema);
module.exports = User;
