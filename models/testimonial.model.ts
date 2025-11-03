
import mongoose, { Document, Schema } from "mongoose";
export interface ITestimonial extends Document {
  org: mongoose.Types.ObjectId;
  submission: mongoose.Types.ObjectId;
  title?: string;
  authorName?: string;
  authorRole?: string;
  videoUrl?: string;      // processed mp4/ogv
  posterUrl?: string;     // thumbnail
  captionsUrl?: string;   // webvtt
  embedId: string;        // public id for embed
  variant?: string;       // short/long/social etc.
  tags: string[];
  published: boolean;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const TestimonialSchema = new Schema<ITestimonial>({
  org: { type: Schema.Types.ObjectId, ref: "Org", required: true, index: true },
  submission: { type: Schema.Types.ObjectId, ref: "Submission", required: true, index: true },
  title: { type: String },
  authorName: { type: String },
  authorRole: { type: String },
  videoUrl: { type: String },
  posterUrl: { type: String },
  captionsUrl: { type: String },
  embedId: { type: String, required: true, index: true, unique: true },
  variant: { type: String },
  tags: { type: [String], default: [] },
  published: { type: Boolean, default: false },
  publishedAt: { type: Date }
}, { timestamps: true });

TestimonialSchema.index({ org: 1, published: 1 });
TestimonialSchema.index({ embedId: 1 });

export default mongoose.models.Testimonial || mongoose.model<ITestimonial>("Testimonial", TestimonialSchema);
