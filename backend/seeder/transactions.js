const { ObjectId } = require("mongodb");
const transactions = [
  {
    farmer: { _id: new ObjectId() },
    amount: "500",
    type: "Income",
    description: "salary",
    date: "2022-05-21",
  },
];
module.exports = transactions;
