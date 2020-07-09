"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var http_status_codes_1 = __importDefault(require("http-status-codes"));
var ApiResponse = /** @class */ (function () {
    function ApiResponse() {
    }
    ApiResponse.result = function (res, data, status, cookie) {
        if (status === void 0) { status = 200; }
        if (cookie === void 0) { cookie = null; }
        res.status(status);
        if (cookie) {
            res.cookie(cookie.key, cookie.value, {
                httpOnly: false
            });
        }
        res.json({
            data: data,
            success: true
        });
    };
    ApiResponse.error = function (res, status, error, override) {
        if (status === void 0) { status = 400; }
        if (error === void 0) { error = http_status_codes_1["default"].getStatusText(status); }
        if (override === void 0) { override = null; }
        res.status(status).json({
            override: override,
            error: {
                message: error
            },
            success: false
        });
    };
    ApiResponse.setCookie = function (res, key, value) {
        res.cookie(key, value);
    };
    return ApiResponse;
}());
exports["default"] = ApiResponse;
