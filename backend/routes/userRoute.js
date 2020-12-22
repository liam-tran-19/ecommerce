const express = require("express");
const router = express.Router();
const User = require("../models/User");
const util = require("../util");

router.post("/signin", async (req, res) => {
  const signinUser = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (signinUser) {
    res.send({
      _id: signinUser.id,
      name: signinUser.name,
      email: signinUser.email,
      isAdmin: signinUser.isAdmin,
      token: util.getToken(signinUser),
    });
  } else {
    res.status(401).send({ message: "Invalid Email or Password." });
  }
});
router.post("/register", async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  const newUser = await user.save();
  if (newUser) {
    res.send({
      _id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      token: util.getToken(newUser),
    });
  } else {
    res.status(401).send({ message: "Invalid User data" });
  }
});

module.exports = router;
