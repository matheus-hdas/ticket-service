import { Router } from "express";
import homeController from "#controllers/home.controller";
import errorHandlers from "#libs/error.handler";

const homeRouter = Router();

homeRouter
  .route("/")
  .get(homeController.welcome)
  .all((req, res, next) => {
    next(errorHandlers.methodNotAllowedGlobalHandler());
  });

homeRouter
  .route("/api")
  .get(homeController.welcome)
  .all((req, res, next) => {
    next(errorHandlers.methodNotAllowedGlobalHandler());
  });

export default homeRouter;
