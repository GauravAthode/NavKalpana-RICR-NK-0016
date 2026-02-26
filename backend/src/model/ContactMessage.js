import mongoose from "mongoose";

const contactMessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, minlength: 2, maxlength: 80 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 120 },
    subject: { type: String, required: true, trim: true, minlength: 2, maxlength: 120 },
    message: { type: String, required: true, trim: true, minlength: 10, maxlength: 2000 }
  },
  { timestamps: true }
);

export const ContactMessage = mongoose.model("ContactMessage", contactMessageSchema);