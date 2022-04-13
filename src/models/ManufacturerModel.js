import mongoose from "mongoose";
const Schema = mongoose.Schema;

const manufacturerSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    company_name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Manufacturer", manufacturerSchema);
