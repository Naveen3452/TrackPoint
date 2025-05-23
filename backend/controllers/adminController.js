import projectModel from "../models/project.js";
import userModel from "../models/user.js"

export const getAllClients = async (req,res) => {
   try {
       
     if(req.user.role !== "admin"){return res.json({success:false,message:"Only Admin Can See All Clients!!"})}   
     
     const clients = await userModel.find({role:'client'})
     res.status(200).json({ success: true, clients });
     
   } catch (error) {
        res.status(500).json({ success: false, message: error.message });

   }
}

export const getProjectsByClient = async (req,res) => {
   try {

    if(req.user.role !== "admin"){return res.json({success:false,message:"Only Admin Can See Particular Client Projects!!"})}

    const { clientId } = req.params;
    
    //find that client
    const client = await userModel.findOne({_id:clientId,role:"client"})
    if(!client){return res.status(404).json({success:false,message:"Client Not Found"})}
    
    //find the projects of that client
    const projects = await projectModel.find({ client: clientId });
    res.status(200).json({ success: true, projects });
   } catch (error) {
    res.status(500).json({ success: false, message: error.message });
   }
}




export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find user first
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Delete all projects associated with the user (client)
    await projectModel.deleteMany({ client: userId });

    // Delete the user
    await userModel.findByIdAndDelete(userId);

    res.status(200).json({
      success: true,
      message: `User "${user.name}" and all their projects have been deleted.`,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
