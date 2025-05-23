import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: { type:String , required:true},
    email: { type:String , required:true, unique:true},
    password: {type:String , required:true},
     role: {type:String , enum:["admin" , "client" ], default:"client"}
},
{timestamps:true})

const userModel = mongoose.models.user || mongoose.model("User",userSchema);
export default userModel;