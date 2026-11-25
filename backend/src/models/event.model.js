import mongoose from "mongoose";
import { formatDate, parseDate } from "../utils/date.js";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    date: {
      type: Date,
      required: true,
      set: parseDate,
      get: formatDate,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["Yazılım", "Tasarım", "Kariyer"],
    },
    capacity: {
      type: Number,
      min: 5,
      default: 50,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
    id: false,
  }
);

export const Event = mongoose.model("Event", eventSchema);
