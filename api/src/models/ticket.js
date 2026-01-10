import { Prisma } from "@prisma/client";
import { ZodError } from "zod";
import { NotFoundError, ValidationError } from "#libs/errors";
import {
  CreateTicketSchema,
  CuidSchema,
  UpdateTicketSchema,
} from "#libs/schema";
import database from "#libs/database";

async function findById(id) {
  validateCuid(id);

  const ticket = await database.ticket.findUnique({
    where: { id },
  });

  if (!ticket) {
    throw new NotFoundError({
      message: "Ticket não encontrado.",
      action: "Tente com um id válido.",
    });
  }

  return ticket;
}

async function findMany(params) {
  const {
    q,
    prioridade,
    departamento,
    sort = "criadoEm",
    order = "desc",
    limit = 50,
    cursor,
  } = params;

  const take = Number(limit) + 1;
  const where = {};

  if (q) {
    where.nome = {
      contains: q,
    };
  }

  if (prioridade) where.prioridade = prioridade.toUpperCase();
  if (departamento) where.departamento = departamento.toUpperCase();

  const orderBy = [{ [sort]: order }, { id: "asc" }];

  const tickets = await database.ticket.findMany({
    where,
    orderBy,
    take,
    ...(cursor && {
      cursor: { id: cursor },
      skip: 1,
    }),
  });

  let nextCursor = null;

  if (tickets.length > limit) {
    const nextItem = tickets.pop();
    nextCursor = nextItem.id;
  }

  return {
    data: tickets,
    nextCursor,
  };
}

async function create(createTicketRequest) {
  try {
    const createTicketObject = CreateTicketSchema.parse(createTicketRequest);

    return await database.ticket.create({
      data: createTicketObject,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      throw new ValidationError({
        message: "Dados inválidos",
      });
    }

    throw error;
  }
}

async function update(updateTicketRequest) {
  try {
    const { id, ...data } = updateTicketRequest;

    validateCuid(id);

    return await database.ticket.update({
      where: { id },
      data: UpdateTicketSchema.parse(data),
    });
  } catch (error) {
    if (error instanceof ZodError) {
      throw new ValidationError({
        message: "Dados inválidos",
      });
    }

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      throw new NotFoundError({
        message: "Ticket não encontrado.",
        action: "Tente com um id existente.",
      });
    }

    throw error;
  }
}

async function remove(id) {
  validateCuid(id);

  try {
    await database.ticket.delete({
      where: { id },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      throw new NotFoundError({
        message: "Ticket não encontrado.",
        action: "Tente com um id válido.",
      });
    }

    throw error;
  }
}

function validateCuid(id) {
  try {
    CuidSchema.parse(id);
  } catch {
    throw new NotFoundError({
      message: "Ticket não encontrado.",
      action: "Tente com um id válido e no formato correto.",
    });
  }
}

const ticket = {
  findById,
  findMany,
  create,
  update,
  remove,
};

export default ticket;
