import { Router } from "express";
import orderController from "../../controllers/order.controller";
import authenticate from "../../middlewares/authenticate";
import { handleErrorAsync } from "../../middlewares/errorHandler";

const router = Router();

router.get("/", authenticate, handleErrorAsync(orderController.getOrders));
router.post(
  "/create_order",
  authenticate,
  handleErrorAsync(orderController.createOrder)
);
router.get("/:id", authenticate, handleErrorAsync(orderController.getOrder));

export default router;
