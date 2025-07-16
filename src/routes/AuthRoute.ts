import express from "express";
import { LoginUser, RegisterUser } from "@/controllers/auth.controller";

const authRouter = express.Router();

authRouter.post("/register", RegisterUser);
authRouter.post("/login", LoginUser);

export default authRouter;
