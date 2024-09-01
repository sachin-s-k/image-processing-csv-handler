import mongoose, { Model, Schema } from "mongoose";
import { IimageTask } from "../interfaces/IimageTask";
import { Iimage } from "../interfaces/Iimage";

const IimageSchema: Schema<Iimage> = new mongoose.Schema({
  productName: { type: String, required: true },
  inputUrls: { type: [String], required: true },
  outputUrls: { type: [String], required: true },
});

const imageTaskSchema: Schema<IimageTask> = new mongoose.Schema({
  requestId: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "processing", "completed", "failed"],
    default: "pending",
  },
  webhookUrl: { type: String, required: false },
  images: { type: [IimageSchema], required: true },
});

export const ImageTask: Model<IimageTask> = mongoose.model<IimageTask>(
  "imagetask",
  imageTaskSchema
);
