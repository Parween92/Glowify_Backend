import { Router } from 'express';
import { createCategory, deleteCategory, getCategoryById, getCategory, updateCategory } from '../controllers/category.controllers.js';
import validateSchema from '../middlewares/validateSchema.js';
import categorySchema from '../schemas/category.schema.js';

const categoryRouter = Router();

categoryRouter.route('/').get(getCategory).post(validateSchema(categorySchema), createCategory);
categoryRouter.route('/:id').get(getCategoryById).put(validateSchema(categorySchema), updateCategory).delete(deleteCategory);

export default categoryRouter;