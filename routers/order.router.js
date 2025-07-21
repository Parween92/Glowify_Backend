import { Router } from 'express';
import { createOrder, deleteOrder, getOrderById, getOrder, updateOrder } from '../controllers/order.controllers.js';
import validateSchema from '../middlewares/validateSchema.js';
import orderSchema from '../schemas/order.schema.js';

const orderRouter = Router();

orderRouter.route('/').get(getOrder).post(validateSchema(orderSchema), createOrder);
orderRouter.route('/:id').get(getOrderById).put(validateSchema(orderSchema), updateOrder).delete(deleteOrder);

export default orderRouter;