import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import ConnectDB from "./config/db.js";
import { authRouter } from "./routes/authRoutes.js";
import { createAdmin } from "./utils/createAdmin.js";
import { projectRouter } from "./routes/projectRoutes.js";


dotenv.config();

//conectin mongoDB
await ConnectDB();
//create Admin Once
await createAdmin()

//server setup
const app = express();

// Middlewares
app.use(cookieParser());
app.use(cors());
app.use(express.json());



//routes
app.get("/",(req,res)=>{res.send("starterd .,,.")});
app.use("/api/auth",authRouter);
app.use("/api/project",projectRouter);


const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`App is running on http//localhost:${PORT}`);
    
})