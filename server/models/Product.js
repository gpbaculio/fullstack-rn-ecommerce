const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    display_name: { type: String },
    barcode: { type: String },
    price: { type: String },
    brand: { type: String },
    category: { type: String },
  },
  {
    collection: "products",
  }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
