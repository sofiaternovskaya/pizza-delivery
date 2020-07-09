"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = require("express");
var delivery_controller_1 = __importDefault(require("../../controllers/delivery.controller"));
var errorHandler_1 = require("../../middlewares/errorHandler");
var router = express_1.Router();
router.get("/", errorHandler_1.handleErrorAsync(delivery_controller_1["default"].getDelivery));
exports["default"] = router;
