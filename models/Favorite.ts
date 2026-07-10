import mongoose, { Schema, models } from 'mongoose';

const FavoriteSchema = new Schema(
  {
    userEmail: { type: String, required: true },
    productId: { type: String, required: true },
  },
  { timestamps: true },
);

FavoriteSchema.index({ userEmail: 1, productId: 1 }, { unique: true });

export default models.Favorite || mongoose.model('Favorite', FavoriteSchema);
