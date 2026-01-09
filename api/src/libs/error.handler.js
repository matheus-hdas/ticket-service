import {
  InternalServerError,
  MethodNotAllowedError,
  NotFoundError,
  ValidationError,
} from "#libs/errors";

function errorGlobalHandler(error, request, response, next) {
  if (error instanceof ValidationError) {
    return response.status(error.statusCode).json(error);
  }

  if (error instanceof NotFoundError) {
    return response.status(error.statusCode).json(error);
  }

  if (error instanceof MethodNotAllowedError) {
    return response.status(error.statusCode).json(error);
  }

  const publicErrorObject = new InternalServerError({
    cause: error,
  });

  response.status(publicErrorObject.statusCode).json(publicErrorObject);
}

function methodNotAllowedGlobalHandler() {
  return new MethodNotAllowedError();
}

function notFoundGlobalHandler(request, response) {
  const publicErrorObject = new NotFoundError({
    message: "Página não encontrada.",
    action: "Procure por uma página disponível.",
  });
  response.status(publicErrorObject.statusCode).json(publicErrorObject);
}

const errorHandlers = {
  errorGlobalHandler,
  methodNotAllowedGlobalHandler,
  notFoundGlobalHandler,
};

export default errorHandlers;
