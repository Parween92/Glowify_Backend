import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  
  if (!name || !email || !password) {
    throw new Error("name, email and password are required", { cause: 400 });
  }

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error("User with that email already exists", { cause: 409 });
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  const { password: _, ...userWithoutPassword } = user.toJSON();

  res.status(201).json({
    message: "User registered successfully",
    user: userWithoutPassword,
  });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new Error("Email and password are required", { cause: 400 });
  }

  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error("Invalid email or password", { cause: 401 });
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw new Error("Invalid email or password", { cause: 401 });
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );

  const { password: _, ...userWithoutPassword } = user.toJSON();

  res.json({
    message: "Login successful",
    token,
    user: userWithoutPassword,
  });
};