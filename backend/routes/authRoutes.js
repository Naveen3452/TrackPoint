import express from "express";

import { userLogin, userRegister } from "../controllers/authController.js";
import { adminOnly, protectRoute } from "../middlewares/authMiddleware.js";

export const authRouter = express.Router();


authRouter.get("/register",(req,res)=>{res.json("welcome to registration")});
authRouter.get("/login",(req,res)=>{res.json("welcome to Login")});  


authRouter.post("/register",protectRoute,adminOnly,userRegister);
authRouter.post("/login",userLogin);
