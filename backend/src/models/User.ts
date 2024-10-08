// src/User.ts
import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  phone: string;
  walletAddress: string;
}

const userSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  walletAddress: { type: String, required: true, unique: true },
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
