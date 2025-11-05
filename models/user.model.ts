import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  email: string;
  name?: string;
  passwordHash?: string;
  provider?: "email" | "google" | "github";
  orgs: mongoose.Types.ObjectId[]; 
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
  role?: "admin" | "member";
  isVerified?: boolean;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, lowercase: true, index: true},
  name: { type: String },
  passwordHash: { type: String },
  provider: { type: String, enum: ["email", "google", "github"], default: "email" },
  orgs: [{ type: Schema.Types.ObjectId, ref: "Org" }],
  lastLogin: { type: Date },
  role: { type: String, enum: ["admin", "member"], default: "member" },
  isVerified: { type: Boolean, default: false }
}, { timestamps: true });

UserSchema.index({ email: 1},{unique: true});

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
