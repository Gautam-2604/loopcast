
import mongoose, { Document, Schema } from "mongoose";
export interface IEmbed extends Document {
  org: mongoose.Types.ObjectId;
  testimonial: mongoose.Types.ObjectId;
  embedId: string; // same as testimonial.embedId or variant
  payload: any;    // lightweight JSON for embed: { videoUrl, poster, captions, emotionCurve }
  ttlSec?: number; // caching hint for CDN
  createdAt: Date;
  updatedAt: Date;
}

const EmbedSchema = new Schema<IEmbed>({
  org: { type: Schema.Types.ObjectId, ref: "Org", required: true, index: true },
  testimonial: { type: Schema.Types.ObjectId, ref: "Testimonial", required: true, index: true },
  embedId: { type: String, required: true, index: true, unique: true },
  payload: { type: Schema.Types.Mixed, required: true },
  ttlSec: { type: Number, default: 3600 }
}, { timestamps: true });

EmbedSchema.index({ embedId: 1 });

export default mongoose.models.Embed || mongoose.model<IEmbed>("Embed", EmbedSchema);
