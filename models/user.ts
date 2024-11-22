import mongoose, { Schema, models } from "mongoose";

export interface User {
  username?: string;
  email?: string;
  password?: string;
}

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const UserModel = models.User || mongoose.model("User", userSchema);
export default UserModel;