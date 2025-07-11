import express from "express";
import { RegisterUser } from "@/controllers/auth.controller";

const authRouter = express.Router();

authRouter.post("/register", RegisterUser);

export default authRouter;
