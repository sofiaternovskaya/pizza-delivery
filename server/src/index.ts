import "./types";
import "./config/env";
import express from "express";
import path from "path";
import * as bodyParser from "body-parser";
import { createConnection } from "typeorm";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import application from "./constants/application";
import {
  notFoundErrorHandler,
  errorHandler,
} from "./middlewares/apiErrorHandler";
import { joiErrorHandler } from "./middlewares/joiErrorHandler";
import indexRoute from "./routes/index.route";

const PORT = process.env.PORT || 5000;
const ORIGIN = "http://localhost:3000" || "";

const corsOptions = {
  origin: ORIGIN,
  optionsSuccessStatus: 200,
  credentials: true,
};

createConnection()
  .then(() => {
    const app = express();
    app.use(bodyParser.json());
    app.use(morgan("dev"));
    app.use(cookieParser());
    app.use(cors(corsOptions));

    app.use(express.static(path.resolve(__dirname, "../build")));

    app.use(application.url.base, indexRoute);

    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "../build", "index.html"));
    });

    app.use(joiErrorHandler);
    app.use(notFoundErrorHandler);
    app.use(errorHandler);

    app.listen(PORT, () => {
      console.log("Listening on port", PORT);
    });
  })
  .catch(error => {
    console.log("Error", error);
  });

export default express;
