import mongoose from "mongoose";
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    product_id: {
      type: String,
      trim: true,
      required: true,
    },
    product_sr_no: {
      type: Number,
      required: true,
    },
    product_name: {
      type: String,
      required: true
    },
    product_price: {
      type: Number,
      required: true
    },
    product_color: {
      type: String,
      required: true
    },
    product_dom: {
      type: Date,
      required: true
    },
    product_size: {
      type: Number,
      required: true
    },
    product_hash: {
      type: String,
      required: true
    },
    product_sold: {
      type: Boolean,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", productSchema);
