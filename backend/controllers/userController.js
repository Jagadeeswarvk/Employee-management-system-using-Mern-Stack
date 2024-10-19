const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const signupSchema = Joi.object({
  userName: Joi.string().min(6).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  userName: Joi.string().min(6).required(),
  password: Joi.string().min(6).required(),
});

exports.login = async (req, res) => {
  const { error, value } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).send({ error: error.details[0].message });
  }
  const { userName, password } = req.body;
  try {
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(404).send("user not found");
    }
    const passwordValid = await bcrypt.compare(password, user.password);
    if (passwordValid) {
      const token = jwt.sign({ _id: user._id }, process.env.SECRET_TOKEN, {
        expiresIn: "1h",
      });
      console.log(token);
      return res.header("auth-token", token).send(token);
    } else {
      return res.status(404).send("invalid password");
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

exports.signup = async (req, res) => {
  const { error, value } = signupSchema.validate(req.body);
  if (error) {
    return res.status(400).send({ error: error.details[0].message });
  }
  const { userName, email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      console.log("user already existed");
      return res.status(400).json({ error: "user already existed" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
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
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
