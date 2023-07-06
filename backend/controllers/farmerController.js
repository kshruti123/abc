const Farmer = require("../models/FarmerModel");
const { hashPassword, comparePasswords } = require("../utils/hashPasswords");
const generateAutthToken = require("../utils/generateAuthToken");
const recordsPerPage = require("../config/pagination");
const imageValidate = require("../utils/imageValidate");
const licenseValidate = require("../utils/licenseValidate");
const express = require("express");

const getFarmers = async (req, res, next) => {
  try {
    //filter
    let query = {};
    let queryCondition = false;
    let areaQueryCondition = {};
    if (req.query.area) {
      queryCondition = true;
      const area = req.query.area.trim();
      areaQueryCondition = { area: { $regex: new RegExp(`^${area}$`, "i") } };
    }
    let ratingQueryCondition = {};
    if (req.query.rating) {
      queryCondition = true;
      ratingQueryCondition = { rating: { $in: req.query.rating.split(",") } };
    }
    query = { $and: [areaQueryCondition, ratingQueryCondition] };

    //pagination
    const pageNum = Number(req.query.pageNum) || 1;
    const totalFarmers = await Farmer.countDocuments(query);
    const farmers = await Farmer.find(query)
      .skip(recordsPerPage * (pageNum - 1))
      .sort({ firstname: 1 })
      .limit(recordsPerPage);
    res.json({
      farmers,
      pageNum,
      paginationLinksNumber: Math.ceil(totalFarmers / recordsPerPage),
    });
  } catch (er) {
    next(er);
  }
};
const registerFarmers = async (req, res, next) => {
  try {
    const {
      firstname,
      lastname,
      phoneNumber,
      password,
      pincode,
      area,
      address,
    } = req.body;
    if (
      !(
        firstname &&
        lastname &&
        phoneNumber &&
        password &&
        pincode &&
        area &&
        address
      )
    ) {
      return res.status(400).json({ error: "All inputs are required" });
    }
    const farmerExists = await Farmer.findOne({ phoneNumber });
    if (farmerExists) {
      return res.status(400).send("farmer exists");
    } else {
      const hashedPassword = hashPassword(password);
      const farmer = await Farmer.create({
        firstname,
        lastname,
        phoneNumber,
        password: hashedPassword,
        pincode: pincode,
        area: area,
        address: address,
      });
      const token = generateAutthToken(
        farmer._id,
        farmer.firstname,
        farmer.lastname,
        farmer.phoneNumber,
        farmer.isAdmin
      );
      res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: process.env.NOdE_ENV === "prodcution",
          sameSite: "strict",
        })
        .status(201)
        .json({
          success: "Farmer Created",
          farmerCreated: {
            _id: farmer._id,
            firstname: farmer.firstname,
            lastname: farmer.lastname,
            phoneNumber: farmer.phoneNumber,
            isAdmin: farmer.isAdmin,
          },
        });
    }
  } catch (er) {
    console.error("Error:", er);
    next(er);
  }
};
const loginFarmers = async (req, res, next) => {
  try {
    const { phoneNumber, password, doNotLogout } = req.body;
    if (!(phoneNumber && password)) {
      return res.status(400).send("All inuts are required");
    }
    const farmer = await Farmer.findOne({ phoneNumber });
    if (farmer && comparePasswords(password, farmer.password)) {
      let cookieParams = {
        httpOnly: true,
        secure: process.env.NOdE_ENV === "prodcution",
        sameSite: "strict",
      };
      if (doNotLogout) {
        cookieParams = { ...cookieParams, maxAge: 1000 * 60 * 60 * 24 * 1 };
      }
      return res
        .cookie(
          "access_token",
          generateAutthToken(
            farmer._id,
            farmer.firstname,
            farmer.lastname,
            farmer.phoneNumber,
            farmer.isAdmin
          ),
          cookieParams
        )
        .json({
          success: "farmer logged in",
          farmerLoggedIn: {
            _id: farmer._id,
            firstname: farmer.firstname,
            lastname: farmer.lastname,
            phoneNumber: farmer.phoneNumber,
            isAdmin: farmer.isAdmin,
            doNotLogout,
          },
        });
    } else {
      return res.status(401).send("wrong credentials");
    }
  } catch (er) {
    next(er);
  }
};
const getFarmerById = async (req, res, next) => {
  try {
    const farmer = await Farmer.findById(req.params.id)
      .populate("reviews")
      .orFail();
    res.json(farmer);
  } catch (er) {
    next(er);
  }
};

