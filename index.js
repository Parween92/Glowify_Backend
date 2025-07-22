import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import "./db/index.js";
import "./db/associations.js";
import userRouter from "./routers/user.router.js";
import productRouter from "./routers/product.router.js";
import orderRouter from "./routers/order.router.js";
import categoryRouter from "./routers/category.router.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();
const port = process.env.PORT || 8000;

// CORS configuration for both development and production
const allowedOrigins = [
  "http://localhost:5173", // Development
  process.env.FRONTEND_URL || "https://glowify-shop-project.onrender.com" // Production
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        console.log('CORS blocked origin:', origin);
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/orders", orderRouter);
app.use("/category", categoryRouter);

app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));
