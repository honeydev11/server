import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import User from "../models/user.js";

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("Invalid email or password.");
  }

  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    res.status(400);
    throw new Error("Invalid email or password.");
  }

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.json({
    name: user.name,
    email: user.email,
    token: token,
  });
});

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const hashPassword = bcrypt.hashSync(password, 10);
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("Unable to create account with this email");
  }

  const user = new User({
    name,
    email,
    password: hashPassword,
  });

  const createdUser = await user.save();
  const token = jwt.sign({ _id: createdUser._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.json({
    message: "User Created Successfully",
  });
});
