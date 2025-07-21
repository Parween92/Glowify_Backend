import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/product.controllers.js";
import validateSchema from "../middlewares/validateSchema.js";
import productSchema from "../schemas/product.schema.js";

const productRouter = Router();

productRouter
  .route("/")
  .get(getProducts)
  .post(validateSchema(productSchema), createProduct);
productRouter
  .route("/:id")
  .get(getProductById)
  .put(validateSchema(productSchema), updateProduct)
  .delete(deleteProduct);

export default productRouter;
