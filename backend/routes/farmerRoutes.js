const express = require("express");
const {
  getFarmers,
  getFarmerById,
  FarmerImageUpload,
  FarmerFileUpload,
  adminGetFarmers,
  adminDeleteFarmer,
  registerFarmers,
  loginFarmers,
  updateFarmerProfile,
  getFarmerProfile
} = require("../controllers/farmerController");
const router = express.Router()
// const uploadImage =require("../utils/upload")

const { verifyIsLoggedIn,verifyIsAdmin } = require("../middleware/verifyAuthtoken")
router.get("/", getFarmers);
router.get("/get-one/:id", getFarmerById);


router.post("/register", registerFarmers);
router.post("/uploadImage", FarmerImageUpload);
router.post("/uploadFile", FarmerFileUpload);
router.post("/login", loginFarmers);
//farmer logged in routes
router.use(verifyIsLoggedIn);
router.put("/profile", updateFarmerProfile);
router.get("/profile/:id", getFarmerProfile);
// router.post("/transactions",)

//admin routes:
router.use(verifyIsLoggedIn);
router.use(verifyIsAdmin);
router.get("/admin", adminGetFarmers);
router.delete("/admin/:id", adminDeleteFarmer);
module.exports = router;
