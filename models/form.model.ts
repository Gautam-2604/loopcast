import mongoose, { Document, Schema } from "mongoose";

export interface IForm extends Document {
  org: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  slug: string; // public id for /f/:slug
  allowedTypes: ("text"|"image"|"video")[];
  requireConsent: boolean;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  theme?: { logo?: string; color?: string };
  isActive: boolean;
}

const FormSchema = new Schema<IForm>({
  org: { type: Schema.Types.ObjectId, ref: "Org", required: true, index: true },
  title: { type: String, required: true },
  description: { type: String },
  slug: { type: String, required: true, index: true, unique: true },
  allowedTypes: { type: [String], enum: ["text","image","video"], default: ["text","video"] },
  requireConsent: { type: Boolean, default: true },
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  theme: { type: Object, default: {} },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

FormSchema.index({ org: 1, slug: 1 });

export default mongoose.models.Form || mongoose.model<IForm>("Form", FormSchema);
