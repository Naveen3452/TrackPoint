import express from "express";
import { protectRoute, adminOnly } from "../middlewares/authMiddleware.js";
import {
  createProject,
  getMyProjects,
  updateProjectStatus,
  editProject,
  deleteProject,
} from "../controllers/projectController.js";
import { deleteUser, getAllClients, getProjectsByClient } from "../controllers/adminController.js";

export const projectRouter = express.Router();
//app.use("/api/project",projectRouter);


// Admin - Create new project for client
projectRouter.post("/createproject", protectRoute, adminOnly, createProject);

// Client - View own projects
projectRouter.get("/my", protectRoute, getMyProjects);

// Admin - View all clients
projectRouter.get("/clients", protectRoute, adminOnly, getAllClients);

// Admin - View all projects of a particular client
projectRouter.get("/clients/:clientId/projects", protectRoute, adminOnly, getProjectsByClient);

// Admin - Update status of project
projectRouter.put("/status/:projectId", protectRoute, adminOnly, updateProjectStatus);

// Admin - Edit project description/title (maintain history)
projectRouter.put("/edit/:projectId", protectRoute, adminOnly, editProject);

// Admin - Delete a project
projectRouter.delete("/deleteproject/:projectId", protectRoute, adminOnly, deleteProject);

// Admin - Delete a user
projectRouter.delete("/deleteuser/:userId", protectRoute, adminOnly, deleteUser);











