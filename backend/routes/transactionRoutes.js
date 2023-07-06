const express = require("express");
const {
  addTransaction,
  getAllTransaction,
} = require("../controllers/transactionController");
const router = express.Router();
router.post("/get-transaction", getAllTransaction);
router.post("/add-transaction", addTransaction);
module.exports = router;
