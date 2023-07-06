// this product model will be resonsible for quering prodcuts collection from database
const mongoose = require("mongoose");
const Review = require("./ReviewModel");
// const imageSchema = mongoose.Schema({
//   path: {
//     type: String,
//      required: true,
//   },
// });
const farmerSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true, // compulsonry property
    },
    lastname: {
      type: String,
      required: true, // compulsonry property
    },
    password:{
      type: String,
      required: true,
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
    area: { type: String, required: true },
    pincode: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default:0,
    },
    reviewsNumber: {
      type: Number,
      default:0,
    },
    sales: {
      type: Number,
      default: 0,
    },
    isAdmin:{
        type:Boolean,
        required: true,
        default: false,
      },
    // attrs: [{ key: { type: String }, value: { type: String } }],
    //images: [imageSchema],
    images:{
      type: String
    },
    // images:[],
    // reviews: []
    license:{
      type: String,
    },
    // license:[],
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: Review,
      },
    ],
  },
  {
    timestamps: true,
  }
);
farmerSchema.index();
const Farmer = mongoose.model("Farmer", farmerSchema);
// this model will be used for quering products collection to fetch something from products(i.e. farmers in our case)
// farmerSchema.index({ area: "text" });
// we are creating index for and the type of the index
module.exports = Farmer;
