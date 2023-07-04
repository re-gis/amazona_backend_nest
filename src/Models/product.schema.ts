/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },

    slug: {
      type: String,
      unique: true,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },

    countInStock: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    numReviews: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
);
