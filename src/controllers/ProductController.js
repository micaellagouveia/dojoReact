import Product from "../models/Product";

class ProductController {
  async create(req, res) {
    try {
      const product = await Product.create(req.body);
      return res.json(product);
    } catch (error) {
      res.status(400).json({ message: error.message || error });
    }
  }

  async index(req, res) {
    const { userId } = req.params;
    try {
      const products = await Product.find({ user: userId }).populate(
        "Category"
      );
      return res.json(products);
    } catch {
      res.status(400).json({ message: error.message || error });
    }
  }

  async update(req, res) {
    const { productId } = req.params;
    try {
      const product = await Product.findOne({ _id: productId });

      await product.update(req.body);
      return res.status(201).send();
    } catch {
      res.status(400).json({ message: error.message || error });
    }
  }
}

export default new ProductController();