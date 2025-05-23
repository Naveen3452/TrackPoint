import mongoose from "mongoose";

const projectSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
     descriptionHistory: [
    {
      description: String,
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",       // Reference to User collection for population
      required: true,
    },
    status: {
    type: String,
    enum: ["In Progress", "Completed", "Pending", "On Hold"],
    default: "In Progress",
  },
  },
  { timestamps: true }
);

const projectModel =
  mongoose.models.Project || mongoose.model("Project", projectSchema);

export default projectModel;