const FarmerImageUpload = async (req, res, next) => {
  if (req.query.cloudinary === "true") {
    try {
      let farmer = await Farmer.findById(req.query.farmerId).orFail();
      farmer.images = req.body.url ;
      await farmer.save();
    } catch (er) {
      next(er);
    }
  }
  // try {
  //   if (!req.files || !req.files.images) {
  //     return res.status(400).send("No file was uploaded.");
  //   }

  //   const validateResult = imageValidate(req.files.images);
  //   if (validateResult.error) {
  //     return res.status(400).send(validateResult.error);
  //   }

  //   const path = require("path");
  //   const { v4: uuidv4 } = require("uuid");
  //   const uploadDirectory = path.resolve(
  //     __dirname,
  //     "../../frontend",
  //     "public",
  //     "images",
  //     "farmerImages"
  //   );

  //   const farmer = await Farmer.findById(req.query.farmerId).orFail();
  //   const imageFile = req.files.images;
  //   const fileName = uuidv4() + path.extname(imageFile.name);
  //   const uploadPath = uploadDirectory + "/" + fileName;

  //   imageFile.mv(uploadPath, function (err) {
  //     if (err) {
  //       return res.status(500).send(err);
  //     }
  //   });

  //   farmer.images = "/images/farmerImages/" + fileName;
  //   await farmer.save();

  //   return res.send("Image Uploaded");
  // } catch (error) {
  //   next(error);
  // }
};

const FarmerFileUpload = async (req, res, next) => {
  if (req.query.cloudinary === "true") {
    try {
      let farmer = await Farmer.findById(req.query.farmerId).orFail();
      farmer.license = req.body.url ;
      await farmer.save();
    } catch (er) {
      next(er);
    }
  }
  // try {
  //   if (!req.files || !req.files.license) {
  //     return res.status(400).send("No file was uploaded.");
  //   }

  //   const validateResult = licenseValidate(req.files.license);
  //   if (validateResult.error) {
  //     return res.status(400).send(validateResult.error);
  //   }

  //   const path = require("path");
  //   const { v4: uuidv4 } = require("uuid");
  //   const uploadDirectory = path.resolve(
  //     __dirname,
  //     "../../frontend",
  //     "public",
  //     "images",
  //     "farmerLicenses"
  //   );

  //   const farmer = await Farmer.findById(req.query.farmerId).orFail();
  //   const licenseFile = req.files.license;
  //   const fileName = uuidv4() + path.extname(licenseFile.name);
  //   const uploadPath = uploadDirectory + "/" + fileName;

  //   licenseFile.mv(uploadPath, function (err) {
  //     if (err) {
  //       return res.status(500).send(err);
  //     }
  //   });

  //   farmer.license = "/images/farmerLicenses/" + fileName;
  //   await farmer.save();

  //   return res.send("License Uploaded");
  // } catch (error) {
  //   next(error);
  // }
};

const adminGetFarmers = async (req, res, next) => {
  try {
    console.log(req.farmer);
    const farmers = await Farmer.find({})
      .sort({ area: 1 })
      .select("firstname lastname phoneNumber");
    return res.json(farmers);
  } catch (err) {
    next(err);
  }
};
const adminDeleteFarmer = async (req, res, next) => {
  try {
    const farmer = await Farmer.findById(req.params.id).orFail();
    await farmer.deleteOne();
    return res.json({ message: "Farmer removed" });
  } catch (err) {
    next(err);
  }
};
const updateFarmerProfile = async (req, res, next) => {
  try {
    const farmer = await Farmer.findById(req.farmer._id).orFail();
    farmer.firstname = req.body.firstname || farmer.firstname;
    farmer.lastname = req.body.lastname || farmer.lastname;
    farmer.phoneNumber = req.body.phoneNumber;
    farmer.address = req.body.address;
    farmer.area = req.body.area;
    farmer.pincode = req.body.pincode;
    if (req.body.password !== farmer.password) {
      farmer.password = hashPassword(req.body.password);
    }
    await farmer.save();
    res.json({
      success: "farmer updated",
      farmerUpdated: {
        _id: farmer._id,
        firstname: farmer.firstname,
        lastname: farmer.lastname,
        phoneNumber: farmer.phoneNumber,
        isAdmin: farmer.isAdmin,
      },
    });
  } catch (er) {
    next(er);
  }
};
const getFarmerProfile = async (req, res, next) => {
  try {
    const farmer = await Farmer.findById(req.params.id).orFail();
    return res.send(farmer);
  } catch (er) {
    next(er);
  }
};
module.exports = {
  getFarmers,
  getFarmerById,
  FarmerImageUpload,
  FarmerFileUpload,
  adminGetFarmers,
  adminDeleteFarmer,
  registerFarmers,
  loginFarmers,
  updateFarmerProfile,
  getFarmerProfile,
};
