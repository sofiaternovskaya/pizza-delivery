"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = require("express");
var product_controller_1 = __importDefault(require("../../controllers/product.controller"));
var errorHandler_1 = require("../../middlewares/errorHandler");
var router = express_1.Router();
router.get("/", errorHandler_1.handleErrorAsync(product_controller_1["default"].getProducts));
router.get("/:id", errorHandler_1.handleErrorAsync(product_controller_1["default"].getProduct));
exports["default"] = router;
