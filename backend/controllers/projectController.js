import projectModel from "../models/project.js";
import userModel from "../models/user.js";


export const createProject = async (req,res) =>{
    try {
         const { title, description, clientEmail } = req.body;

    if (!title || !clientEmail) {
      return res.status(400).json({
        success: false,
        message: "Title and client email are required",
      });
    }

    // Find client by email
    const client = await userModel.findOne({ email: clientEmail });

    if (!client || client.role !== "client") {
      return res.status(400).json({
        success: false,
        message: "Invalid client email or user is not a client",
      });
    }
      
    //creating the project
    const project = new projectModel({
        title,
        descriptionHistory:{description},
        client:client._id
    })
    await project.save();

    //sending response
    res.status(201).json({
        success:true,
        message:`the project=${title} is created for ${client.name}`,
        project
    });

    } catch (error) {
          res.status(500).json({ success: false, message: error.message });
  
    }
}

export const getMyProjects = async (req,res) =>{
      try {
           
          if(req.user.role !== "client"){return res.status(403).json({ success: false, message: "Only clients can view their projects" });}


          const clientId = req.user._id;
          if(!clientId){return res.json({success:false,message:"No user Found OR Others"})}

          const projects = await projectModel.find({client:clientId})
          res.status(201).json({success:true,projects})
        
      } catch (error) {
            res.status(500).json({ success: false, message: error.message });
      }
}

export const updateProjectStatus = async (req,res) => {
  const { projectId } = req.params;
  const { status } = req.body;
  
  try {
    
    const project = await projectModel.findById(projectId);
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    //from updated status by admin
    project.status = status;
    await project.save();
    res.json({ success: true, message: "Status updated", project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export const editProject = async (req, res) => {
  const { projectId } = req.params;
  const { title, description } = req.body;

  try {
    const project = await projectModel.findById(projectId);
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    if (title) project.title = title;

    if (description) {
      project.descriptionHistory.push({
        description: description,
        date: new Date(),
      });
    }

    await project.save();

    res.json({ success: true, message: "Project updated", project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};




export const deleteProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await projectModel.findById(projectId);
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    await projectModel.findByIdAndDelete(projectId);

    res.status(200).json({
      success: true,
      message: `Project "${project.title}" deleted successfully`,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
