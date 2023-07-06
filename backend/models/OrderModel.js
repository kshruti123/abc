const mongoose = require("mongoose");
const User = require("./UserModel");
const Farmer = require("./FarmerModel");
const Product = require("./ProductModel");

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: User,
    },
    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: Farmer,
    },
    productID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Product,
      required: true,
    },
    productname: { type: String, required: true },
    quantity: { type: Number, required: true },
    frequency: {
      type: String,
      required: true,
      enum: ["Once", "1 month", "3 months", "6 months"],
    },
    OrderDate: {
      type: Date,
    },
    NoOfDaysLeft: {
      type: Number,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    completedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

orderSchema.pre("save", function (next) {
  if (this.frequency === "Once") {
    const currentDate = new Date();
    this.NoOfDaysLeft = 0;
    this.completedAt = currentDate;
  } else {
    const currentDate = new Date();
    let futureDate = new Date(currentDate);

    if (this.frequency === "1 month") {
      futureDate.setMonth(futureDate.getMonth() + 1);
    } else if (this.frequency === "3 months") {
      futureDate.setMonth(futureDate.getMonth() + 3);
    } else if (this.frequency === "6 months") {
      futureDate.setMonth(futureDate.getMonth() + 6);
    }

    this.NoOfDaysLeft = Math.ceil((futureDate - currentDate) / (1000 * 60 * 60 * 24));
    this.OrderDate = currentDate;
    this.completedAt = futureDate;
  }

  next();
});


const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
