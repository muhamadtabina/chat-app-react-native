import { RequestHandler } from "express";
import User from "@/models/User";

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
