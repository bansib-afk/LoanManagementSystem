import mongoose, { Document, Schema } from "mongoose";

// 1. Create TypeScript Interface
export interface IToken extends Document {
  accessToken: string;
  isValid: boolean;
  createdAt: Date;
}

// 2. Create Schema with types
const tokenSchema: Schema<IToken> = new Schema({
  accessToken: {
    type: String,
    required: true,
  },
  isValid: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 60 * 24 * 30, // 30 days TTL
  },
});

// 3. Export Model
export default mongoose.model<IToken>("Token", tokenSchema);