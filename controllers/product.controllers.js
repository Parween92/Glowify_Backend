import { Product, Order, Category } from "../db/associations.js";

export const getProducts = async (req, res) => {
  const products = await Product.findAll({ include: Category });
  res.json(products);
};

export const createProduct = async (req, res) => {
  const {
    body: { name, description, price, categoryId },
  } = req;
  if (!name || !description || !price || !categoryId)
    throw new Error("name, description, price, and categoryId are required", {
      cause: 400,
    });
  const found = await Product.findOne({ where: { name } });
  if (found)
    throw new Error("Product with that name already exists", { cause: 409 });
  const product = await Product.create(req.body);
  res.json(product);
};

export const getProductById = async (req, res) => {
  const {
    params: { id },
  } = req;
  const product = await Product.findByPk(id, { include: [Category, Order] });
  if (!product) throw new Error("Product not found", { cause: 404 });
  res.json(product);
};

export const updateProduct = async (req, res) => {
  const {
    body: { name, description, price, categoryId },
    params: { id },
  } = req;
  if (!name || !description || !price || !categoryId)
    throw new Error("name, description, price, and categoryId are required", {
      cause: 400,
    });
  const product = await Product.findByPk(id);
  if (!product) throw new Error("Product not found", { cause: 404 });
  await product.update(req.body);
  res.json(product);
};

export const deleteProduct = async (req, res) => {
  const {
    params: { id },
  } = req;
  const product = await Product.findByPk(id);
  if (!product) throw new Error("Product not found", { cause: 404 });
  await product.destroy();
  res.json({ message: "Product deleted" });
};
