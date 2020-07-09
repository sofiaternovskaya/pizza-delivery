"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = require("express");
var user_controller_1 = __importDefault(require("../../controllers/user.controller"));
var authenticate_1 = __importDefault(require("../../middlewares/authenticate"));
var errorHandler_1 = require("../../middlewares/errorHandler");
var user_schema_1 = __importDefault(require("../../constants/schema/user.schema"));
var schemaValidator = require("express-joi-validator");
var router = express_1.Router();
router.post("/login", schemaValidator(user_schema_1["default"].login), errorHandler_1.handleErrorAsync(user_controller_1["default"].login));
router.get("/me", authenticate_1["default"], errorHandler_1.handleErrorAsync(user_controller_1["default"].self));
exports["default"] = router;
