import User from "../models/User.js";
import Order from "../models/Order.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
  const users = await User.findAll({
    attributes: { exclude: ["password"] },
  });
  res.json(users);
};

export const createUser = async (req, res) => {
  const {
    body: { name, email, password },
  } = req;
  if (!name || !email || !password)
    throw new Error("name, email and password are required", {
      cause: 400,
    });
  const found = await User.findOne({ where: { email } });
  if (found)
    throw new Error("User with that email already exists", { cause: 409 });

  // hash passwort
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  const { password: _removed, ...userWithoutPassword } = user.toJSON();
  res.json(userWithoutPassword);
};

export const getUserById = async (req, res) => {
  const {
    params: { id },
  } = req;
  const user = await User.findByPk(id, { include: Order });
  if (!user) throw new Error("User not found", { cause: 404 });

  const { password: _removed, ...userWithoutPassword } = user.toJSON();
  res.json(userWithoutPassword);
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  if (!user) throw new Error("User not found", { cause: 404 });

  if (req.body.password) {
    const saltRounds = 10;
    req.body.password = await bcrypt.hash(req.body.password, saltRounds);
  }

  await user.update(req.body);
  const { password: _removed, ...userWithoutPassword } = user.toJSON();
  res.json(userWithoutPassword);
};

export const deleteUser = async (req, res) => {
  const {
    params: { id },
  } = req;
  const user = await User.findByPk(id);
  if (!user) throw new Error("User not found", { cause: 404 });
  await user.destroy();
  res.json({ message: "User deleted" });
};
