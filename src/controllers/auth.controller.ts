import { RequestHandler } from "express";
import User from "@/models/User";
import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET!;

export const RegisterUser: RequestHandler = async (req, res) => {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });

  res.status(200).json({
    message: "Register success",
  });
};

export const LoginUser: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  // Validation 1 : email and password are not filled in
  if (!email || !password) {
    res.status(422).json({
      message: "Email and password must be filled in",
    });
    return;
  }

  // Validation 2 : email already registered
  const userEmail = await User.findOne({ email });

  if (!userEmail) {
    res.status(403).json({
      message: "Email not registered",
    });
    return;
  }

  // Validation 3 : compare password
  const isPasswordMatched = await userEmail.comparePassword(password);

  if (!isPasswordMatched) {
    res.status(403).json({
      message: "Wrong password",
    });
  }

  const accessToken = jwt.sign({ id: userEmail._id }, jwtSecret);

  userEmail.token = accessToken;
  await userEmail.save();

  res.status(200).json({
    message: "Login success",
    user: {
      id: userEmail._id,
      name: userEmail.name,
      email: userEmail.email,
      avatar: userEmail.avatar?.url,
    },
    token: accessToken,
  });
};
