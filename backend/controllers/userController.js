const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.login = async (req, res) => {
  const { userName, password } = req.body;
  console.log(req.body);
  try {
    const user = await User.findOne({ userName });
    const passwordValid = await bcrypt.compare(password, user.password);
    if (passwordValid) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

exports.signup = async (req, res) => {
  const { userName, email, password } = req.body;
  console.log(req.body);
  try {
    const user = await User.findOne({ email });
    if (user) {
      console.log("user already existed");
      return res.status(400).json({ error: "user already existed" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const newUser = await User.create({
        userName,
        email,
        password: hashedPassword,
      });
      res.status(200).json(newUser);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
    // const newUser = await User.create({
    //     userName,
    //     email,
    //     password: hashedPassword,
    // })
    // res.send(201).json({});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
