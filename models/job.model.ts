import mongoose, { Document, Schema } from "mongoose";

export interface IJob extends Document {
  org: mongoose.Types.ObjectId;
  submission: mongoose.Types.ObjectId;
  type: "transcribe" | "generate_highlight" | "generate_variants";
  status: "queued" | "running" | "succeeded" | "failed";
  workerId?: string;
  attempts: number;
  error?: string;
  createdAt: Date;
  updatedAt: Date;
  startedAt?: Date;
  finishedAt?: Date;
}

const JobSchema = new Schema<IJob>({
  org: { type: Schema.Types.ObjectId, ref: "Org", required: true },
  submission: { type: Schema.Types.ObjectId, ref: "Submission", required: true, index: true },
  type: { type: String, enum: ["transcribe","generate_highlight","generate_variants"], required: true },
  status: { type: String, enum: ["queued","running","succeeded","failed"], default: "queued", index: true },
  workerId: { type: String },
  attempts: { type: Number, default: 0 },
  error: { type: String }
}, { timestamps: true });

JobSchema.index({ status: 1, createdAt: 1 });

export default mongoose.models.Job || mongoose.model<IJob>("Job", JobSchema);
