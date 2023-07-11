class ProductSerializer {
  static serialize(product) {
    return {
      id: product._id,
      name: product.name,
      price: product.price,
      description: product.description,
    };
  }

  static validate(data) {
    const { name, price, description } = data;

    if (typeof name !== "string" || name.trim() === "") {
      return false;
    }

    if (typeof price !== "number" || price <= 0) {
      return false;
    }

    if (typeof description !== "string" || description.trim() === "") {
      return false;
    }

    return true;
  }
}

module.exports = ProductSerializer;
