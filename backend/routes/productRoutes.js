const express = require('express')
const getProducts = require('../controllers/productController')
const router = express.Router()

// router.get("/", (req,res) => {
//     res.send("Handling product routes, e.g. search for products")
// })
router.get("/",getProducts)
module.exports = router