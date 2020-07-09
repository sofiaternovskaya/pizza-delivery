"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.errorHandler = exports.notFoundErrorHandler = void 0;
var http_status_codes_1 = __importDefault(require("http-status-codes"));
exports.notFoundErrorHandler = function (req, res) {
    res.status(http_status_codes_1["default"].NOT_FOUND).json({
        success: false,
        error: {
            code: http_status_codes_1["default"].NOT_FOUND,
            message: http_status_codes_1["default"].getStatusText(http_status_codes_1["default"].NOT_FOUND)
        }
    });
};
exports.errorHandler = function (err, req, res) {
    res.status(err.status || http_status_codes_1["default"].INTERNAL_SERVER_ERROR).json({
        success: false,
        error: {
            code: err.code || http_status_codes_1["default"].INTERNAL_SERVER_ERROR,
            message: err.message ||
                http_status_codes_1["default"].getStatusText(http_status_codes_1["default"].INTERNAL_SERVER_ERROR)
        }
    });
};
