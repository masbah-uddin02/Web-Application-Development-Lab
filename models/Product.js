const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  name: { type: String },
  price: { type: Number },
  description: { type: String },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
