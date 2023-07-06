const mongoose = require("mongoose");
const veterinarySchema = mongoose.Schema({
  firstname: {
    type: String,
    required: true, // compulsonry property
  },
  lastname: {
    type: String,
    required: true, // compulsonry property
  },
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
  pincode: {
    type: String,
    required: true,
  },
},
{
  timestamps: true,
});
const Veterinary = mongoose.model("Veterinary", veterinarySchema);
module.exports = Veterinary;
