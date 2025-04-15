const express = require("express");
const { MongodbList } = require("../models/userList");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require("dotenv").config

const UserRouter = express.Router();

UserRouter.post("/reg", async (req, res) => {
  const { email, password, username } = req.body;
  try {
    bcrypt.hash(password, 5, async function (err, hash) {
      if (err) {
        res.status(200).json({ message: "Error in hasing password" });
      } else {
        // Check if email is unique
        let registeredEmail = await MongodbList.findOne({ email });

        if ( registeredEmail &&  registeredEmail.email == email) {
          res.status(200).json({ message: "User already exits. Please login" });
        } else {
          const newuser = new MongodbList({ email, password: hash, name });
          await newuser.save();
          res.status(200).json({ message: "Registeration successful" });
        }
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Registeration Unsuccessful" });
  }
});

// Login Route

UserRouter.post("/login", async (req, res) => {
  // Login
  const { email, password } = req.body;
  console.log(email, password, "this is user");
  try {
    const user = await MongodbList.findOne({ email });
    console.log(user, "this is user");
    if (user) {
      bcrypt.compare(password, user.password, function (err, result) {
        // result == true
        if (result) {
          var token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET );
          res.status(200).json({ message: "Login successful" , token, userId:user.id});
        } else {
          res.status(200).json({ message: "Wrong email id or Password or problem in hashing" });
        }
      });
    }
    else{
        res.status(200).json({ message: "User does not exits. Please register" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = { UserRouter };