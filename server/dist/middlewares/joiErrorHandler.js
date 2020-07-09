"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.joiErrorHandler = void 0;
var HttpStatus = __importStar(require("http-status-codes"));
function isJoiError(err) {
    return Boolean(err.isJoi);
}
exports.joiErrorHandler = function (err, req, res, next) {
    var _a;
    if (isJoiError(err)) {
        var error = {
            code: HttpStatus.BAD_REQUEST,
            message: HttpStatus.getStatusText(HttpStatus.BAD_REQUEST),
            details: (_a = err.details) === null || _a === void 0 ? void 0 : _a.map(function (err) { return ({
                message: err.message,
                param: err.path
            }); })
        };
        return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
    return next(err);
};
