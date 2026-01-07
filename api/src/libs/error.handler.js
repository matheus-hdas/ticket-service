import {
  InternalServerError,
  MethodNotAllowedError,
  NotFoundError,
  ValidationError,
} from "libs/errors";

async function errorGlobalHandler(error, request, response) {
  if (error instanceof ValidationError) {
    return response.status(error.statusCode).json(error);
  }

  if (error instanceof NotFoundError) {
    return response.status(error.statusCode).json(error);
  }

  const publicErrorObject = new InternalServerError({
    cause: error,
  });

  response.status(publicErrorObject.statusCode).json(publicErrorObject);
}

async function onNoMatchGlobalHandler() {
  return new MethodNotAllowedError();
}

async function onNotFoundGlobalHandler() {
  const publicErrorObject = new NotFoundError({
    message: "Página não encontrada.",
    action: "Procure por uma página disponível.",
  });
  response.status(publicErrorObject.statusCode).json(publicErrorObject);
}

const errorHandlers = {
  errorGlobalHandler,
  onNoMatchGlobalHandler,
  onNotFoundGlobalHandler,
};

export default errorHandlers;
