const Transaction = require("../models/TransactionModel");
const getAllTransaction = async (req, res, next) => {
  try {
    const transactions = await Transaction.find({farmer:req.body.farmer});
    res.status(200).json(transactions);
  } catch (er) {
    console.log(er);
    // next(er);
    res.status(500).json(er);
  }
};
const addTransaction = async (req, res, next) => {
  try {
    const totalTransactions = new Transaction(req.body);
    await totalTransactions.save();
    res.status(201).send("Transaction Created");
  } catch (er) {
    console.log(er);
    // next(er);
    res.status(500).json(er);
  }
};
module.exports = { getAllTransaction, addTransaction };
