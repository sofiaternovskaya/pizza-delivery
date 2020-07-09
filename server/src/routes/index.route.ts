import * as express from "express";
import userAuth from "./user/auth.route";
import product from "./product/product.route";
import order from "./order/order.route";
import delivery from "./delivery/delivery.route";

const router = express.Router();

router.use("/user/auth", userAuth);
router.use("/product", product);
router.use("/order", order);
router.use("/delivery", delivery);

export default router;
