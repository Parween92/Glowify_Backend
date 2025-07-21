import Order from "../models/Order.js";
import User from "../models/User.js";
import Product from "../models/Product.js";

export const getOrder = async (req, res) => {
  const order = await Order.findAll({ include: User });
  res.json(order);
};

export const createOrder = async (req, res) => {
  const {
    body: { id, userId, productId, quantity, total },
  } = req;
  if (!userId || !productId || !quantity || !total)
    throw new Error("userId, productId, quantity, and total are required", {
      cause: 400,
    });
  const order = await Order.create(req.body);
  res.json(order);
};

export const getOrderById = async (req, res) => {
  const {
    params: { id },
  } = req;
  const order = await Order.findByPk(id, { include: User, Product });
  if (!order) throw new Error("Order not found", { cause: 404 });
  res.json(order);
};

export const updateOrder = async (req, res) => {
  const {
    body: { userId, productId, quantity, total },
    params: { id },
  } = req;
  if (!userId || !productId || !quantity || !total)
    throw new Error("userId, productId, quantity, and total are required", {
      cause: 400,
    });
  const order = await Order.findByPk(id);
  if (!order) throw new Error("Order not found", { cause: 404 });
  await order.update(req.body);
  const user = await order.getUser();
  order.dataValues.user = user;
  res.json(order);
};

export const deleteOrder = async (req, res) => {
  const {
    params: { id },
  } = req;
  const order = await Order.findByPk(id);
  if (!order) throw new Error("Order not found", { cause: 404 });
  await order.destroy();
  res.json({ message: "Order deleted" });
};