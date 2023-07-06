const express = require("express");
const app = express();
const farmerRoutes = require("./farmerRoutes");
const categoryRoutes = require("./categoryRoutes");
const userRoutes = require("./userRoutes");
const orderRoutes = require("./orderRoutes");
const productRoutes = require("./productRoutes");
const jwt = require("jsonwebtoken");

app.get("/get-token", (req, res) => {
    try {
        const accessToken = req.cookies["access_token"];
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
        return res.json({ token: decoded.firstname, isAdmin: decoded.isAdmin });
    } catch (err) {
        return res.status(401).send("Unauthorized. Invalid Token");
    }
})
app.get("/logout", (req, res) => {
  return res.clearCookie("access_token").send("access token cleared");
});

// const transactionRoutes = require("./transactionRoutes");
// const veterinaryRoutes=require("./veterinaryRoutes");
app.use(express.json());
app.use("/farmers", farmerRoutes);
app.use("/categories", categoryRoutes);
app.use("/users", userRoutes);
app.use("/orders", orderRoutes);
app.use("/products", productRoutes);
// app.use("/transaction", transactionRoutes);
// app.use("/veterinary",veterinaryRoutes);
module.exports = app;
