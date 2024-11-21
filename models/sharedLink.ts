import mongoose, { Schema, models, model, Document } from "mongoose";

export interface SharedLink extends Document {
  _id?: string;
  url: string;
  noteId: any;
  createdBy: any;
  createdAt?: string;
}

const sharedLinkSchema = new Schema<SharedLink>(
  {
    url: {
      type: String,
      required: true,
      trim: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserModel',
      required: true,
    },
    noteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'NoteModel',
      required: true,
    },
  },
  { timestamps: true }
);

const SharedLinkModel = models.SharedLink || model<SharedLink>("SharedLink", sharedLinkSchema);
export default SharedLinkModel;