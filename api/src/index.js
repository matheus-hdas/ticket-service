import express from "express";
import errorHandlers from "#libs/error.handler";
import ticketRouter from "#routes/ticket.router";

import "dotenv/config";

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use(ticketRouter);

app.use(errorHandlers.notFoundGlobalHandler);
app.use(errorHandlers.errorGlobalHandler);

app.listen(port, () => {
  console.log("App Listen on port " + port);
});
