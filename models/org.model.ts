import mongoose, { Document, Schema } from "mongoose";

export enum Plan{
    "free",
    "premium"
}

export interface IOrg extends Document {
  name: string;
  slug: string; 
  owner: mongoose.Types.ObjectId;
  logoUrl?: string;
  theme?: { primary: string; accent?: string };
  plan?: Plan; 
  createdAt: Date;
  updatedAt: Date;
  retentionDays?: number; 
}

const OrgSchema = new Schema<IOrg>({
  name: { type: String, required: true },
  slug: { type: String, required: true, index: true, unique: true },
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  logoUrl: { type: String },
  theme: { type: Object, default: {} },
  plan: { type: Plan, default: "free" },
  retentionDays: { type: Number, default: 30 }
}, { timestamps: true });

OrgSchema.index({ slug: 1 });

export default mongoose.models.Org || mongoose.model<IOrg>("Org", OrgSchema);
