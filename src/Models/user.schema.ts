/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

export const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    isAdmin: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

UserSchema.pre('save', async function (next) {
  try {
    if (!this.isModified(['password'])) {
      return next();
    } else {
      const hashed = await bcrypt.hash(this['password'], 10);
      this.password = hashed;
      return next();
    }
  } catch (error) {
    return next(error);
  }
});
