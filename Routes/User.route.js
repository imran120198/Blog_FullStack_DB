const { Router } = require("express");
const UserRoutes = Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { UserModel } = require("../Model/User.model");

//Signup Route
UserRoutes.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  const Existmail = await UserModel.findOne({ email });

  if (Existmail) {
    res.send({ message: "Email Already Exist" });
  } else {
    bcrypt.hash(password, 5, async function (err, hash) {
      if (err) {
        res.send({ message: "Something went wrong in signup", err });
      } else {
        const newUser = new UserModel({
          username: username,
          email: email,
          password: hash,
        });
        const saveSignupData = newUser.save();
        res.send({ message: "Signup Successfull", saveSignupData });
      }
    });
  }
});

//Login Route
UserRoutes.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  const hash = user.password;

  bcrypt.compare(password, hash, (err, result) => {
    if (err) {
      res.send({ message: "Something went wrong in login", err });
    }
    if (result) {
      //Incase password match
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
      res.send({ message: "Login Successfull", token });
    } else {
      //Incase of error
      res.send("Invalid Credentials");
    }
  });
});

module.exports = {
  UserRoutes,
};
