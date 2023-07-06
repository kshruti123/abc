const User = require("../models/UserModel");
const Review = require("../models/ReviewModel");
const Farmer = require("../models/FarmerModel");
const mongoose = require('mongoose');
const { hashPassword, comparePasswords } = require("../utils/hashPasswords");
const generateAutthToken = require("../utils/generateAuthToken");
const getUsers = async (req, res, next) => {
  // Farmer.create({name:"Raju"})
  // res.send("Handling user routes, e.g. search for users")
  try {
    const users = await User.find({}).select("-password");
    return res.json(users);
  } catch (er) {
    next(er);
  }
};
const registerUsers = async (req, res, next) => {
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
    const userExists = await User.findOne({ phoneNumber });
    if (userExists) {
      return res.status(400).send("user exists");
    } else {
      const hashedPassword = hashPassword(password);
      const user = await User.create({
        firstname,
        lastname,
        phoneNumber,
        password: hashedPassword,
        pincode: pincode,
        area: area,
        address: address,
      });
      const token = generateAutthToken(user._id, user.firstname, user.lastname, user.phoneNumber, user.isAdmin);
      res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: process.env.NOdE_ENV === "prodcution",
          sameSite: "strict",
        })
        .status(201).json({
          success: "User Created",
          userCreated: {
            _id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            phoneNumber: user.phoneNumber,
            isAdmin: user.isAdmin,
          },
        });
    }
  } catch (er) {
    console.error("Error:", er);
    next(er);
  }
};
const loginUsers = async (req, res, next) => {
  try {
    const { phoneNumber, password, doNotLogout } = req.body;
    if (!(phoneNumber && password)) {
      return res.status(400).send("All inuts are required");
    }
    const user = await User.findOne({ phoneNumber });
    if (user && comparePasswords(password, user.password)) {
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
            user._id,
            user.firstname,
            user.lastname,
            user.phoneNumber,
            user.isAdmin
          ),
          cookieParams
        )
        .json({
          success: "user logged in",
          userLoggedIn: {
            _id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            phoneNumber: user.phoneNumber,
            isAdmin: user.isAdmin,
            doNotLogout,
          },
        });
    } else {
      return res.status(401).send("wrong credentials");
    }
  } catch (er) {
    next(er);
  }};
const updateUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).orFail();
    user.firstname = req.body.firstname || user.firstname;
    user.lastName = req.body.lastname || user.lastname;
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
    user.address = req.body.address||user.address;
    user.area = req.body.area||user.area;
    user.pincode = req.body.pincode||user.pincode;
    if (req.body.password !== user.password) {
      user.password = hashPassword(req.body.password);
    }
    await user.save();

    res.json({
      success: "user updated",
      userUpdated: {
        _id: user._id,
        firstname: user.firstname,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        isAdmin: user.isAdmin,
      },
    });
  } catch (err) {
    next(err);
  }
};
const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).orFail();
    return res.send(user);
  } catch (er) {
    next(er);
  }
};
const writeReview = async (req, res, next) => {
  const session = await mongoose.startSession();
  try {
    // get comment, rating from request.body:
    const { comment, rating } = req.body;
    // validate request:
    if (!(comment && rating)) {
      return res.status(400).send("All inputs are required");
    }

    // create review id manually because it is needed also for saving in Product collection
    const ObjectId = require("mongodb").ObjectId;
    let reviewId = new ObjectId();
    session.startTransaction();
    await Review.create([
      {
        _id: reviewId,
        comment: comment,
        rating: Number(rating),
        user: {
          _id: req.user._id,
          firstname: req.user.firstname,
          lastname: req.user.lastname,
        },
      },
    ]);

    const farmer = await Farmer.findById(req.params.farmerId).populate(
      "reviews"
    );
    // res.send(product)
    const alreadyReviewed = farmer.reviews.find(
      (r) => r.user._id.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).send("product already reviewed");
    }
    let frc = [...farmer.reviews];
    frc.push({ rating: rating });
    farmer.reviews.push(reviewId);
    if (farmer.reviews.length === 1) {
      farmer.rating = Number(rating);
      farmer.reviewsNumber = 1;
    } else {
      farmer.reviewsNumber = farmer.reviews.length;
      let ratingCalc =
        prc
          .map((item) => Number(item.rating))
          .reduce((sum, item) => sum + item, 0) / farmer.reviews.length;
          farmer.rating=Math.round(ratingCalc)
    }
    await farmer.save();
    await session.commitTransaction();
    session.endSession();
    res.send("review created");
  } catch (err) {
    await session.abortTransaction();
    // session.endSession();
    next(err);
  }
};
const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
      .select("firstname lastname phoneNumber isAdmin")
      .orFail();
    return res.send(user);
  } catch (er) {
    next(er);
  }
};
const updateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).orFail();
    user.firstname = req.body.firstname || user.firstname;
    user.lastname = req.body.lastname || user.lastname;
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
    user.isAdmin = req.body.isAdmin || user.isAdmin;
    await user.save();
    return res.send("user updated");
  } catch (er) {
    next(er);
  }
};
const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndRemove(req.params.id).orFail();
    // await user.remove();
    res.send("user removed");
  } catch (er) {
    next(er);
  }
};

module.exports = {
  getUsers,
  registerUsers,
  loginUsers,
  updateUserProfile,
  getUserProfile,
  writeReview,
  getUser,
  updateUser,
  deleteUser,
};
