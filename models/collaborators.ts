import mongoose, { Schema, models } from "mongoose";

const collaboratorSchema = new mongoose.Schema({
  noteId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Note', 
    required: true 
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  role: { 
    type: String, 
    enum: ['owner', 'collaborator'], 
    required: true 
  },
},
{ timestamps: true }
);

const Collaborators = models.Collaborators || mongoose.model("Collaborators", collaboratorSchema);
export default Collaborators;