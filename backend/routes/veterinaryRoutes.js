const express = require('express')
const getVeterinaries = require('../controllers/veterinaryController')
const router = express.Router()

// router.get("/", (req,res) => {
//     res.send("Handling product routes, e.g. search for products")
// })
router.get("/",getVeterinaries)
module.exports = router