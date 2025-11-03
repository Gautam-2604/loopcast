import mongoose, { Document, Schema } from "mongoose";

export interface IAnalyticsEvent extends Document {
  org: mongoose.Types.ObjectId;
  testimonial?: mongoose.Types.ObjectId;
  embedId?: string;
  anonId?: string; // for lightweight tracking
  event: "view" | "play" | "complete" | "click";
  meta?: any;
  createdAt: Date;
}

const AnalyticsSchema = new Schema<IAnalyticsEvent>({
  org: { type: Schema.Types.ObjectId, ref: "Org", required: true, index: true },
  testimonial: { type: Schema.Types.ObjectId, ref: "Testimonial" },
  embedId: { type: String },
  anonId: { type: String },
  event: { type: String, enum: ["view","play","complete","click"], required: true },
  meta: { type: Schema.Types.Mixed }
}, { timestamps: { createdAt: true, updatedAt: false } });

AnalyticsSchema.index({ org: 1, embedId: 1, createdAt: -1 });

export default mongoose.models.AnalyticsEvent || mongoose.model<IAnalyticsEvent>("AnalyticsEvent", AnalyticsSchema);
