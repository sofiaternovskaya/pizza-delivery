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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
require("./types");
require("./config/env");
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var bodyParser = __importStar(require("body-parser"));
var typeorm_1 = require("typeorm");
var morgan_1 = __importDefault(require("morgan"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
// import cors from "cors";
var application_1 = __importDefault(require("./constants/application"));
var apiErrorHandler_1 = require("./middlewares/apiErrorHandler");
var joiErrorHandler_1 = require("./middlewares/joiErrorHandler");
var index_route_1 = __importDefault(require("./routes/index.route"));
var PORT = process.env.PORT || 5000;
// const ORIGIN = "http://localhost:3000" || "5000";
// const corsOptions = {
//   origin: ORIGIN,
//   optionsSuccessStatus: 200,
//   credentials: true,
// };
typeorm_1.createConnection()
    .then(function () {
    var app = express_1["default"]();
    app.use(bodyParser.json());
    app.use(morgan_1["default"]("dev"));
    app.use(cookie_parser_1["default"]());
    // app.use(cors(corsOptions));
    app.use(express_1["default"].static(path_1["default"].resolve(__dirname, "../build")));
    app.use(application_1["default"].url.base, index_route_1["default"]);
    app.get("*", function (req, res) {
        res.sendFile(path_1["default"].resolve(__dirname, "../build", "index.html"));
    });
    app.use(joiErrorHandler_1.joiErrorHandler);
    app.use(apiErrorHandler_1.notFoundErrorHandler);
    app.use(apiErrorHandler_1.errorHandler);
    app.listen(PORT, function () {
        console.log("Listening on port");
    });
})["catch"](function (error) {
    console.log("Error", error);
});
exports["default"] = express_1["default"];
