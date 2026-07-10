import mongoose, { Schema, models } from 'mongoose';

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    rating: { type: Number, default: 0 },
    image: { type: String, default: '' },
    featured: { type: Boolean, default: false },
    description: { type: String, required: true },
    specs: [{ type: String }],
  },
  { timestamps: true },
);

export default models.Product || mongoose.model('Product', ProductSchema);
