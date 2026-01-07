export class InternalServerError extends Error {
  constructor({ cause }) {
    super("Um erro inesperado aconteceu.", {
      cause,
    });

    this.name = "InternalServerError";
    this.action = "Contate o suporte.";
    this.statusCode = 500;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}

export class MethodNotAllowedError extends Error {
  constructor() {
    super("Método não permitido para esse 'endpoint'.");

    this.name = "MethodNotAllowedError";
    this.action = "Tente esse 'endpoint' com um método válido.";
    this.statusCode = 405;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}

export class ValidationError extends Error {
  constructor({ cause, message, action }) {
    super(message || "Ocorreu um erro de validação", {
      cause,
    });

    this.name = "ValidationError";
    this.action = action || "Tente novamente com dados válidos.";
    this.statusCode = 400;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}

export class NotFoundError extends Error {
  constructor({ cause, message, action }) {
    super(message || "Recurso não encontrado.", {
      cause,
    });

    this.name = "NotFoundError";
    this.action = action || "Tente novamente com um recurso válido.";
    this.statusCode = 404;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}
