const Product = require("../models/ProductModel")

const getProducts = async (req, res) => {
    // Product.create({name: "Cow Milk"})
    // res.send("Handling product routes, e.g. search for products")
    try{
const products = await Product.find({}).sort({name:1})
res.json({products})
    }catch(er){
        next(er)
    }
}
module.exports = getProducts
