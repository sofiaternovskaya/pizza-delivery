import { Router } from "express";
import productController from "../../controllers/product.controller";
import { handleErrorAsync } from "../../middlewares/errorHandler";

const router = Router();

router.get("/", handleErrorAsync(productController.getProducts));
router.get("/:id", handleErrorAsync(productController.getProduct));

export default router;
