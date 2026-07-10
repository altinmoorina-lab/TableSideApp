import mongoose, { Schema, models } from 'mongoose';

const ContactMessageSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true },
);

export default models.ContactMessage || mongoose.model('ContactMessage', ContactMessageSchema);
