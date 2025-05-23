import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import userModel from "../models/user.js";

//User Registering

export const userRegister = async (req,res) => {

    
    const {name , email , password } = req.body;

    if(!name || !email || !password ){
        return res.json({success:false , message:"all fields are required"})
    }
    
    try {

          const existingUser = await userModel.findOne({email});
          if(existingUser){
            return res.json({success:false , message:"already registerd "})
          }

          const hashedPassword = await bcrypt.hash(password,10)

          const User = new userModel({
            name,email,password:hashedPassword,role:'client'
          });
          await User.save();

          const token = jwt.sign({id:User._id},process.env.JWT,{expiresIn:'7d'})
          //send the data with cookie
          res.cookie('jwttoken',token,{
            httponly:true,
            secure:process.env.NODE_ENV === 'production',
            sameSite:process.env.NODE_ENV === 'production'? 'none' : 'strict',
            maxAge : 7 * 24 * 60 * 60 *1000
          })

           //send response
          res.json({
              success: true,
              message: "Registered successful",
              user: {
                id: User._id,
                name: User.name,
                email: User.email
              }
          });
        
    } catch (error) {
        res.json({success:false,message:error.message})
    }
    
}

//login 
export const userLogin = async (req,res) => {
      const {email , password} = req.body;
      if(!email || !password){
        return res.json({success:false , message:"all fields are required"})
      }
      //is user available
      const User = await userModel.findOne({email});
      if(!User){res.json({success:false,message:'No User Found Or Wrong Email'})}

      //is password matching
      const isMatch = bcrypt.compare(password,User.password);
      if(!isMatch){ return res.json({success:false , message:"Wrong Password"})}


      //genertate JWT token
      const token = jwt.sign({id:User._id},process.env.JWT,{expiresIn:'7d'})
          //send the data with cookie
          res.cookie('jwttoken',token,{
            httponly:true,
            secure:process.env.NODE_ENV === 'production',
            sameSite:process.env.NODE_ENV === 'production'? 'none' : 'strict',
            maxAge : 7 * 24 * 60 * 60 *1000
          })

      //final responce
      res.json({
              success: true,
              message: "Login successful",
              user: {
                id: User._id,
                name: User.name,
                email: User.email
              }
          });
  }
