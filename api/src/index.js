import express from "express";
import cors from "cors";
import errorHandlers from "#libs/error.handler";
import ticketRouter from "#routes/ticket.router";

import "dotenv/config";

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(ticketRouter);

app.use(errorHandlers.notFoundGlobalHandler);
app.use(errorHandlers.errorGlobalHandler);

app.listen(port, () => {
  console.log("App Listen on port " + port);
});
