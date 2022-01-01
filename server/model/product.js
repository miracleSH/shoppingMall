const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema(
  {
    writer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: Schema.Types.String,
      maxlength: 50,
    },
    description: {
      type: Schema.Types.String,
    },
    price: {
      type: Schema.Types.Number,
      default: 0,
    },
    images: {
      type: Schema.Types.Array,
      default: [],
    },
    country: {
      type: Schema.Types.String,
      maxlength: 50,
    },
    sold: {
      type: Schema.Types.Number,
      maxlength: 100,
      default: 0,
    },
    views: {
      type: Schema.Types.Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
module.exports = { Product };
