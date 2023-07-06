const mongoose = require("mongoose");
const Farmer = require("./FarmerModel");
const transactionSchema = mongoose.Schema(
  {
    farmer: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: Farmer,
      },
    amount: {
      type: String,
      required: [true],
    },
    type:{
        type:String,
        required: [true],
    },
    // category: {
    //   type: String,
    //   required: [true],
    // },
    description: {
      type: String,
      required: [true],
    },
    date: {
      type: String,
      required: [true],
    },
  },
  {
    timestamps: true,
  }
);
const Tansaction = mongoose.model("Transaction", transactionSchema);
module.exports = Tansaction;
