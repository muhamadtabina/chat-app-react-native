import { RequestHandler } from "express";
import User from "@/models/User";

export const RegisterUser: RequestHandler = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    await User.create({
      name,
      email,
      password,
    });

    res.status(200).json({
      message: "Register success",
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};
