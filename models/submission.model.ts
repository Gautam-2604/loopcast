import mongoose, { Document, Schema } from "mongoose";

export interface ISubmission extends Document {
  org: mongoose.Types.ObjectId;
  form: mongoose.Types.ObjectId;
  name?: string;
  role?: string;
  email?: string;
  text?: string;
  rawUrl?: string;      // original upload (R2)
  processedUrl?: string;// highlight / final mp4 (R2)
  type: "text" | "image" | "video";
  consentGiven: boolean;
  status: "uploaded" | "processing" | "ready" | "failed";
  transcript?: string;
  sentimentScore?: number;
  highlights?: { start: number; end: number; score: number }[];
  createdAt: Date;
  updatedAt: Date;
}

const SubmissionSchema = new Schema<ISubmission>({
  org: { type: Schema.Types.ObjectId, ref: "Org", required: true, index: true },
  form: { type: Schema.Types.ObjectId, ref: "Form", required: true, index: true },
  name: { type: String },
  role: { type: String },
  email: { type: String },
  text: { type: String },
  rawUrl: { type: String }, 
  processedUrl: { type: String },
  type: { type: String, enum: ["text","image","video"], required: true },
  consentGiven: { type: Boolean, default: true },
  status: { type: String, enum: ["uploaded","processing","ready","failed"], default: "uploaded" },
  transcript: { type: String },
  sentimentScore: { type: Number },
  highlights: { type: [{ start: Number, end: Number, score: Number }], default: [] }
}, { timestamps: true });

SubmissionSchema.index({ org: 1, form: 1, status: 1 });
SubmissionSchema.index({ processedUrl: 1 });

export default mongoose.models.Submission || mongoose.model<ISubmission>("Submission", SubmissionSchema);
