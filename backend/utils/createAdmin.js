import bcrypt from "bcryptjs";
import userModel from "../models/user.js";

export const createAdmin = async (req,res) => {
    try {
        const existingUser = await userModel.findOne({role:'admin'})
        if(existingUser){
            console.log("Admin already existing"); 
            return }
        
        const password = "admin123"
        const hashedPassword = await bcrypt.hash(password,10)
        const adminUser = new userModel({
           name:"admin",
           email:"admin@gmail.com",
           password:hashedPassword,
           role:'admin',
        })

        await adminUser.save();
        // res.json({succes:false, message:"Admin Already Created"})
        console.log("admin created successfully");
        
    } catch (error) {
        console.error('Error creating default admin:', error);
    }
}