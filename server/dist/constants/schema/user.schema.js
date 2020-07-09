"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var joi_1 = __importDefault(require("joi"));
exports["default"] = {
    register: {
        body: {
            email: joi_1["default"]
                .string()
                .email()
                .required(),
            password: joi_1["default"]
                .string()
                .min(6)
                .max(32)
                .required(),
            name: joi_1["default"].string().required()
        }
    },
    login: {
        body: {
            email: joi_1["default"]
                .string()
                .email()
                .required(),
            password: joi_1["default"].string().required()
        }
    },
    update: {
        body: {}
    }
};
