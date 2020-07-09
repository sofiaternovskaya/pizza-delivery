"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = require("express");
var order_controller_1 = __importDefault(require("../../controllers/order.controller"));
var authenticate_1 = __importDefault(require("../../middlewares/authenticate"));
var errorHandler_1 = require("../../middlewares/errorHandler");
var router = express_1.Router();
router.get("/", authenticate_1["default"], errorHandler_1.handleErrorAsync(order_controller_1["default"].getOrders));
router.post("/create_order", authenticate_1["default"], errorHandler_1.handleErrorAsync(order_controller_1["default"].createOrder));
router.get("/:id", authenticate_1["default"], errorHandler_1.handleErrorAsync(order_controller_1["default"].getOrder));
exports["default"] = router;
