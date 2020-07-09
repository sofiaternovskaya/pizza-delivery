import { Router } from "express";
import deliveryController from "../../controllers/delivery.controller";
import { handleErrorAsync } from "../../middlewares/errorHandler";

const router = Router();

router.get("/", handleErrorAsync(deliveryController.getDelivery));

export default router;
