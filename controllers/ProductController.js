const Product = require("../models/Product");
const ProductSerializer = require("../serializers/ProductSerializer");

class ProductController {
  static async list(req, res, next) {
    try {
      const products = await Product.find();
      const serializedProducts = products.map((product) =>
        ProductSerializer.serialize(product)
      );
      res.json(serializedProducts);
    } catch (error) {
      next(error);
    }
  }

  static async read(req, res, next) {
    const { productId } = req.params;

    try {
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      const serializedProduct = ProductSerializer.serialize(product);
      res.json(serializedProduct);
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    const { name, price, description } = req.body;

    // Validate input using the serializer
    if (!ProductSerializer.validate({ name, price, description })) {
      return res.status(400).json({ error: "Invalid input" });
    }

    try {
      const product = await Product.create({ name, price, description });
      const serializedProduct = ProductSerializer.serialize(product);
      res.status(201).json(serializedProduct);
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    const { productId } = req.params;
    const { name, price, description } = req.body;

    // Validate input using the serializer
    if (!ProductSerializer.validate({ name, price, description })) {
      return res.status(400).json({ error: "Invalid input" });
    }

    try {
      const product = await Product.findByIdAndUpdate(
        productId,
        { name, price, description },
        { new: true }
      );
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      const serializedProduct = ProductSerializer.serialize(product);
      res.json(serializedProduct);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    const { productId } = req.params;

    try {
      const product = await Product.findByIdAndDelete(productId);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductController;
