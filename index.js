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

app.use(
  cors({
    origin: "http://localhost:5173",
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
