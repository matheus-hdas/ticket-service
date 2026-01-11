import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";

import errorHandlers from "#libs/error.handler";
import ticketRouter from "#routes/ticket.router";
import homeRouter from "#routes/home.router";

import { swaggerDocs } from "#docs/swagger.js";

import "dotenv/config";

const app = express();
const port = process.env.PORT;

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json());

const allowedOrigins = [process.env.FRONTEND_URL, `http://localhost:${port}`];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      const cleanOrigin = origin.replace(/\/$/, "");

      if (allowedOrigins.includes(cleanOrigin)) {
        callback(null, true);
      } else {
        console.error(`❌ Origem não permitida: ${origin}`);
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(ticketRouter);
app.use(homeRouter);

app.use(errorHandlers.notFoundGlobalHandler);
app.use(errorHandlers.errorGlobalHandler);

app.listen(port, () => {
  console.log("App Listen on port " + port);
});
