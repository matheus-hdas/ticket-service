import { Router } from "express";
import ticketController from "#controllers/ticket.controller";
import errorHandlers from "#libs/error.handler";

const ticketRouter = Router();

ticketRouter
  .route("/api/tickets")
  .get(ticketController.findMany)
  .post(ticketController.create)
  .all((req, res, next) => {
    next(errorHandlers.methodNotAllowedGlobalHandler());
  });

ticketRouter
  .route("/api/tickets/:id")
  .get(ticketController.findById)
  .put(ticketController.update)
  .delete(ticketController.remove)
  .all((req, res, next) => {
    next(errorHandlers.methodNotAllowedGlobalHandler());
  });

export default ticketRouter;
