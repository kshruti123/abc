const mongoose = require("mongoose")
const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    // attrs: [
    //     {key: {type: String}, value: {type: String}}
    //     // [{ key: "color", value: "red" }, { key: "size", value: "1 TB" }]
    // ],
}, {
    timestamps: true,
})
productSchema.index()
const Product = mongoose.model("Product", productSchema)

module.exports = Product
