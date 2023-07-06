
const express = require('express')
const {getCategories,newCategories,deleteCategories} = require('../controllers/categoryController')
const router = express.Router()

// router.get("/", (req,res) => {
//     res.send("Handling product routes, e.g. search for products")
// })
router.get("/",getCategories)
router.post("/",newCategories)
router.delete("/:category",deleteCategories)//category is a dynamic parmeters
module.exports = router
