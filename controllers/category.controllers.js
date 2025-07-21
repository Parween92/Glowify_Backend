import Category from "../models/Category.js";
import Product from "../models/Product.js";

export const getCategory = async (req, res) => {
  const category = await Category.findAll();
  res.json(category);
};

export const createCategory = async (req, res) => {
  const {
    body: { name },
  } = req;
  if (!name) throw new Error("name is required", { cause: 400 });
  const found = await Category.findOne({ where: { name } });
  if (found)
    throw new Error("Category with that name already exists", { cause: 409 });
  const category = await Category.create(req.body);
  res.json(category);
};

export const getCategoryById = async (req, res) => {
  const {
    params: { id },
  } = req;
  const category = await Category.findByPk(id, { include: Product });
  if (!category) throw new Error("Category not found", { cause: 404 });
  res.json(category);
};

export const updateCategory = async (req, res) => {
  const {
    body: { name },
    params: { id },
  } = req;
  if (!name) throw new Error("name is required", { cause: 400 });
  const category = await Category.findByPk(id);
  if (!category) throw new Error("Category not found", { cause: 404 });
  await category.update(req.body);
  res.json(category);
};

export const deleteCategory = async (req, res) => {
  const {
    params: { id },
  } = req;
  const category = await Category.findByPk(id);
  if (!category) throw new Error("Category not found", { cause: 404 });
  await category.destroy();
  res.json({ message: "Category deleted" });
};